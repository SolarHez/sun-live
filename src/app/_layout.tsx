import { Stack, ThemeProvider, DarkTheme, DefaultTheme } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useColorScheme, View } from "react-native";
import "../global.css";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  return (
    <View
      className={`${colorScheme === "dark" ? "dark" : ""}  bg-transparent flex-1`}
    >
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack />
        <StatusBar style="auto" />
      </ThemeProvider>
    </View>
  );
}
