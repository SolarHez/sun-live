import douyu from "@/servers/core/douyu";
import huya from "@/servers/core/huya";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";

export const useClassData = ({ data }: { data?: any }) => {
  const [activeTab, setActiveTab] = useState("douyu");
  const titleTabs = [
    { value: "douyu", label: "斗鱼直播" },
    { value: "huya", label: "虎牙直播" },
  ];

  const getAllClassOptions = async () => {
    const [douyuClassOptions, huyaClassOptions] = await Promise.all([
      douyu.getClassOption(),
      huya.getClassOption(),
    ]);
    const data = {
      douyu: douyuClassOptions,
      huya: huyaClassOptions,
    };
    return data;
  };

  const {
    data: classOptions,
    isLoading,
    isFetching,
    error,
  } = useQuery({
    queryKey: ["classOptions"],
    queryFn: async () => await getAllClassOptions(),
    staleTime: 1000 * 60 * 20, // 20分钟
  });

  const filteredClassOptions = useMemo(() => {
    if (!classOptions) return null;
    const tabData = classOptions[activeTab as keyof typeof classOptions];
    return tabData;
  }, [classOptions, activeTab]);

  const getClassRooms = async () => {
    const { platform, cid2 } = JSON.parse(data.toString());
    if (platform === "douyu") {
      const data = await douyu.getClassRooms(cid2 || "", 1);
      return data;
    }
    if (platform === "huya") {
      const data = await huya.getClassRooms(cid2 || "", 1);
      return data;
    }
  };

  const { data: classRoomsList } = useQuery({
    queryKey: ["classRoomsList", data],
    queryFn: async () => await getClassRooms(),
    staleTime: 1000 * 60, // 1分钟
  });

  return {
    activeTab,
    setActiveTab,
    titleTabs,
    filteredClassOptions,
    classRoomsList,
  };
};
