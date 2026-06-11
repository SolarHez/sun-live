import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function AppLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          title: "首页",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="follow"
        options={{
          headerShown: false,
          title: "关注",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="heart" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="class"
        options={{
          headerShown: false,
          title: "分类",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="grid" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="setting"
        options={{
          headerShown: false,
          title: "设置",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
