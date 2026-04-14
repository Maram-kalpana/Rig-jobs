import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { colors } from "../theme";

const menu = [
  { key: "jobs", label: "Browse Jobs", icon: "work" },
  { key: "applications", label: "My Applications", icon: "description" },
  { key: "saved", label: "Saved Jobs", icon: "bookmark" },
  { key: "profile", label: "My Profile", icon: "person" },
  { key: "settings", label: "Settings", icon: "settings" },
];

export function SideDrawer({ activeKey, onNavigate, onLogout, onPressHome }) {
  return (
    <View style={styles.shell}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Pressable
          style={styles.brandRow}
          onPress={onPressHome}
          disabled={!onPressHome}
          accessibilityRole={onPressHome ? "button" : undefined}
          accessibilityLabel={onPressHome ? "Go to home" : undefined}
        >
          <View style={styles.logo}>
            <MaterialIcons name="home" size={22} color="#FFFFFF" />
          </View>
          <Text style={styles.brand}>RigWorldJobs</Text>
        </Pressable>
        <View style={styles.divider} />
        {menu.map((item) => {
          const active = activeKey === item.key;
          return (
            <Pressable key={item.key} style={[styles.item, active && styles.active]} onPress={() => onNavigate(item.key)}>
              <View style={[styles.iconPill, active && styles.iconPillActive]}>
                <MaterialIcons name={item.icon} size={22} color={active ? "#1E4CB6" : colors.textSecondary} />
              </View>
              <Text style={[styles.text, active && styles.activeText]}>{item.label}</Text>
            </Pressable>
          );
        })}
      </ScrollView>
      <View style={styles.footer}>
        <View style={styles.divider} />
        <Pressable style={styles.logout} onPress={onLogout}>
          <MaterialIcons name="exit-to-app" size={20} color="#1E4CB6" style={styles.logoutIcon} />
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
    backgroundColor: "#0A3D6B",
    alignItems: "center",
    justifyContent: "center",
  },
  brand: { color: colors.textPrimary, fontWeight: "800", fontSize: 17, flex: 1 },
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
  text: { flex: 1, color: colors.textSecondary, fontSize: 16, fontWeight: "600" },
  activeText: { color: "#1E4CB6", fontWeight: "700" },
  footer: { paddingBottom: 20, paddingTop: 8 },
  logout: {
    flexDirection: "row",
    marginHorizontal: 16,
    marginTop: 12,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.surface,
    gap: 8,
  },
  logoutIcon: { marginRight: 0 },
  logoutText: { color: "#1E4CB6", fontWeight: "700", fontSize: 16 },
});
