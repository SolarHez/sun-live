import { useEffect, useRef } from "react";
import { DouyuSocketClient } from "../../servers/danmuku/douyu";
import { HuyaSocketClient } from "../../servers/danmuku/huya";

type WsPlatformMap = {
  douyu: (roomId: string) => DouyuSocketClient;
  huya: (roomId: string) => HuyaSocketClient;
};

const PLATFORM: WsPlatformMap = {
  douyu: (roomId: string) => new DouyuSocketClient(roomId),
  huya: (roomId: string) => new HuyaSocketClient(roomId),
};

export const useWebsocket = (
  rid: string,
  platform: keyof WsPlatformMap,
  onMessage?: (data: any) => void,
) => {
  const onMessageRef = useRef(onMessage);
  onMessageRef.current = onMessage;

  useEffect(() => {
    // 只有当参数都存在时才建立连接
    if (!rid || !platform) return;

    console.log(`正在连接 WebSocket: 平台 ${platform}, 房间 ${rid}`);
    const client = PLATFORM[platform](rid);

    client.onMessage = (data: any) => {
      onMessageRef.current?.(data);
    };

    client.connect();

    // 清理函数：当 rid/platform 改变或组件销毁时，自动关闭旧连接
    return () => {
      console.log(`清理 WebSocket 连接: ${platform}-${rid}`);
      client.handleClose();
    };
  }, [rid, platform]); // 核心：监听这两个值的变化
};
