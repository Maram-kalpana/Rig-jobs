import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../theme";

function Hamburger() {
  return (
    <View style={styles.burger}>
      <View style={styles.burgerLine} />
      <View style={styles.burgerLine} />
      <View style={styles.burgerLine} />
    </View>
  );
}

export function BrandHeader({ onMenu }) {
  const brand = (
    <View style={styles.brandCluster}>
      <View style={styles.logo}>
        <Text style={styles.logoTxt}>RW</Text>
      </View>
      <Text style={styles.brand} numberOfLines={1}>
        RigWorldJobs
      </Text>
    </View>
  );

  if (onMenu) {
    return (
      <View style={styles.top}>
        <Pressable onPress={onMenu} style={styles.menuHit} hitSlop={10} accessibilityRole="button" accessibilityLabel="Menu">
          <Hamburger />
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
  logo: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#157DB6",
    alignItems: "center",
    justifyContent: "center",
  },
  logoTxt: { color: "#FFF", fontWeight: "800", fontSize: 14 },
  brand: { color: colors.textPrimary, fontWeight: "800", fontSize: 17, maxWidth: 220 },
  menuHit: { padding: 8, marginLeft: -4 },
  menuPlaceholder: { width: 44 },
  burger: { justifyContent: "space-between", height: 16, width: 22 },
  burgerLine: { height: 2, borderRadius: 1, backgroundColor: "#344C71", width: "100%" },
});
