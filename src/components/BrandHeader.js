import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../theme";

export function BrandHeader({ onMenu }) {
  return (
    <View style={styles.top}>
      <View style={styles.row}>
        <View style={styles.logo}><Text style={styles.logoTxt}>RW</Text></View>
        <Text style={styles.brand}>RigWorldJobs</Text>
      </View>
      {onMenu ? (
        <Pressable onPress={onMenu}>
          <Text style={styles.menu}>|||</Text>
        </Pressable>
      ) : (
        <View />
      )}
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
  row: { flexDirection: "row", alignItems: "center", gap: 10 },
  logo: { width: 42, height: 42, borderRadius: 21, backgroundColor: "#157DB6", alignItems: "center", justifyContent: "center" },
  logoTxt: { color: "#FFF" },
  brand: { color: colors.textPrimary, fontWeight: "800", fontSize: 33 / 2 },
  menu: { fontSize: 28, color: "#344C71" },
});
