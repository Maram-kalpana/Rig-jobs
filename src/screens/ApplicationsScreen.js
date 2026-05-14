import React, { useState, useMemo } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View, TextInput } from "react-native";
import { colors } from "../theme";

export function ApplicationsScreen({ applications, onOpenJob }) {
  const [activeTab, setActiveTab] = useState("All");
  const [searchText, setSearchText] = useState("");

  const dummyApplications = [
    {
      id: "dummy-app-1",
      title: "Rig Mechanic",
      company: "DeepSea Rigs",
      location: "Chennai, IN",
    },
    {
      id: "dummy-app-2",
      title: "HSE Officer",
      company: "BlueWave Offshore",
      location: "Cochin, IN",
    },
  ];

  const list = applications?.length ? applications : dummyApplications;

  const filteredList = useMemo(() => {
    if (!searchText.trim()) return list;
    const q = searchText.toLowerCase();
    return list.filter(
      (job) =>
        job.title?.toLowerCase().includes(q) ||
        job.company?.toLowerCase().includes(q) ||
        job.location?.toLowerCase().includes(q)
    );
  }, [list, searchText]);

  const stats = [
    { label: "Total Applied", value: list.length },
    { label: "Active", value: 0 },
    { label: "Interviews", value: 0 },
    { label: "Shortlisted", value: 0 },
  ];

  const tabs = [
    "All",
    "Interview Scheduled",
    "Shortlisted",
    "Under Review",
    "Application Sent",
    "Rejected",
  ];

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
      
      {/* 🔹 STATS */}
      <View style={styles.statsRow}>
        {stats.map((item, i) => (
          <View key={i} style={styles.statCard}>
            <Text style={styles.statValue}>{item.value}</Text>
            <Text style={styles.statLabel}>{item.label}</Text>
          </View>
        ))}
      </View>

      {/* 🔹 SEARCH */}
      <View style={styles.searchBox}>
        <TextInput
          placeholder="Search applications..."
          placeholderTextColor="#94A3B8"
          style={styles.searchInput}
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      {/* 🔹 FILTER TABS */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabsRow}>
        {tabs.map((tab) => (
          <Pressable
            key={tab}
            onPress={() => setActiveTab(tab)}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
              {tab} (0)
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      {/* 🔹 CONTENT */}
      {filteredList.length === 0 && (
        <View style={styles.emptyBox}>
          <Text style={styles.emptyTitle}>No applications found</Text>
          <Text style={styles.emptySub}>Try adjusting your search or filter.</Text>
        </View>
      )}
      {filteredList.map((job) => (
          <Pressable key={job.id} onPress={() => onOpenJob?.(job)} style={styles.card}>
            <View style={styles.avatar}>
              <Text style={styles.avatarTxt}>{job.company.charAt(0)}</Text>
            </View>
            <View style={styles.cardBody}>
              <Text style={styles.jobTitle}>{job.title}</Text>
              <Text style={styles.meta}>
                {job.company} • {job.location}
              </Text>
            </View>
          </Pressable>
        ))}
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  scroll: { flex: 1, backgroundColor: "#F5F7FB" },
  content: { padding: 16 },

  /* STATS */
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 14,
    marginHorizontal: 4,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  statValue: { fontSize: 20, fontWeight: "800", color: "#1E293B" },
  statLabel: { fontSize: 12, color: "#64748B", marginTop: 4 },

  /* SEARCH */
  searchBox: {
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    marginBottom: 12,
  },
  searchInput: { height: 44, fontSize: 14 },

  /* TABS */
  tabsRow: { marginBottom: 16 },
  tab: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#E2E8F0",
    marginRight: 8,
  },
  activeTab: {
    backgroundColor: "#2563EB",
  },
  tabText: { fontSize: 13, color: "#475569" },
  activeTabText: { color: "#fff" },

  /* EMPTY */
  emptyBox: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 40,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  emptyTitle: { fontSize: 16, fontWeight: "700", color: "#1E293B" },
  emptySub: { fontSize: 14, color: "#64748B", marginTop: 6 },

  /* JOB CARD */
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 14,
    marginBottom: 10,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: "#2563EB",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  avatarTxt: { color: "#fff", fontWeight: "800" },
  cardBody: { flex: 1 },
  jobTitle: { fontWeight: "700", fontSize: 15, color: "#1E293B" },
  meta: { color: "#64748B", marginTop: 4 },
});