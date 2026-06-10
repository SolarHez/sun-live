import douyu from "@/servers/core/douyu";
import huya from "@/servers/core/huya";
import { useState } from "react";

export const usePlayerServers = () => {
  const [requestsData, setRequestsData] = useState<any | null>(null);
  const [playUrl, setPlayUrl] = useState<string | null>(null);
  // 获取虎牙直播间播放地址 https://www.huya.com/
  const handleGetHuyaPlayUrl = async () => {
    const playUrl = await huya.getPlayUrl(11336726);
    if (!playUrl) return;
    setRequestsData(playUrl);
    setPlayUrl(playUrl.url);
    console.log(playUrl);
  };

  // 获取Vip在线人数
  const handleGetVipOnline = async () => {
    const vipOnline = await huya.getVipOnline(11336726);
    if (!vipOnline) return;
    setRequestsData(vipOnline);
  };

  // 获取斗鱼直播间播放地址
  const handleGetDouyuPlayUrl = async () => {
    const playUrl = await douyu.getPlayUrl(260322);
    if (!playUrl) return;
    setRequestsData(playUrl);
    setPlayUrl(playUrl.url);
    console.log(playUrl);
  };

  return {
    handleGetHuyaPlayUrl,
    handleGetVipOnline,
    handleGetDouyuPlayUrl,
    requestsData,
    playUrl,
  };
};
