import { ActivityIndicator, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { TitleTabs } from "@/pages/home/components/TitleTabs";
import { useHomeData } from "@/pages/home/hooks/useHomeData";
import { FlatList } from "react-native";
import { Image } from "expo-image";
import { styled } from "nativewind";
import { formatHotValue } from "@/pages/home/utils";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const StyledImage = styled(Image);

export default function Index() {
  const insets = useSafeAreaInsets();
  const { data, isLoading, isFetching, error } = useHomeData();

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
      className="bg-background flex-1 "
      style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}
    >
      <TitleTabs />
      <View className=" pt-4">
        <FlatList
          data={data}
          numColumns={2}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => (
            <View className="flex-1 mx-2 gap-2">
              <View className="relative">
                <StyledImage
                  source={item.pic}
                  className="w-full h-35 rounded-xl"
                />
                <View className="absolute bottom-2 px-2 flex flex-row w-full justify-between items-center">
                  <Text className="text-background line-clamp-1 text-sm">
                    {item.name}
                  </Text>
                  <View className="flex flex-row items-center gap-1">
                    <MaterialIcons
                      name="local-fire-department"
                      size={16}
                      color="white"
                    />
                    <Text className="text-background line-clamp-1 text-sm">
                      {formatHotValue(item.hot)}
                    </Text>
                  </View>
                </View>
                <View className="absolute bottom-0 left-0 right-0 h-full">
                  <LinearGradient
                    colors={["#ffffff", "rgba(76, 102, 159, 0)"]}
                    style={{ flex: 1 }}
                  ></LinearGradient>
                </View>
              </View>
              <View className="gap-1 px-2">
                <Text className="text-foreground line-clamp-1">
                  {item.title}
                </Text>
              </View>
            </View>
          )}
          contentContainerStyle={{ gap: 16 }}
        />
      </View>
    </View>
  );
}
