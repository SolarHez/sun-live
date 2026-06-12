import { ActivityIndicator, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { TitleTabs } from "@/pages/home/components/TitleTabs";
import { useHomeData } from "@/pages/home/hooks/useHomeData";
import { RoomsList } from "@/pages/home/components/RoomsList";
import { Ionicons } from "@expo/vector-icons";

export default function Index() {
  const insets = useSafeAreaInsets();
  const { filteredData, titleTabs, isLoading, error, value, setValue } =
    useHomeData();

  if (isLoading) {
    return (
      <ActivityIndicator
        className="flex-1 justify-center items-center"
        size="large"
      />
    );
  }

  if (error) {
    return (
      <Text className="text-red-500 flex-1">加载失败: {error.message}</Text>
    );
  }

  return (
    <View className="bg-background flex-1 " style={{ paddingTop: insets.top }}>
      <View className="flex-row justify-between items-center">
        <TitleTabs
          titleTabs={titleTabs}
          value={value}
          onValueChange={setValue}
        />
        <Ionicons
          name="search"
          size={24}
          className="text-muted-foreground px-4"
        />
      </View>
      <RoomsList data={filteredData} />
    </View>
  );
}
