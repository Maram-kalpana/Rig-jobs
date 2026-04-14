import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../theme";

export function BrandHeader({ onMenu, onPressHome }) {
  const brand = (
    <Pressable
      onPress={onPressHome}
      disabled={!onPressHome}
      style={({ pressed }) => [styles.brandCluster, onPressHome && pressed && styles.brandPressed]}
      accessibilityRole={onPressHome ? "button" : undefined}
      accessibilityLabel={onPressHome ? "Go to home" : undefined}
    >
      <View style={styles.logo}>
        <MaterialIcons name="home" size={22} color="#FFFFFF" />
      </View>
      <Text style={styles.brand} numberOfLines={1}>
        RigWorldJobs
      </Text>
    </Pressable>
  );

  if (onMenu) {
    return (
      <View style={styles.top}>
        <Pressable onPress={onMenu} style={styles.menuHit} hitSlop={10} accessibilityRole="button" accessibilityLabel="Open menu">
          <MaterialIcons name="menu" size={28} color="#344C71" />
        </Pressable>
        {brand}
      </View>
    );
  }

  return (
    <View style={styles.top}>
      {brand}
      <View style={styles.menuPlaceholder} />
    </View>
  );
}

const styles = StyleSheet.create({
  top: {
    height: 76,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  brandCluster: { flexDirection: "row", alignItems: "center", gap: 10 },
  brandPressed: { opacity: 0.75 },
  logo: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#0A3D6B",
    alignItems: "center",
    justifyContent: "center",
  },
  brand: { color: colors.textPrimary, fontWeight: "800", fontSize: 17, maxWidth: 220 },
  menuHit: { padding: 8, marginLeft: -4 },
  menuPlaceholder: { width: 44 },
});
