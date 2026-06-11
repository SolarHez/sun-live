import douyu from "@/servers/core/douyu";
import huya from "@/servers/core/huya";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";

export const useHomeData = () => {
  const getAllHomeRooms = async (page: number = 1) => {
    const [douyuRooms, huyaRooms] = await Promise.all([
      douyu.getHomeRooms(page),
      huya.getHomeRooms(page),
    ]);

    return [...douyuRooms, ...huyaRooms];
  };

  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: ["homeRooms"],
    queryFn: async () => await getAllHomeRooms(),
  });

  const [value, setValue] = useState("all");
  const sortedData = useMemo(() => {
    if (!data) return [];
    return [...data].sort((a, b) => b.hot - a.hot);
  }, [data]);
  const filteredData = useMemo(() => {
    if (value === "all") return sortedData;
    return sortedData.filter((room) => room.platform === value);
  }, [sortedData, value]);

  const titleTabs = [
    { value: "all", label: "全部直播" },
    { value: "douyu", label: "斗鱼直播" },
    { value: "huya", label: "虎牙直播" },
  ];

  return {
    titleTabs,
    filteredData,
    isLoading,
    isFetching,
    error,
    value,
    setValue,
  };
};
