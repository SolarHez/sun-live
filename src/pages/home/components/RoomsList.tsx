import { LinearGradient } from "expo-linear-gradient";
import { View, Text } from "react-native";
import { formatHotValue } from "../utils";
import { MaterialIcons } from "@expo/vector-icons";
import { styled } from "nativewind";
import { Image } from "expo-image";
import { FlashList } from "@shopify/flash-list";

const StyledImage = styled(Image);

export const RoomsList = ({ data }: { data: NoInfer<any[]> | undefined }) => {
  return (
    <View className=" py-4">
      <FlashList
        data={data}
        numColumns={2}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <View className="flex-1 mx-2 gap-2">
            <View className="relative rounded-xl overflow-hidden">
              <StyledImage source={item.pic} className="w-full h-35 " />
              <View className="absolute bottom-2 px-2 z-10 flex flex-row w-full justify-between items-center">
                <Text className="text-background line-clamp-1 text-[0.75rem]">
                  {item.cat}
                </Text>
                <View className="flex flex-row items-center gap-1">
                  <MaterialIcons
                    name="local-fire-department"
                    size={12}
                    color="white"
                  />
                  <Text className="text-background line-clamp-1 text-[0.75rem]">
                    {formatHotValue(item.hot)}
                  </Text>
                </View>
              </View>
              <View className="absolute bottom-0 left-0 right-0 h-1/3">
                <LinearGradient
                  colors={["rgba(76, 102, 159, 0)", "black"]}
                  style={{ flex: 1 }}
                ></LinearGradient>
              </View>
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
          </View>
        )}
        contentContainerStyle={{ gap: 16 }}
      />
    </View>
  );
};
