import {
  Dimensions,
  Pressable,
  View,
  Text,
  ActivityIndicator,
} from "react-native";
import { VLCPlayer } from "react-native-vlc-media-player";
import { useEffect, useRef, useState } from "react";

import * as ScreenOrientation from "expo-screen-orientation";
import { Ionicons, Feather } from "@expo/vector-icons";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import SystemSetting from "react-native-system-setting";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { getCurrentTime } from "./utils/time";

interface VideoPlayerProps {
  url: string;
  title?: string;
  children?: React.ReactNode;
  onFullscreenChange?: (isFullscreen: boolean) => void;
}

export const VLCVideo = ({
  url,
  title,
  children,
  onFullscreenChange,
}: VideoPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [paused, setPaused] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);
  const httpsUrl = url.replace("http://", "https://") || "";
  const router = useRouter();

  const bufferTimeRef = useRef<number>(0);
  const bufferIntervalRef = useRef<any>(null);

  const handleBuffering = () => {
    setIsBuffering(true);
    bufferTimeRef.current = new Date().getTime();

    if (!bufferIntervalRef.current) {
      bufferIntervalRef.current = setInterval(() => {
        const currentTime = new Date().getTime();
        const diffTime = currentTime - bufferTimeRef.current;
        if (diffTime > 1000) {
          clearInterval(bufferIntervalRef.current);
          bufferIntervalRef.current = null;
          setIsBuffering(false);
          console.log("缓冲完成");
        }
      }, 250);
    }
  };

  useEffect(() => {
    return () => {
      if (bufferIntervalRef.current) {
        clearInterval(bufferIntervalRef.current);
      }
    };
  }, []);

  const originalBrightnessRef = useRef<number>(0.5);

  // 进入时保存原始亮度
  useEffect(() => {
    SystemSetting.getAppBrightness().then((bri) => {
      originalBrightnessRef.current = bri;
    });

    // 退出时恢复原始亮度
    return () => {
      if (originalBrightnessRef.current >= 0) {
        SystemSetting.setAppBrightness(originalBrightnessRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isFullscreen) {
      SystemSetting.setAppBrightness(originalBrightnessRef.current);
    }

    onFullscreenChange?.(isFullscreen);
  }, [isFullscreen, onFullscreenChange]);

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
    router.back();
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

  const controlsOpacity = useSharedValue(0);
  const controlsAnimatedStyle = useAnimatedStyle(() => ({
    opacity: controlsOpacity.value,
    pointerEvents: controlsOpacity.value > 0.5 ? "auto" : "none",
  }));

  const newTime = useRef<string>("");
  const controlsTimeoutRef = useRef<any>(null);
  const handleControlsPress = () => {
    clearTimeout(controlsTimeoutRef.current);
    newTime.current = getCurrentTime();
    const value = controlsOpacity.value === 1 ? 0 : 1;
    controlsOpacity.value = withTiming(value, { duration: 300 });
    controlsTimeoutRef.current = setTimeout(() => {
      controlsOpacity.value = withTiming(0, { duration: 300 });
    }, 6000);
  };

  const singleTap = Gesture.Tap()
    .onEnd(() => {
      handleControlsPress();
    })
    .runOnJS(true);

  const doubleTap = Gesture.Tap()
    .numberOfTaps(2)
    .onEnd(() => {
      toggleFullscreen();
    })
    .runOnJS(true);

  const screenWidth = Dimensions.get("window").width;
  const VolumeRef = useRef<number>(0.5);
  const BrightnessRef = useRef<number>(0.25);
  const drag = Gesture.Pan()
    .onStart(() => {
      SystemSetting.getVolume().then((vol) => {
        VolumeRef.current = vol;
      });
      SystemSetting.getAppBrightness().then((bri) => {
        BrightnessRef.current = bri;
      });
    })
    .onUpdate((e) => {
      if (!isFullscreen) return;
      if (e.x < screenWidth / 2) {
        const brightness = 0 - e.translationY * 0.005;
        SystemSetting.setAppBrightness(BrightnessRef.current + brightness);
        console.log("亮度区域", brightness + BrightnessRef.current);
      } else {
        const volume = 0 - e.translationY * 0.01;
        SystemSetting.setVolume(VolumeRef.current + volume, { showUI: true });
        console.log("音量区域", volume + VolumeRef.current);
      }
    })
    .runOnJS(true);

  const gesture = Gesture.Exclusive(doubleTap, singleTap, drag);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View className="flex-1">
        <View className="w-full h-full bg-black">
          <VLCPlayer
            style={{ flex: 1 }}
            videoAspectRatio="16:9"
            source={{ uri: httpsUrl }}
            onPlaying={() => {
              setIsPlaying(true);
              setIsBuffering(false);
            }}
            onPaused={() => setIsPlaying(false)}
            paused={paused}
            onBuffering={handleBuffering}
          />
          <GestureDetector gesture={gesture}>
            <View className="w-full h-full absolute z-50 inset-0">
              {/* 控制层 */}
              <View className="absolute z-50 inset-0 w-full h-full ">
                <View className="h-full relative">
                  <Animated.View
                    style={controlsAnimatedStyle}
                    className="h-12 absolute top-0 w-full  flex justify-center z-10"
                  >
                    <View className="flex flex-row items-center  w-full relative">
                      <View className="flex flex-row items-center">
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
                        {title && (
                          <Text className="text-xl font-bold text-white max-w-65 line-clamp-1">
                            {title}
                          </Text>
                        )}
                      </View>
                      {isFullscreen && (
                        <View className="absolute w-full h-full flex justify-center items-center">
                          <Text className="text-white text-center font-semibold">
                            {newTime.current}
                          </Text>
                        </View>
                      )}
                    </View>
                  </Animated.View>
                  <Animated.View
                    style={controlsAnimatedStyle}
                    className=" z-10 h-12 absolute bottom-0 w-full px-2 flex justify-center"
                  >
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
                  </Animated.View>
                  <Animated.View
                    style={controlsAnimatedStyle}
                    className="absolute bottom-0 left-0 right-0 h-full"
                  >
                    <LinearGradient
                      colors={[
                        "rgba(0, 0, 0, 0.5)",
                        "rgba(0, 0, 0, 0)",
                        "rgba(0, 0, 0, 0)",
                        "rgba(0, 0, 0, 0.5)",
                      ]}
                      style={{ flex: 1 }}
                    ></LinearGradient>
                  </Animated.View>
                  {isBuffering && (
                    <View className="absolute bottom-0 left-0 right-0 h-full flex justify-center items-center">
                      <ActivityIndicator className="flex-1 justify-center items-center" />
                    </View>
                  )}
                </View>
              </View>
            </View>
          </GestureDetector>
        </View>
        {!isFullscreen && <View>{children}</View>}
      </View>
    </GestureHandlerRootView>
  );
};
