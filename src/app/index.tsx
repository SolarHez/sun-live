import { Redirect } from "expo-router";
import { Text, View } from "react-native";

export default function App() {
  return (
    <View>
      <Text>首页</Text>
      <Redirect href="/(test)/douyu" />
    </View>
  );
}
