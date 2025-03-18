import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
import "../global.css";
import { Platform } from "react-native";
import { MenuProvider } from "../context/MenuContext";
import { AuthProvider } from "../context/AuthContext";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (process.env.EXPO_PUBLIC_TEMPO && Platform.OS === "web") {
      const { TempoDevtools } = require("tempo-devtools");
      TempoDevtools.init();
    }
  }, []);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={DefaultTheme}>
      <AuthProvider>
        <MenuProvider>
          <Stack
            screenOptions={({ route }) => ({
              headerShown: false,
            })}
          >
            <Stack.Screen name="index" />
            <Stack.Screen name="launch-screen" />
            <Stack.Screen name="onboarding" />
            <Stack.Screen name="login" />
            <Stack.Screen name="signup" />
            <Stack.Screen name="register" />
            <Stack.Screen name="forgot-password" />
            <Stack.Screen name="home" />
            <Stack.Screen name="create-menu" />
            <Stack.Screen name="create-manual" />
            <Stack.Screen name="scan-menu" />
            <Stack.Screen name="processing" />
            <Stack.Screen name="edit-menu" />
            <Stack.Screen name="choose-template" />
            <Stack.Screen name="restaurant-details" />
            <Stack.Screen name="qr-customization" />
            <Stack.Screen name="generate-qr" />
            <Stack.Screen name="menus" />
            <Stack.Screen name="profile" />
          </Stack>
          <StatusBar style="auto" />
        </MenuProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
