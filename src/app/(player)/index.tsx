import { VLCVideo } from "@/components/VLCPlayer";
import { cn } from "@/lib/utils";
import { usePlayerData } from "@/pages/player/hooks/usePlayerData";
import { formatHotValue } from "@/pages/player/utils";
import { useLocalSearchParams } from "expo-router";
import { styled } from "nativewind";
import { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Pressable,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { FontAwesome, FontAwesome5, Ionicons } from "@expo/vector-icons";
import { Input } from "@/components/ui/input";

const StyledImage = styled(Image);
const StyledPressable = styled(Pressable as any);

export default function Player() {
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams() as unknown as any;
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleFullscreenChange = (isFullscreen: boolean) => {
    setIsFullscreen(isFullscreen);
  };

  const {
    playerUrl,
    roomData,
    danmuList,
    onlineCount,
    handleFollow,
    isFollow,
  } = usePlayerData({
    data: params.data,
  });

  const scrollViewRef = useRef<ScrollView>(null);
  useEffect(() => {
    if (danmuList.length > 0) {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }
  }, [danmuList]);
  return (
    <View
      className={cn(
        "w-full flex-1 bg-background",
        isFullscreen ? "bg-black" : "bg-background",
      )}
      style={{
        paddingTop: isFullscreen ? 0 : insets.top,
        paddingBottom:
          Platform.OS === "ios" ? (isFullscreen ? 0 : insets.bottom) : 0,
        paddingHorizontal: insets.left,
        paddingRight: insets.right,
      }}
    >
      <View className={cn("w-full ", isFullscreen ? "h-full" : "h-70")}>
        <VLCVideo
          url={playerUrl || ""}
          title={roomData.title || ""}
          danmu={danmuList[danmuList.length - 1] || {}}
          onFullscreenChange={handleFullscreenChange}
        ></VLCVideo>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className={cn(
          "flex-1 bg-background",
          isFullscreen ? "hidden" : "block",
        )}
        style={{ paddingBottom: insets.bottom }}
      >
        <View className="w-full flex-row justify-between items-center gap-2 p-4">
          <View className="flex-row items-center gap-3 ">
            <StyledImage
              source={roomData.avatar}
              className="h-12 w-12 rounded-full"
            />
            <View className="flex">
              <View className="flex-row items-center gap-2">
                <Text className="text-foreground font-bold">
                  {roomData.name || ""}
                </Text>
                <Text className="text-muted-foreground text-[0.75rem] bg-accent px-2 rounded-full">
                  {roomData.platform === "huya" ? "虎牙直播" : "斗鱼直播"}
                </Text>
                <Text className="text-muted-foreground text-[0.75rem] bg-accent px-2 rounded-full">
                  {roomData.cat || "其他"}
                </Text>
              </View>
              <View className="flex-row items-center gap-4 ">
                {onlineCount.vip && (
                  <View className="flex-row items-center">
                    <FontAwesome
                      name="user"
                      size={12}
                      className="text-muted-foreground"
                    />
                    <Text className="text-muted-foreground text-sm mx-1 ">
                      贵宾
                    </Text>
                    <Text className="text-muted-foreground text-sm ">
                      {onlineCount.vip || 0}
                    </Text>
                  </View>
                )}

                <View className="flex-row items-center">
                  <FontAwesome5
                    name="fire"
                    size={12}
                    className="text-muted-foreground"
                  />
                  <Text className="text-muted-foreground text-sm mx-1 ">
                    热度
                  </Text>
                  <Text className="text-muted-foreground text-sm ">
                    {formatHotValue(onlineCount.hot || roomData.hot || "")}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <StyledPressable
            onPress={handleFollow}
            className={cn(
              "items-center gap-2 px-4 py-1.5 rounded-full",
              isFollow ? "bg-muted" : "bg-blue-500",
            )}
          >
            <Text
              className={cn(
                "text-background font-medium",
                isFollow ? "text-muted-foreground" : "text-background",
              )}
            >
              {isFollow ? "已关注" : "关注"}
            </Text>
          </StyledPressable>
        </View>

        <ScrollView ref={scrollViewRef} className="w-full h-full px-2">
          {danmuList.slice(-30).map((item, index) => {
            if (!item.txt || !item.name) {
              return null;
            }
            return (
              <View
                key={item.id || index}
                className="flex flex-wrap items-center p-2 px-4 my-1 bg-muted rounded-xl"
              >
                <Text className="text-blue-500 font-semibold">
                  {item.name}：
                  <Text className="text-foreground font-medium">
                    {item.txt}
                  </Text>
                </Text>
              </View>
            );
          })}
        </ScrollView>
        <View className="w-full p-4 flex-row items-center gap-4">
          <Input
            keyboardType="default"
            placeholder="发送弹幕"
            style={{
              height: 40,
              borderRadius: 20,
              width: "90%",
            }}
          />
          <Ionicons
            name="settings-outline"
            size={24}
            className="text-muted-foreground"
          />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}
