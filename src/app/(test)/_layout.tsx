import { Tabs } from "expo-router";

export default function TestLayout() {
  return (
    <Tabs initialRouteName="douyu">
      <Tabs.Screen name="index" options={{ title: "首页" }} />
      <Tabs.Screen name="douyu" options={{ title: "斗鱼测试页" }} />
      <Tabs.Screen name="huya" options={{ title: "虎牙测试页" }} />
      <Tabs.Screen name="player" options={{ title: "播放URL测试页" }} />
      <Tabs.Screen
        name="video"
        options={{ title: "视频测试页", headerShown: false }}
      />
    </Tabs>
  );
}
