import { useRefreshOnFocus } from "@/hooks/useRefreshOnFocus";
import douyu from "@/servers/core/douyu";
import huya from "@/servers/core/huya";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { createLimit } from "../utils/limit";
import { useFollowSql } from "./useFollowSql";

export const useFollowData = () => {
  const {
    handleAddFollow,
    handleRemoveFollow,
    handleIsFollow,
    handleGetAllFollows,
    handleAsyncSyncToSQL,
  } = useFollowSql();

  const {
    data: followList,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["followList"],
    queryFn: async () => {
      const localList = await handleGetAllFollows();
      const freshList = await updateFollowList(localList);
      handleAsyncSyncToSQL(freshList);

      return freshList;
    },
    placeholderData: [],
  });

  useRefreshOnFocus(refetch);

  const [activeTab, setActiveTab] = useState("live");
  const titleTabs = [
    { value: "live", label: "正在直播" },
    { value: "notLive", label: "未直播" },
  ];

  // 更新关注列表
  const updateFollowList = async (currentList: any[]) => {
    if (!currentList || !currentList.length) return [];

    // 创建一个最大并发数为 5 的限制器
    const limit = createLimit(5);

    const updatedList = await Promise.all(
      currentList.map((item) => {
        // 用 limit 包裹整个异步逻辑
        return limit(async () => {
          if (!item.rid) return item;

          try {
            if (item.platform === "douyu") {
              const res = await douyu.getRoomInfo(item.rid);
              return { ...item, ...res };
            }

            if (item.platform === "huya") {
              const res = await huya.getRoomInfo(item.rid);
              return { ...item, ...res };
            }
          } catch (error) {
            console.error(`更新主播 ${item.rid} 失败:`, error);
            return item;
          }

          return item;
        });
      }),
    );

    return updatedList;
  };

  const filteredList = useMemo(() => {
    if (!followList || !followList.length) return [];
    let data = [];
    if (activeTab === "live") {
      data = followList.filter((item) => item.isLive || item.isLoop);
    } else {
      data = followList.filter((item) => !item.isLive);
    }
    return data.sort((a, b) => b.hot - a.hot);
  }, [followList, activeTab]);

  return {
    filteredList,
    handleAddFollow,
    handleRemoveFollow,
    handleIsFollow,
    titleTabs,
    activeTab,
    setActiveTab,
  };
};
