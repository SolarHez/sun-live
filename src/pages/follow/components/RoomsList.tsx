import { LinearGradient } from "expo-linear-gradient";
import { View, Text, Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { styled } from "nativewind";
import { Image } from "expo-image";
import { FlashList } from "@shopify/flash-list";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { formatHotValue } from "../utils";

const StyledImage = styled(Image);
const StyledPress = styled(Pressable as any);

export const RoomsList = ({ data }: { data: NoInfer<any[]> | undefined }) => {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <View className="flex-1 ">
      <FlashList
        data={data}
        numColumns={2}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <StyledPress
            className="flex-1 px-1 py-2  gap-2"
            onPress={() => {
              //   console.log(item);
              router.push(`/(player)?data=${JSON.stringify(item)}`);
            }}
          >
            <View className="relative rounded-xl overflow-hidden">
              <StyledImage source={item.pic} className="w-full h-40 " />
              <View className="absolute top-2 right-0  px-2 z-10 flex flex-row  justify-between items-center">
                <Text className="text-green-500 line-clamp-1 text-[0.75rem] ">
                  {item.isLive ? (item.isLoop ? "轮播" : "直播中") : ""}
                </Text>
              </View>
              <View className="absolute bottom-2 px-2 z-10 flex flex-row w-full justify-between items-center">
                <Text className="text-white line-clamp-1 text-[0.75rem]">
                  {item.cat}
                </Text>
                {item.isLive && (
                  <View className="flex flex-row items-center gap-1">
                    <MaterialIcons
                      name="local-fire-department"
                      size={12}
                      color="white"
                    />
                    <Text className="text-white line-clamp-1 text-[0.75rem]">
                      {formatHotValue(item.hot)}
                    </Text>
                  </View>
                )}
              </View>
              <View className="absolute bottom-0 left-0 right-0 h-full">
                <LinearGradient
                  colors={[
                    "rgba(0, 0, 0, 0.8)",
                    "rgba(0, 0, 0, 0)",
                    "rgba(0, 0, 0, 0.8)",
                  ]}
                  style={{ flex: 1 }}
                ></LinearGradient>
              </View>
              {!item.isLive && (
                <View className="absolute bottom-0 left-0 right-0 h-full">
                  <LinearGradient
                    colors={["rgba(0, 0, 0, 0.3)", "rgba(0, 0, 0, 1)"]}
                    style={{
                      flex: 1,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text className="text-muted line-clamp-1 text-sm">
                      主播休息中
                    </Text>
                  </LinearGradient>
                </View>
              )}
            </View>
            <View className="gap-1 px-1">
              <Text className="text-foreground line-clamp-1">{item.title}</Text>
              <View className="flex flex-row justify-between items-center gap-1">
                <Text className="text-muted-foreground line-clamp-1 text-sm">
                  {item.name}
                </Text>
                <Text className="text-muted-foreground line-clamp-1 text-[0.75rem]">
                  {item.platform === "douyu" ? "斗鱼" : "虎牙"}
                </Text>
              </View>
            </View>
          </StyledPress>
        )}
        contentContainerStyle={{
          paddingBottom: insets.bottom,
          paddingHorizontal: 2,
        }}
        ItemSeparatorComponent={() => <View className="h-2" />}
      />
    </View>
  );
};
