import { View } from "react-native";
import { usePlayerServers } from "@/hooks/test/usePlayerSevers";
import { VLCPlayer, VlCPlayerView } from "react-native-vlc-media-player";
import { StyleSheet } from "react-native";

export default function VideoPlayer() {
  const { playUrl, handleGetHuyaPlayUrl, handleGetDouyuPlayUrl } =
    usePlayerServers();

  return (
    <View>
      <VlCPlayerView
        autoplay={false}
        url="https://www.radiantmediaplayer.com/media/big-buck-bunny-360p.mp4"
        ggUrl=""
        showGG={true}
        showTitle={true}
        title="Big Buck Bunny"
        showBack={true}
        onLeftPress={() => {}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  video: {
    width: "100%",
    height: "100%",
  },
});
