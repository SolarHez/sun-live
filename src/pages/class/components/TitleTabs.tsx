import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Text, View } from "react-native";

export const TitleTabs = ({
  titleTabs,
  onValueChange,
  value,
}: {
  titleTabs?: NoInfer<any[]> | undefined;
  onValueChange?: ((value: string) => void | undefined) | undefined;
  value?: string;
}) => {
  if (!titleTabs) return null;
  return (
    <Tabs value={value || ""} onValueChange={onValueChange || (() => {})}>
      <TabsList className="bg-transparent py-8">
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
                tab.value === value && "text-blue-500",
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
