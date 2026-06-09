import huya from "@/servers/core/huya";
import { useState } from "react";

export const useHuyaServers = () => {
  const [requestsData, setRequestsData] = useState<any | null>(null);
  // 获取房间信息
  const handleGetRoomInfo = async () => {
    const data = await huya.getRoomInfo(10188);
    if (!data) return;
    setRequestsData(data);
  };

  // 获取首页
  const handleGetHomeRooms = async () => {
    const data = await huya.getHomeRooms(1);
    if (!data) return;
    setRequestsData(data);
  };

  // 获取分类下的房间
  const handleGetClassRooms = async () => {
    const data = await huya.getClassRooms("1", 1);
    if (!data) return;
    setRequestsData(data);
  };

  // 获取分类
  const handleGetClassOption = async () => {
    const data = await huya.getClassOption();
    if (!data) return;
    setRequestsData(data);
  };

  return {
    handleGetRoomInfo,
    handleGetHomeRooms,
    handleGetClassRooms,
    handleGetClassOption,
    requestsData,
  };
};
