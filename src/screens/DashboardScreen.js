import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { colors } from "../theme";

export function DashboardScreen({ stats, onBrowseJobs }) {
  const { width } = useWindowDimensions();
  const narrow = width < 420;
  const cards = [
    { key: "applications", label: "Applications", value: String(stats.applications), color: "#E9F0FF", accent: "#1E4CB6" },
    { key: "saved", label: "Saved Jobs", value: String(stats.saved), color: "#FFF8E3", accent: "#C9A227" },
    { key: "views", label: "Profile Views", value: "128", color: "#EAF9F1", accent: "#0F8E5E" },
  ];

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <Pressable style={styles.browse} onPress={onBrowseJobs}>
        <Text style={styles.browseText}>Browse Jobs</Text>
      </Pressable>
      <Text style={styles.sectionTitle}>Overview</Text>
      <View style={[styles.grid, narrow && styles.gridOneCol]}>
        {cards.map((c) => (
          <View key={c.key} style={[styles.card, narrow ? { width: "100%" } : { width: "48%" }]}>
            <View style={styles.cardTop}>
              <View style={[styles.dot, { backgroundColor: c.color }]}>
                <View style={[styles.dotInner, { backgroundColor: c.accent }]} />
              </View>
              <Text style={styles.badge}>Up to date</Text>
            </View>
            <Text style={styles.value}>{c.value}</Text>
            <Text style={styles.label}>{c.label}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1, minWidth: 0 },
  content: { padding: 16, paddingBottom: 32 },
  browse: {
    alignSelf: "flex-end",
    backgroundColor: colors.primary,
    borderRadius: 18,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginBottom: 20,
    shadowColor: "#1E4CB6",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  browseText: { color: "#FFF", fontWeight: "700", fontSize: 16 },
  sectionTitle: { color: colors.textPrimary, fontSize: 22, fontWeight: "800", marginBottom: 14 },
  grid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", gap: 12 },
  gridOneCol: { flexDirection: "column" },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
    minHeight: 140,
    marginBottom: 4,
    shadowColor: "#0F2545",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  cardTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 12 },
  dot: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  dotInner: { width: 12, height: 12, borderRadius: 6 },
  badge: { color: "#0F8E5E", fontSize: 12, fontWeight: "700" },
  value: { color: colors.textPrimary, fontSize: 32, fontWeight: "800" },
  label: { color: colors.textSecondary, fontSize: 16, marginTop: 4 },
});
