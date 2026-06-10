import { Button, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { usePlayerServers } from "@/hooks/test/usePlayerSevers";
import { VLCVideo } from "@/components/VLCPlayer";

export default function VideoPlayer() {
  const { playUrl, handleGetHuyaPlayUrl, handleGetDouyuPlayUrl } =
    usePlayerServers();
  return (
    <SafeAreaView className="flex-1">
      <View className="w-full h-1/3 bg-black">
        <VLCVideo url={playUrl || ""}>
          <Button title="播放虎牙" onPress={handleGetHuyaPlayUrl} />
          <Button title="播放斗鱼" onPress={handleGetDouyuPlayUrl} />
        </VLCVideo>
      </View>
    </SafeAreaView>
  );
}
