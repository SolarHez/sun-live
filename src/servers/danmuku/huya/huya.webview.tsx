import React, { useRef, useCallback, useEffect } from "react";
import { WebView } from "react-native-webview";
import huya from "../../core/huya";
import { standardizedFormat } from "./huya.handlers";
import { getHuyaRegisterData } from "./huya.parser";
import { base64ToUint8Array } from "./utils/array";
import { isEmpty } from "./utils/is";
import { View } from "react-native";

const HEARTBEAT_BYTES = base64ToUint8Array("ABQdAAwsNgBM");

const HUYA_PROXY_HTML = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body>
<script>
  let ws = null;
  let queue = [];
  let flushTimer = null;
  let heartbeatTimer = null;

  function connect() {
    ws = new WebSocket('wss://cdnws.api.huya.com');
    ws.binaryType = 'arraybuffer';

    ws.onopen = function() {
      postMsg({ type: 'open' });
    };

    ws.onmessage = function(event) {
      var data = new Uint8Array(event.data);
      queue.push(Array.from(data));
    };

    ws.onerror = function() {
      postMsg({ type: 'error' });
    };

    ws.onclose = function() {
      clearInterval(flushTimer);
      clearInterval(heartbeatTimer);
      postMsg({ type: 'close' });
    };
  }

  function postMsg(data) {
    window.ReactNativeWebView.postMessage(JSON.stringify(data));
  }

  // 接收 RN 命令
  window.addEventListener('message', function(e) {
    var msg = JSON.parse(e.data);
    if (msg.cmd === 'connect') {
      connect();
    }
    if (msg.cmd === 'send') {
      ws.send(new Uint8Array(msg.data));
    }
    if (msg.cmd === 'startHeartbeat') {
      var hb = msg.heartbeat;
      heartbeatTimer = setInterval(function() {
        if (ws && ws.readyState === 1) {
          ws.send(new Uint8Array(hb));
        }
      }, 30000);
    }
    if (msg.cmd === 'close') {
      clearInterval(flushTimer);
      clearInterval(heartbeatTimer);
      ws && ws.close();
    }
    if (msg.cmd === 'startFlush') {
      flushTimer = setInterval(function() {
        if (queue.length > 0) {
          var batch = queue.splice(0);
          postMsg({ type: 'batch', data: batch });
        }
      }, 500);
    }
  });
</script>
</body>
</html>
`;

interface HuyaWebViewProps {
  roomId: string;
  onMessage: (data: any) => void;
}

export const HuyaWebView: React.FC<HuyaWebViewProps> = ({
  roomId,
  onMessage,
}) => {
  const webViewRef = useRef<WebView>(null);
  const onMessageRef = useRef(onMessage);
  onMessageRef.current = onMessage;

  // 注入连接命令
  const inject = useCallback((cmd: string) => {
    webViewRef.current?.injectJavaScript(cmd);
  }, []);

  const handleWebViewMessage = useCallback(
    async (event: any) => {
      const msg = JSON.parse(event.nativeEvent.data);

      if (msg.type === "open") {
        // WebSocket 连上了，发注册包
        onMessageRef.current?.({
          type: "msg",
          name: "系统公告",
          txt: "开始准备为您连接弹幕，请稍后...",
        });

        const joindata = await getHuyaRegisterData(Number(roomId));
        if (joindata) {
          inject(
            `window.postMessage(JSON.stringify({cmd:'send',data:${JSON.stringify(Array.from(joindata))}}),'*');`,
          );
          onMessageRef.current?.({
            type: "msg",
            name: "系统公告",
            txt: "弹幕系统连接成功！",
          });
        }

        // 启动心跳
        inject(
          `window.postMessage(JSON.stringify({cmd:'startHeartbeat',heartbeat:${JSON.stringify(Array.from(HEARTBEAT_BYTES))}}),'*');`,
        );

        // 启动批量发送
        inject(`window.postMessage(JSON.stringify({cmd:'startFlush'}),'*');`);
      }

      if (msg.type === "batch") {
        const rawMessages: number[][] = msg.data;
        for (const raw of rawMessages) {
          try {
            const uint8 = new Uint8Array(raw);
            const wsData = standardizedFormat(uint8.buffer);
            if (!isEmpty(wsData)) {
              if (wsData.type === "online") {
                const data = (await huya.getVipOnline(Number(roomId))) as any;
                onMessageRef.current?.({ ...wsData, vip: data.iTotal });
                continue;
              }
              onMessageRef.current?.(wsData);
            }
          } catch (e) {
            // 跳过解析失败的消息
          }
        }
      }

      if (msg.type === "error") {
        console.error("[弹幕系统-虎牙] WebView WS 连接错误");
      }
    },
    [roomId, inject],
  );

  return (
    <View
      style={{ position: "absolute", overflow: "hidden", width: 0, height: 0 }}
    >
      <WebView
        ref={webViewRef}
        source={{ html: HUYA_PROXY_HTML }}
        onMessage={handleWebViewMessage}
        style={{ width: 0, height: 0, opacity: 0, position: "absolute" }}
        containerStyle={{ width: 0, height: 0 }}
        javaScriptEnabled
        originWhitelist={["*"]}
        onLoadEnd={() => {
          // HTML 加载完成后，发起连接
          inject(`window.postMessage(JSON.stringify({cmd:'connect'}),'*');`);
        }}
      />
    </View>
  );
};
