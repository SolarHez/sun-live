import douyu from "@/servers/core/douyu";
import { useState } from "react";

export const useDouyuServers = () => {
  const [requestsData, setRequestsData] = useState<any | null>(null);
  // 获取房间信息
  const handleGetRoomInfo = async () => {
    const data = await douyu.getRoomInfo(63136);
    if (!data) return;
    setRequestsData(data);
  };

  // 获取首页
  const handleGetHomeRooms = async () => {
    const data = await douyu.getHomeRooms(1);
    if (!data) return;
    setRequestsData(data);
  };

  // 获取分类下的房间
  const handleGetClassRooms = async () => {
    const data = await douyu.getClassRooms("1", 1);
    if (!data) return;
    setRequestsData(data);
  };

  // 获取分类
  const handleGetClassOption = async () => {
    const data = await douyu.getClassOption();
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
