import { useHuyaServers } from "@/hooks/test/useHuyaServers";
import { Button, View, Text, ScrollView } from "react-native";

export default function Huya() {
  const {
    handleGetRoomInfo,
    handleGetHomeRooms,
    handleGetClassRooms,
    handleGetClassOption,
    requestsData,
  } = useHuyaServers();
  return (
    <View className="flex flex-col gap-2 px-4">
      <Button title="获取房间信息" onPress={handleGetRoomInfo}></Button>
      <Button title="获取首页列表" onPress={handleGetHomeRooms}></Button>
      <Button title="获取分类下的房间" onPress={handleGetClassRooms}></Button>
      <Button title="获取分类" onPress={handleGetClassOption}></Button>
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
