import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../theme";

const menu = [
  { key: "jobs", label: "Browse Jobs", icon: "JB" },
  { key: "applications", label: "My Applications", icon: "AP" },
  { key: "saved", label: "Saved Jobs", icon: "SV" },
  { key: "profile", label: "My Profile", icon: "PR" },
  { key: "settings", label: "Settings", icon: "ST" },
];

export function SideDrawer({ visible, activeKey, onNavigate, onLogout }) {
  if (!visible) return null;
  return (
    <View style={styles.wrap}>
      <View style={styles.brandRow}>
        <View style={styles.logo}><Text style={{ color: "#FFF" }}>RW</Text></View>
        <Text style={styles.brand}>RigWorldJobs</Text>
      </View>
      {menu.map((item) => (
        <Pressable key={item.key} style={[styles.item, activeKey === item.key && styles.active]} onPress={() => onNavigate(item.key)}>
          <Text style={styles.icon}>{item.icon}</Text>
          <Text style={[styles.text, activeKey === item.key && styles.activeText]}>{item.label}</Text>
        </Pressable>
      ))}
      <Pressable style={styles.logout} onPress={onLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { width: 300, borderRightWidth: 1, borderRightColor: colors.border, backgroundColor: "#FAFCFF", paddingVertical: 16 },
  brandRow: { flexDirection: "row", alignItems: "center", gap: 10, paddingHorizontal: 16, marginBottom: 16 },
  logo: { width: 40, height: 40, borderRadius: 20, backgroundColor: "#157DB6", alignItems: "center", justifyContent: "center" },
  brand: { color: colors.textPrimary, fontWeight: "800", fontSize: 16 },
  item: { flexDirection: "row", alignItems: "center", gap: 10, marginHorizontal: 10, padding: 12, borderRadius: 14 },
  active: { backgroundColor: "#E7ECF8" },
  icon: { fontSize: 17 },
  text: { color: colors.textSecondary, fontSize: 30 / 2 },
  activeText: { color: "#234A9A", fontWeight: "700" },
  logout: { marginTop: "auto", marginHorizontal: 16, borderWidth: 1, borderColor: colors.border, borderRadius: 16, paddingVertical: 12, alignItems: "center" },
  logoutText: { color: colors.textSecondary, fontWeight: "700", fontSize: 16 },
});
