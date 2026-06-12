import { cn } from "@/lib/utils";
import { ClassOptionsIconList } from "@/pages/class/components/ClassOptionsIconList";
import { TitleTabs } from "@/pages/class/components/TitleTabs";
import { useClassData } from "@/pages/class/hooks/useClassData";
import { useState } from "react";
import { View, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Class() {
  const insets = useSafeAreaInsets();
  const { activeTab, setActiveTab, titleTabs, filteredClassOptions } =
    useClassData({});

  const [selectedIndex, setSelectedIndex] = useState(0);
  return (
    <View className="bg-background flex-1 " style={{ paddingTop: insets.top }}>
      <TitleTabs
        value={activeTab}
        onValueChange={setActiveTab}
        titleTabs={titleTabs}
      />
      <View className="flex-row gap-2 px-4">
        {filteredClassOptions?.map((item: any, index: number) => (
          <Text
            key={index}
            className={cn("text-lg font-semibold p-2", {
              "text-[#007AFF]": selectedIndex === index,
            })}
            onPress={() => {
              setSelectedIndex(index);
            }}
          >
            {item.cname}
          </Text>
        ))}
      </View>
      <ClassOptionsIconList
        data={filteredClassOptions?.[selectedIndex]?.list}
      />
    </View>
  );
}
