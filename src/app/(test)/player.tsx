import { usePlayerServers } from "@/hooks/test/usePlayerSevers";
import { useWebsocket } from "@/hooks/test/useWebsocket";
import { useState } from "react";
import { View, Text, Button, ScrollView } from "react-native";

export default function Player() {
  const {
    handleGetHuyaPlayUrl,
    handleGetVipOnline,
    handleGetDouyuPlayUrl,
    requestsData,
  } = usePlayerServers();
  const [danmuList, setDanmuList] = useState<object[]>([]);
  useWebsocket("10188", "huya", async (data) => {
    // console.log(data);
    setDanmuList([...danmuList, data]);
  });
  return (
    <View className="flex flex-col gap-2 px-4">
      <Button title="获取虎牙播放地址" onPress={handleGetHuyaPlayUrl}></Button>
      <Button title="获取虎牙Vip在线人数" onPress={handleGetVipOnline}></Button>
      <Button title="获取斗鱼播放地址" onPress={handleGetDouyuPlayUrl}></Button>
      <Text>当前弹幕数量: {danmuList.length}</Text>
      <ScrollView className="flex flex-col gap-2">
        {requestsData && (
          <View>
            <Text>{JSON.stringify(requestsData, null, 2)}</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
