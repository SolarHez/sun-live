import { ActivityIndicator, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { TitleTabs } from "@/pages/home/components/TitleTabs";
import { useHomeData } from "@/pages/home/hooks/useHomeData";
import { RoomsList } from "@/pages/home/components/RoomsList";

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
    <View
      className="bg-background flex-1 "
      style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}
    >
      <TitleTabs titleTabs={titleTabs} value={value} onValueChange={setValue} />
      <RoomsList data={filteredData} />
    </View>
  );
}
