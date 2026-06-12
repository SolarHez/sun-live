import { ClassRoomsList } from "@/pages/class/components/ClassRoomsList";
import { useClassData } from "@/pages/class/hooks/useClassData";
import { useLocalSearchParams, useRouter } from "expo-router";
import { View, Text, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { styled } from "nativewind";
import { formatHotValue } from "@/pages/class/utils";
import { Ionicons, SimpleLineIcons } from "@expo/vector-icons";

const StyledImage = styled(Image);
const StyledPress = styled(Pressable as any);
export default function ClassIndex() {
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams() as unknown as any;
  const router = useRouter();
  const { platform, hot, cname2, icon } = JSON.parse(params.data.toString());
  const { classRoomsList } = useClassData({ data: params.data });
  console.log(classRoomsList);
  return (
    <View className="bg-background flex-1 " style={{ paddingTop: insets.top }}>
      <View className="px-4 flex-row items-center">
        <StyledPress onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} className="text-black" />
        </StyledPress>
        <View className="px-2 flex-row items-center">
          <StyledImage
            source={{
              uri: icon,
            }}
            className="w-16 h-16 rounded-full"
          />
          <View className="ml-2">
            <View className="flex-row gap-2 items-center">
              <Text className="text-2xl font-bold">{cname2}</Text>
              <Text className="text-[0.75rem] text-muted-foreground bg-muted px-2 rounded-xl">
                {platform == "douyu" ? "斗鱼" : "虎牙"}
              </Text>
            </View>
            <View className="flex-row items-center gap-1">
              <SimpleLineIcons
                name="fire"
                size={10}
                className="text-muted-foreground"
              />
              <Text className="text-[0.75rem] text-muted-foreground">
                分区热度{formatHotValue(hot)}
              </Text>
            </View>
          </View>
        </View>
      </View>

      <ClassRoomsList data={classRoomsList} />
    </View>
  );
}
