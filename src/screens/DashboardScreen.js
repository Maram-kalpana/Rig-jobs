import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../theme";

export function DashboardScreen({ stats, onBrowseJobs }) {
  const cards = [
    { key: "applications", label: "Applications", value: stats.applications, color: "#E9F0FF" },
    { key: "saved", label: "Saved Jobs", value: stats.saved, color: "#FFF8E3" },
    { key: "views", label: "Profile Views", value: "128", color: "#EAF9F1" },
  ];

  return (
    <View>
      <Pressable style={styles.browse} onPress={onBrowseJobs}>
        <Text style={styles.browseText}>Browse Jobs</Text>
      </Pressable>
      <View style={styles.grid}>
        {cards.map((c) => (
          <View key={c.key} style={styles.card}>
            <View style={[styles.dot, { backgroundColor: c.color }]} />
            <Text style={styles.value}>{c.value}</Text>
            <Text style={styles.label}>{c.label}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  browse: { alignSelf: "flex-end", backgroundColor: colors.primary, borderRadius: 18, paddingVertical: 12, paddingHorizontal: 18, marginBottom: 12 },
  browseText: { color: "#FFF", fontWeight: "700", fontSize: 16 },
  grid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", gap: 10 },
  card: { width: "48.4%", backgroundColor: colors.surface, borderRadius: 20, borderWidth: 1, borderColor: colors.border, padding: 14, minHeight: 135 },
  dot: { width: 34, height: 34, borderRadius: 17, marginBottom: 10 },
  value: { color: colors.textPrimary, fontSize: 34, fontWeight: "800" },
  label: { color: colors.textSecondary, fontSize: 16 },
});
