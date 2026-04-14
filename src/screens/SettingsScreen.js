import React, { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { colors } from "../theme";

const tabs = [
  { key: "Account", label: "Account", desc: "Email, password, and session preferences." },
  { key: "Notifications", label: "Notifications", desc: "Alerts for applications, messages, and job matches." },
  { key: "Privacy", label: "Privacy", desc: "Profile visibility and data controls." },
  { key: "Security", label: "Security", desc: "Two-factor authentication and active devices." },
];

export function SettingsScreen() {
  const [active, setActive] = useState("Account");

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>Settings</Text>
      <Text style={styles.subtitle}>Manage your account and preferences</Text>
      <View style={styles.card}>
        <View style={styles.tabRow}>
          {tabs.map((tab) => (
            <Pressable key={tab.key} onPress={() => setActive(tab.key)} style={[styles.tab, active === tab.key && styles.tabOn]}>
              <Text style={[styles.tabTxt, active === tab.key && styles.tabTxtOn]}>{tab.label}</Text>
            </Pressable>
          ))}
        </View>
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
  title: { color: colors.textPrimary, fontSize: 26, fontWeight: "800" },
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
  tab: { paddingHorizontal: 14, paddingVertical: 10, borderRadius: 14, backgroundColor: "#F2F5FB" },
  tabOn: { backgroundColor: "#E2E9FA" },
  tabTxt: { color: colors.textSecondary, fontWeight: "600", fontSize: 14 },
  tabTxtOn: { color: colors.primaryDark, fontWeight: "800" },
  panel: {
    borderRadius: 16,
    padding: 16,
    backgroundColor: "#F7F9FD",
    borderWidth: 1,
    borderColor: colors.border,
  },
  panelTitle: { color: colors.textPrimary, fontSize: 18, fontWeight: "800" },
  panelBody: { color: colors.textSecondary, fontSize: 15, marginTop: 8, lineHeight: 24 },
});
