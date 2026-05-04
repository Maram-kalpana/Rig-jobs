import React from "react";
import { Platform, StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { AppProvider } from "./src/context/AppContext";
import { RootNavigator } from "./src/navigation/RootNavigator";

export default function App() {
  return (
    <SafeAreaProvider>
      <AppProvider>
        <ExpoStatusBar style="dark" />
        <StatusBar
          barStyle="dark-content"
          {...(Platform.OS === "android"
            ? {
                backgroundColor: "#FFFFFF",
                translucent: false,
              }
            : {})}
        />
        <RootNavigator />
      </AppProvider>
    </SafeAreaProvider>
  );
}
