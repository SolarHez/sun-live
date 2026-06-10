import { Pressable, View } from "react-native";
import { VLCPlayer } from "react-native-vlc-media-player";
import AppIcon from "../AppIcons";
import {
  IconChevronLeft,
  IconMaximize,
  IconMinimize,
  IconPlayerPauseFilled,
  IconPlayerPlayFilled,
} from "@tabler/icons-react-native";
import { useState } from "react";
import { cssInterop } from "nativewind";
import * as ScreenOrientation from "expo-screen-orientation";

cssInterop(Pressable, { className: "style" });

interface VideoPlayerProps {
  url: string;
}

export const VLCVideo = ({ url }: VideoPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [paused, setPaused] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const httpsUrl = url.replace("http://", "https://") || "";

  const handleBackPress = () => {
    if (isFullscreen) {
      toggleFullscreen();
      return;
    }
  };

  const toggleFullscreen = async () => {
    try {
      if (isFullscreen) {
        await ScreenOrientation.lockAsync(
          ScreenOrientation.OrientationLock.PORTRAIT_UP,
        );
      } else {
        await ScreenOrientation.lockAsync(
          ScreenOrientation.OrientationLock.LANDSCAPE_LEFT,
        );
      }
      setIsFullscreen(!isFullscreen);
    } catch (error) {
      console.error("屏幕方向切换失败:", error);
    }
  };

  return (
    <View className="w-full h-full  relative bg-black">
      {/* 控制层 */}
      <View className="absolute z-50 inset-0 w-full h-full ">
        <View className="h-full relative">
          <View className=" h-12 absolute top-0 w-full px-2 flex justify-center">
            <View className="flex flex-row items-center justify-between">
              <Pressable onPress={handleBackPress} className="p-2 h-full">
                <AppIcon
                  icon={IconChevronLeft}
                  className="text-white text-center"
                />
              </Pressable>
            </View>
          </View>
          <View className=" h-12 absolute bottom-0 w-full px-2 flex justify-center">
            <View className="flex flex-row items-center justify-between">
              <Pressable
                onPress={() => setPaused(!paused)}
                className="p-2 h-full"
              >
                <AppIcon
                  icon={
                    isPlaying ? IconPlayerPauseFilled : IconPlayerPlayFilled
                  }
                  className="text-white text-center"
                />
              </Pressable>
              <Pressable
                onPress={async () => await toggleFullscreen()}
                className="p-2 h-full"
              >
                <AppIcon
                  icon={isFullscreen ? IconMinimize : IconMaximize}
                  className="text-white text-center"
                />
              </Pressable>
            </View>
          </View>
        </View>
      </View>
      <VLCPlayer
        style={{ flex: 1 }}
        videoAspectRatio="16:9"
        source={{ uri: httpsUrl }}
        onPlaying={() => setIsPlaying(true)}
        onPaused={() => setIsPlaying(false)}
        paused={paused}
      />
    </View>
  );
};
