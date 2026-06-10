import AppIcon from "@/components/AppIcons";
import { View } from "react-native";
import { IconSettings } from "@tabler/icons-react-native";

export default function Test() {
  return (
    <View>
      <AppIcon icon={IconSettings} className="text-red-500" />
    </View>
  );
}
