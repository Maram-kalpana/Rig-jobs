import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

export function DashboardScreen({
  stats,
  onPressRecentApplications,
  onPressSavedJobs,
}) {
  const cards = [
    { label: "Applications", value: stats.applications },
    { label: "Saved Jobs", value: stats.saved },
    { label: "Profile Views", value: 120 },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* 🔹 CARDS */}
      <View style={styles.cardRow}>
        {cards.map((c, i) => (
          <View key={i} style={styles.card}>
            <Text style={styles.value}>{c.value}</Text>
            <Text style={styles.label}>{c.label}</Text>
            <Text style={styles.status}>Up to date</Text>
          </View>
        ))}
      </View>

      <Pressable
        style={styles.section}
        onPress={onPressRecentApplications}
        disabled={!onPressRecentApplications}
      >
        <Text style={styles.sectionTitle}>Recent Applications</Text>
        <Text style={styles.empty}>No applications yet.</Text>
      </Pressable>

      <Pressable
        style={styles.section}
        onPress={onPressSavedJobs}
        disabled={!onPressSavedJobs}
      >
        <Text style={styles.sectionTitle}>Saved Jobs</Text>
        <Text style={styles.empty}>No saved jobs yet.</Text>
      </Pressable>

      {/* 🔹 NOTIFICATIONS */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Notifications</Text>
        <Text style={styles.item}>Interview scheduled...</Text>
        <Text style={styles.item}>Application under review</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },

  cardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  card: {
    width: "30%",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#eee",
  },

  value: { fontSize: 22, fontWeight: "800" },
  label: { color: "#666", marginTop: 4 },
  status: { color: "green", fontSize: 12, marginTop: 6 },

  section: {
    marginTop: 20,
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 16,
  },

  sectionTitle: {
    fontWeight: "700",
    marginBottom: 10,
  },

  empty: { color: "#888" },
  item: { marginBottom: 6 },
});