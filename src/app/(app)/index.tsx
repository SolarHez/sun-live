import { ActivityIndicator, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { TitleTabs } from "@/pages/home/components/TitleTabs";
import { useHomeData } from "@/pages/home/hooks/useHomeData";

export default function Index() {
  const insets = useSafeAreaInsets();
  const { data, isLoading, isFetching, error } = useHomeData();
  console.log(data);
  if (isLoading) {
    return (
      <ActivityIndicator
        className="flex-1 justify-center items-center"
        size="large"
      />
    );
  }

  if (error) {
    return <Text className="text-red-500">加载失败: {error.message}</Text>;
  }

  return (
    <View
      className="bg-background flex-1 px-4"
      style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}
    >
      <TitleTabs />
    </View>
  );
}
