import { Stack, ThemeProvider, DarkTheme, DefaultTheme } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, useColorScheme, View } from "react-native";
import "./global.css";

import { Buffer } from "buffer";
import process from "process";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { QueryClient } from "@tanstack/react-query";
import { createSQLitePersister } from "@/sql/sqlitePersister";
import followSql from "@/sql/sqliteFollow";
import { useEffect, useState } from "react";

global.Buffer = Buffer;
global.process = process;

// 1. 在组件外部初始化，确保它在 App 生命周期内只创建一次
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60 * 24 * 7, // 离线缓存保留7天
      networkMode: "offlineFirst", // 核心：优先从缓存读取，没网不报错
    },
  },
});

const persister = createSQLitePersister();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [isDbReady, setIsDbReady] = useState(false); // 1. 新增一个数据库就绪状态

  // 2. 用 useEffect 来确保异步初始化按顺序完成
  useEffect(() => {
    async function init() {
      try {
        await followSql.initializeDatabase(); // 确保真的 await 成功
        setIsDbReady(true);
      } catch (error) {
        console.error("数据库初始化失败:", error);
        // 这里可以视情况决定是否也设置为 true，防止应用彻底卡死
        setIsDbReady(true);
      }
    }
    init();
  }, []);

  // 3. 如果数据库还没初始化完，先拦截渲染，避免子组件提前查库
  if (!isDbReady) {
    return <ActivityIndicator />;
  }
  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister }}
    >
      <GestureHandlerRootView>
        <View
          className={`${colorScheme === "dark" ? "dark" : ""}  bg-transparent flex-1`}
        >
          <ThemeProvider
            value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
          >
            <Stack initialRouteName="(app)">
              <Stack.Screen name="(app)" options={{ headerShown: false }} />
              <Stack.Screen name="(player)" options={{ headerShown: false }} />
              <Stack.Screen name="(class)" options={{ headerShown: false }} />
            </Stack>
            <StatusBar style="auto" />
          </ThemeProvider>
        </View>
      </GestureHandlerRootView>
    </PersistQueryClientProvider>
  );
}
