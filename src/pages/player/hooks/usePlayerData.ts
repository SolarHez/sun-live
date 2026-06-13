import douyu from "@/servers/core/douyu";
import huya from "@/servers/core/huya";
import followSql from "@/sql/sqliteFollow";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { useWebsocket, WsPlatformMap } from "./useWebsocket";

interface PlayerData {
  name?: string;
  rid?: number;
  title?: string;
  avatar?: string;
  pic?: string;
  hot?: number;
  cat?: string;
  label?: string;
  platform?: keyof WsPlatformMap;
  isLoop?: boolean;
  isLive?: boolean;
}

export const usePlayerData = ({ data }: { data: PlayerData }) => {
  const roomData = useMemo(() => {
    try {
      return JSON.parse(data.toString());
    } catch {
      return data;
    }
  }, [data]);
  const { rid, platform, title } = roomData;
  const getPlayerUrl = async () => {
    if (!rid || !platform || !title) return "";
    if (platform === "huya") {
      const data = await huya.getPlayUrl(Number(rid));
      if (!data) return "";
      return data.url;
    }
    if (platform === "douyu") {
      const data = await douyu.getPlayUrl(Number(rid));
      if (!data) return "";
      return data.url;
    }
  };

  const {
    data: playerUrl,
    isLoading,
    isFetching,
    error,
  } = useQuery({
    queryKey: ["playerUrl", rid, platform],
    queryFn: async () => await getPlayerUrl(),
  });

  const [onlineCount, setOnlineCount] = useState<any>({});
  const [danmuList, setDanmuList] = useState<any[]>([]);
  useWebsocket(String(rid), platform as keyof WsPlatformMap, async (data) => {
    // console.log(data);
    if (!data) return;
    if (data.type === "danmu" || data.type === "msg") {
      setDanmuList((prev) => {
        if (prev.length > 50) {
          return [...prev.slice(1), data];
        }
        return [...prev, data];
      });
    }
    if (data.type === "online") {
      console.log(data);
      setOnlineCount(data);
    }
  });

  const [isFollow, setIsFollow] = useState<boolean>(false);
  const handleFollow = async () => {
    if (!isFollow) {
      await followSql.addFollow(roomData);
      setIsFollow(true);
    } else {
      await followSql.removeFollow(roomData);
      setIsFollow(false);
    }
  };

  useEffect(() => {
    followSql.initializeDatabase(); // 初始化关注数据库
    followSql.isFollow(roomData).then((res) => {
      setIsFollow(res);
    });
  }, [rid, platform, title]);

  return {
    playerUrl,
    title,
    roomData,
    isLoading,
    isFetching,
    error,
    danmuList,
    onlineCount,
    handleFollow,
    isFollow,
  };
};
