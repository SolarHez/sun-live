import { Stack, ThemeProvider, DarkTheme, DefaultTheme } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useColorScheme, View } from "react-native";
import "../global.css";

import { Buffer } from "buffer";
import process from "process";
import { GestureHandlerRootView } from "react-native-gesture-handler";

global.Buffer = Buffer;
global.process = process;

export default function RootLayout() {
  const colorScheme = useColorScheme();
  return (
    <GestureHandlerRootView>
      <View
        className={`${colorScheme === "dark" ? "dark" : ""}  bg-transparent flex-1`}
      >
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <Stack initialRouteName="index">
            <Stack.Screen name="index" />
            <Stack.Screen name="(test)" options={{ headerShown: false }} />
          </Stack>
          <StatusBar style="auto" />
        </ThemeProvider>
      </View>
    </GestureHandlerRootView>
  );
}
