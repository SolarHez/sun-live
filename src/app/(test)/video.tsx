import { View } from "react-native";
import { usePlayerServers } from "@/hooks/test/usePlayerSevers";

export default function VideoPlayer() {
  const { playUrl, handleGetHuyaPlayUrl, handleGetDouyuPlayUrl } =
    usePlayerServers();

  return <View></View>;
}
