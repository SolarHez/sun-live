import { focusManager } from "@tanstack/react-query";
import { useFocusEffect } from "expo-router";
import React from "react";
import { Platform } from "react-native";

export function useRefreshOnFocus<T>(refetch: () => Promise<T>) {
  const firstTimeRef = React.useRef(true);

  useFocusEffect(
    React.useCallback(() => {
      // 避免组件第一次挂载时重复触发（因为 useQuery 挂载时已经自动 fetch 一次了）
      if (firstTimeRef.current) {
        firstTimeRef.current = false;
        return;
      }

      // 非 Web 端时，手动让 React Query 认为窗口重新聚焦了
      if (Platform.OS !== "web") {
        focusManager.setFocused(true);
      }

      // 或者直接安全地触发 refetch
      refetch();
    }, [refetch]),
  );
}
