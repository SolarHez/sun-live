import { Stack, ThemeProvider, DarkTheme, DefaultTheme } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useColorScheme, View } from "react-native";
import "./global.css";

import { Buffer } from "buffer";
import process from "process";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { QueryClient } from "@tanstack/react-query";
import { createSQLitePersister } from "@/sql/sqlitePersister";

global.Buffer = Buffer;
global.process = process;

// 1. 在组件外部初始化，确保它在 App 生命周期内只创建一次
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60, // 1分钟认为数据是新鲜的
      gcTime: 1000 * 60 * 60 * 24 * 7, // 离线缓存保留7天
      networkMode: "offlineFirst", // 核心：优先从缓存读取，没网不报错
    },
  },
});

const persister = createSQLitePersister();

export default function RootLayout() {
  const colorScheme = useColorScheme();
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
              {/* <Stack.Screen name="index" />
            <Stack.Screen name="(test)" options={{ headerShown: false }} /> */}
              <Stack.Screen name="(app)" options={{ headerShown: false }} />
            </Stack>
            <StatusBar style="auto" />
          </ThemeProvider>
        </View>
      </GestureHandlerRootView>
    </PersistQueryClientProvider>
  );
}
