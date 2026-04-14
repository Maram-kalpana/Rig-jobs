import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { colors } from "../theme";

const menu = [
  { key: "jobs", label: "Browse Jobs", icon: "JB" },
  { key: "applications", label: "My Applications", icon: "AP" },
  { key: "saved", label: "Saved Jobs", icon: "SV" },
  { key: "profile", label: "My Profile", icon: "PR" },
  { key: "settings", label: "Settings", icon: "ST" },
];

export function SideDrawer({ activeKey, onNavigate, onLogout }) {
  return (
    <View style={styles.shell}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.brandRow}>
          <View style={styles.logo}>
            <Text style={styles.logoTxt}>RW</Text>
          </View>
          <Text style={styles.brand}>RigWorldJobs</Text>
        </View>
        <View style={styles.divider} />
        {menu.map((item) => (
          <Pressable
            key={item.key}
            style={[styles.item, activeKey === item.key && styles.active]}
            onPress={() => onNavigate(item.key)}
          >
            <View style={[styles.iconPill, activeKey === item.key && styles.iconPillActive]}>
              <Text style={[styles.icon, activeKey === item.key && styles.iconActive]}>{item.icon}</Text>
            </View>
            <Text style={[styles.text, activeKey === item.key && styles.activeText]}>{item.label}</Text>
          </Pressable>
        ))}
      </ScrollView>
      <View style={styles.footer}>
        <View style={styles.divider} />
        <Pressable style={styles.logout} onPress={onLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  shell: {
    flex: 1,
    backgroundColor: "#FAFCFF",
    borderRightWidth: 1,
    borderRightColor: colors.border,
    shadowColor: "#0F2545",
    shadowOffset: { width: 4, height: 0 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 8,
  },
  scroll: { flex: 1 },
  scrollContent: { paddingBottom: 16 },
  brandRow: { flexDirection: "row", alignItems: "center", gap: 12, paddingHorizontal: 18, paddingTop: 20, paddingBottom: 12 },
  logo: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#157DB6",
    alignItems: "center",
    justifyContent: "center",
  },
  logoTxt: { color: "#FFF", fontWeight: "800", fontSize: 14 },
  brand: { color: colors.textPrimary, fontWeight: "800", fontSize: 17 },
  divider: { height: 1, backgroundColor: colors.border, marginHorizontal: 16 },
  item: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginHorizontal: 12,
    marginTop: 6,
    paddingVertical: 14,
    paddingHorizontal: 14,
    borderRadius: 16,
  },
  active: { backgroundColor: "#E7ECF8" },
  iconPill: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#EEF2FA",
    alignItems: "center",
    justifyContent: "center",
  },
  iconPillActive: { backgroundColor: "#D8E4FA" },
  icon: { fontSize: 13, fontWeight: "800", color: colors.textSecondary },
  iconActive: { color: "#1E4CB6" },
  text: { flex: 1, color: colors.textSecondary, fontSize: 16, fontWeight: "600" },
  activeText: { color: "#1E4CB6", fontWeight: "700" },
  footer: { paddingBottom: 20, paddingTop: 8 },
  logout: {
    marginHorizontal: 16,
    marginTop: 12,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: "center",
    backgroundColor: colors.surface,
  },
  logoutText: { color: "#1E4CB6", fontWeight: "700", fontSize: 16 },
});
