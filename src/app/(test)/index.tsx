import AppIcon from "@/components/AppIcons";
import { View } from "react-native";
import { IconHeartCog } from "@tabler/icons-react-native";

export default function Test() {
  return (
    <View>
      <AppIcon icon={IconHeartCog} className="text-red-500" />
    </View>
  );
}
