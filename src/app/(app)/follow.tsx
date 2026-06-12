import { RoomsList } from "@/pages/follow/components/RoomsList";
import { TitleTabs } from "@/pages/follow/components/TitleTabs";
import { useFollowData } from "@/pages/follow/hooks/useFollowData";
import { View, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Follow() {
  const insets = useSafeAreaInsets();
  const { filteredList, titleTabs, activeTab, setActiveTab } = useFollowData();
  return (
    <View className="bg-background flex-1 " style={{ paddingTop: insets.top }}>
      <TitleTabs
        titleTabs={titleTabs}
        value={activeTab}
        onValueChange={setActiveTab}
      />
      <RoomsList data={filteredList} />
    </View>
  );
}
