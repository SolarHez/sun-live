import { Button, View } from "react-native";
import { usePlayerServers } from "@/hooks/test/usePlayerSevers";
import { VLCVideo } from "@/components/VLCPlayer";

export default function VideoPlayer() {
  const { playUrl, handleGetHuyaPlayUrl, handleGetDouyuPlayUrl } =
    usePlayerServers();
  return (
    <View className="flex-1">
      <View className="w-full h-1/3 bg-black">
        <VLCVideo url={playUrl || ""} />
      </View>
      <Button title="播放虎牙" onPress={handleGetHuyaPlayUrl} />
      <Button title="播放斗鱼" onPress={handleGetDouyuPlayUrl} />
    </View>
  );
}
