import { Button, View } from "react-native";
import { usePlayerServers } from "@/hooks/test/usePlayerSevers";
import { VLCPlayer, VlCPlayerView } from "react-native-vlc-media-player";
import { StyleSheet } from "react-native";
import { useState } from "react";

export default function VideoPlayer() {
  const { playUrl, handleGetHuyaPlayUrl, handleGetDouyuPlayUrl } =
    usePlayerServers();
  const [paused, setPaused] = useState(true);
  return (
    <View>
      <View>
        <VLCPlayer
          style={[styles.video]}
          videoAspectRatio="16:9"
          source={{ uri: playUrl || "" }}
          paused={paused}
          onProgress={(progress) => {
            console.log(progress);
          }}
        />
      </View>
      <Button title="播放虎牙" onPress={handleGetHuyaPlayUrl} />
      <Button title="播放斗鱼" onPress={handleGetDouyuPlayUrl} />
      <Button
        title={paused ? "播放" : "暂停"}
        onPress={() => setPaused(!paused)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  video: {
    width: "100%",
    height: "80%",
  },
});
