import { LinearGradient } from "expo-linear-gradient";
import { View, Text, Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { styled } from "nativewind";
import { Image } from "expo-image";
import { FlashList } from "@shopify/flash-list";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

const StyledImage = styled(Image);
const StyledPress = styled(Pressable as any);

export const ClassOptionsIconList = ({
  data,
}: {
  data: NoInfer<any[]> | undefined;
}) => {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  if (!data) {
    return null;
  }
  return (
    <View className="flex-1 ">
      <FlashList
        data={data}
        numColumns={5}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => {
          const classOptions = item as any;
          return (
            <StyledPress
              className="flex-1 items-center justify-center"
              onPress={() => {
                router.push(`/(class)?data=${JSON.stringify(classOptions)}`);
              }}
            >
              <StyledImage
                source={{
                  uri: classOptions.icon,
                }}
                className="w-16 h-16 rounded-full"
              />
              <Text className="text-[0.75rem]">{classOptions.cname2}</Text>
            </StyledPress>
          );
        }}
        contentContainerStyle={{
          paddingBottom: insets.bottom,
          paddingHorizontal: 2,
        }}
        ItemSeparatorComponent={() => <View className="h-2" />}
      />
    </View>
  );
};
