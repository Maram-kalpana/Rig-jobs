import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React, { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { colors } from "../theme";

const tabs = [
  { key: "Account", label: "Account", icon: "person", desc: "Email, password, and session preferences." },
  { key: "Notifications", label: "Notifications", icon: "notifications", desc: "Alerts for applications, messages, and job matches." },
  { key: "Privacy", label: "Privacy", icon: "security", desc: "Profile visibility and data controls." },
  { key: "Security", label: "Security", icon: "lock", desc: "Two-factor authentication and active devices." },
];

export function SettingsScreen({ onBrowseJobs }) {
  const [active, setActive] = useState("Account");

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode="on-drag"
    >
      <View style={styles.headerRow}>
        <Text style={styles.title}>Settings</Text>
        {onBrowseJobs ? (
          <Pressable style={styles.browseBtn} onPress={onBrowseJobs}>
            <MaterialIcons name="work" size={18} color="#FFFFFF" />
            <Text style={styles.browseBtnText}>Browse Jobs</Text>
          </Pressable>
        ) : null}
      </View>
      <Text style={styles.subtitle}>Manage your account and preferences</Text>
      <View style={styles.card}>
        <View style={styles.tabRow}>
          {tabs.map((tab) => {
            const on = active === tab.key;
            return (
              <Pressable key={tab.key} onPress={() => setActive(tab.key)} style={[styles.tab, on && styles.tabOn]}>
                <MaterialIcons name={tab.icon} size={18} color={on ? colors.primaryDark : colors.textSecondary} />
                <Text style={[styles.tabTxt, on && styles.tabTxtOn]}>{tab.label}</Text>
              </Pressable>
            );
          })}
        </View>
        <Text style={styles.personalTitle}>Personal Information</Text>
        <View style={styles.panel}>
          <Text style={styles.panelTitle}>{active}</Text>
          <Text style={styles.panelBody}>{tabs.find((t) => t.key === active)?.desc}</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1, minWidth: 0 },
  content: { padding: 16, paddingBottom: 32 },
  headerRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", gap: 12 },
  title: { color: colors.textPrimary, fontSize: 26, fontWeight: "800", flex: 1, flexShrink: 1 },
  browseBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: colors.primaryDark,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 14,
  },
  browseBtnText: { color: "#FFFFFF", fontWeight: "700", fontSize: 14 },
  subtitle: { color: colors.textSecondary, fontSize: 15, marginTop: 6, marginBottom: 18 },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 14,
    shadowColor: "#0F2545",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  tabRow: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginBottom: 16 },
  tab: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 14,
    backgroundColor: "#F2F5FB",
  },
  tabOn: { backgroundColor: "#E2E9FA" },
  tabTxt: { color: colors.textSecondary, fontWeight: "600", fontSize: 14 },
  tabTxtOn: { color: colors.primaryDark, fontWeight: "800" },
  personalTitle: { color: colors.textPrimary, fontSize: 18, fontWeight: "800", marginBottom: 12 },
  panel: {
    borderRadius: 16,
    padding: 16,
    backgroundColor: "#F7F9FD",
    borderWidth: 1,
    borderColor: colors.border,
  },
  panelTitle: { color: colors.textPrimary, fontSize: 17, fontWeight: "800" },
  panelBody: { color: colors.textSecondary, fontSize: 15, marginTop: 8, lineHeight: 24 },
});
