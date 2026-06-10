import { Dimensions, Modal, Pressable, View } from "react-native";
import { VLCPlayer } from "react-native-vlc-media-player";
import { useEffect, useMemo, useRef, useState } from "react";
import { cssInterop } from "nativewind";
import * as ScreenOrientation from "expo-screen-orientation";
import { Ionicons, Feather } from "@expo/vector-icons";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";

cssInterop(Pressable, { className: "style" });
cssInterop(Modal, { className: "style" });

interface VideoPlayerProps {
  url: string;
  children?: React.ReactNode;
}

export const VLCVideo = ({ url, children }: VideoPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [paused, setPaused] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const httpsUrl = url.replace("http://", "https://") || "";
  const insets = useSafeAreaInsets();

  // 组件挂载时重置方向状态
  useEffect(() => {
    const resetOrientation = async () => {
      try {
        await ScreenOrientation.lockAsync(
          ScreenOrientation.OrientationLock.PORTRAIT_UP,
        );
      } catch (error) {
        console.warn("重置屏幕方向失败:", error);
      }
    };
    resetOrientation();

    // 组件卸载时恢复默认方向
    return () => {
      ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.DEFAULT,
      ).catch(() => {});
    };
  }, []);

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
          ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT,
        );
      }
      setIsFullscreen(!isFullscreen);
    } catch (error) {
      console.error("屏幕方向切换失败:", error);
      // 失败时重置状态
      setIsFullscreen(false);
      // 尝试恢复默认方向
      try {
        await ScreenOrientation.lockAsync(
          ScreenOrientation.OrientationLock.DEFAULT,
        );
      } catch (fallbackError) {
        console.error("恢复默认方向失败:", fallbackError);
      }
    }
  };

  const controlsTimeoutRef = useRef<any>(null);
  const handleControlsPress = () => {
    console.log("handleControlsPress");
    clearTimeout(controlsTimeoutRef.current);
    setShowControls(false);
    controlsTimeoutRef.current = setTimeout(() => {
      setShowControls(true);
    }, 2000);
  };

  const singleTap = Gesture.Tap()
    .onEnd(() => {
      console.log("singleTap");
      handleControlsPress();
    })
    .runOnJS(true);

  const doubleTap = Gesture.Tap()
    .numberOfTaps(2)
    .onEnd(() => {
      console.log("doubleTap");
      toggleFullscreen();
    })
    .runOnJS(true);

  const screenWidth = Dimensions.get("window").width;
  const drag = Gesture.Pan()
    .onStart((e) => {
      console.log("开始拖拽");
    })
    .onUpdate((e) => {
      if (e.x < screenWidth / 2) {
        console.log("亮度区域", 0 - e.translationY * 0.01);
      } else {
        console.log("音量区域", 0 - e.translationY * 0.01);
      }
    })
    .onEnd(() => {
      console.log("结束拖拽");
    });

  const gesture = Gesture.Exclusive(doubleTap, singleTap, drag);

  return (
    <Modal visible={true} supportedOrientations={["portrait", "landscape"]}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <View
          className="flex-1"
          style={{ paddingTop: isFullscreen ? 0 : insets.top }}
        >
          <View
            className={
              isFullscreen ? "w-full h-full bg-black" : "w-full h-1/3 bg-black"
            }
          >
            <VLCPlayer
              style={{ flex: 1 }}
              videoAspectRatio="16:9"
              source={{ uri: httpsUrl }}
              onPlaying={() => setIsPlaying(true)}
              onPaused={() => setIsPlaying(false)}
              paused={paused}
              volume={0}
            />
            <GestureDetector gesture={gesture}>
              <View className="w-full h-full absolute z-50 inset-0">
                {/* 控制层 */}
                <View
                  className={`absolute z-50 inset-0 w-full h-full ${showControls ? "opacity-0" : "opacity-100"}`}
                >
                  <View className="h-full relative">
                    <View
                      className={`h-12 absolute top-0 w-full  flex justify-center`}
                    >
                      <View className="flex flex-row items-center justify-between">
                        <Pressable
                          onPress={handleBackPress}
                          className="p-2 h-full"
                        >
                          <Ionicons
                            name="chevron-back"
                            size={24}
                            color="white"
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
                          {isPlaying ? (
                            <Ionicons name="pause" size={24} color="white" />
                          ) : (
                            <Ionicons name="play" size={24} color="white" />
                          )}
                        </Pressable>
                        <Pressable
                          onPress={async () => await toggleFullscreen()}
                          className="p-2 h-full"
                        >
                          {isFullscreen ? (
                            <Feather name="minimize" size={24} color="white" />
                          ) : (
                            <Feather name="maximize" size={24} color="white" />
                          )}
                        </Pressable>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </GestureDetector>
          </View>
          {!isFullscreen && <View>{children}</View>}
        </View>
      </GestureHandlerRootView>
    </Modal>
  );
};
