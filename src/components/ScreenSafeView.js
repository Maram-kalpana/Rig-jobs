import React from "react";
import { KeyboardAvoidingView, Platform, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export function ScreenSafeView({
  children,
  style,
  edges,
  keyboardVerticalOffset,
}) {
  // 🔥 REMOVE TOP SAFE AREA
  const safeEdges = edges ?? ["right", "bottom", "left"];
  const offset = keyboardVerticalOffset ?? 0;

  return (
    <KeyboardAvoidingView
      style={[styles.flex, style]}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={offset}
    >
      <SafeAreaView style={styles.flex} edges={safeEdges}>
        {children}
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
});