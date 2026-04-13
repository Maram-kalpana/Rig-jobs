import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { colors } from "../theme";

export function PrimaryButton({ label, onPress, disabled = false }) {
  return (
    <Pressable onPress={onPress} disabled={disabled} style={[styles.btn, disabled && styles.disabled]}>
      <Text style={styles.text}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    height: 56,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primary,
  },
  disabled: { opacity: 0.5 },
  text: { color: "#FFF", fontSize: 18, fontWeight: "700" },
});
