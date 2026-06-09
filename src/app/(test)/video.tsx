import { VideoRef, Video } from "react-native-video";
import { useRef } from "react";
import { usePlayerServers } from "@/hooks/test/usePlayerSevers";
import { Button, View } from "react-native";

export default function VideoPlayer() {
  const videoRef = useRef<VideoRef>(null);
  const { playUrl, handleGetHuyaPlayUrl, handleGetDouyuPlayUrl } =
    usePlayerServers();
  return (
    <View>
      <Video
        ref={videoRef}
        source={{
          uri: playUrl || "",
          // 根据后缀自动识别格式，如果是斗鱼动态下发的流，手动指定对应的 type
          type: playUrl?.includes?.(".flv") ? "flv" : "m3u8",
        }}
        controls={true}
        style={{ width: "100%", height: 250 }}
        resizeMode="contain"
        onError={(err) => console.log("播放失败原因:", err)}
      />
      <Button title="获取虎牙播放地址" onPress={handleGetHuyaPlayUrl}></Button>
      <Button title="获取斗鱼播放地址" onPress={handleGetDouyuPlayUrl}></Button>
    </View>
  );
}
