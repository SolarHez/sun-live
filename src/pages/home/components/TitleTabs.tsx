import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Text, View } from "react-native";

export const TitleTabs = () => {
  const [value, setValue] = useState("all");
  const titleTabs = [
    { value: "all", label: "全部直播" },
    { value: "douyu", label: "斗鱼直播" },
    { value: "huya", label: "虎牙直播" },
  ];
  return (
    <Tabs value={value} onValueChange={setValue}>
      <TabsList className="bg-transparent">
        {titleTabs.map((tab, index) => (
          <TabsTrigger
            key={index}
            value={tab.value}
            className="bg-transparent h-10 w-25 flex flex-col"
          >
            <Text
              key={index}
              className={cn(
                "text-lg font-medium text-foreground",
                tab.value === value && "text-xl  text-blue-500",
              )}
            >
              {tab.label}
            </Text>
            {tab.value === value && (
              <View className="w-6 h-1 bg-blue-500 rounded-full absolute bottom-0"></View>
            )}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
};
