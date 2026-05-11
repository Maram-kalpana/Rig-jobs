import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { colors } from "../theme";

export function SavedJobsScreen({ jobs, onOpenJob, onToggleSave, onApply }) {
  const dummySavedJobs = [
    {
      id: "dummy-saved-1",
      title: "Offshore Rig Electrician",
      company: "RigWorld Energy",
      location: "Mumbai, IN",
      salary: "₹ 8 LPA",
    },
    {
      id: "dummy-saved-2",
      title: "Drilling Engineer",
      company: "Oceanic Drills",
      location: "Goa, IN",
      salary: "₹ 14 LPA",
    },
  ];

  const list = jobs?.length ? jobs : dummySavedJobs;

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.title}>Saved Jobs</Text>
      <Text style={styles.subtitle}>Roles you bookmarked for later</Text>

      {list.map((job) => (
          <View key={job.id} style={styles.card}>
            
            {/* 🔹 HEADER ROW */}
            <View style={styles.rowBetween}>
              <Pressable onPress={() => onOpenJob(job)} style={{ flex: 1 }}>
                <Text style={styles.jobTitle}>{job.title}</Text>
              </Pressable>

              {/* 🔹 UNSAVE ICON */}
              <Pressable onPress={() => onToggleSave?.(job.id)}>
                <MaterialIcons name="bookmark-remove" size={22} color="#64748B" />
              </Pressable>
            </View>

            <Text style={styles.meta}>
              {job.company} • {job.location}
            </Text>

            <Text style={styles.salary}>{job.salary}</Text>

            {/* 🔹 APPLY BUTTON */}
            <Pressable onPress={() => onApply?.(job)}>
              <LinearGradient
                colors={["#2F5BEA", "#1DA1F2"]} // blue gradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.applyBtn}
              >
                <Text style={styles.applyText}>Apply Now</Text>
              </LinearGradient>
            </Pressable>
          </View>
        ))}
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  scroll: { flex: 1 },
  content: { padding: 16, paddingBottom: 100 },

  title: { color: colors.textPrimary, fontSize: 26, fontWeight: "800" },
  subtitle: { color: colors.textSecondary, fontSize: 15, marginTop: 6, marginBottom: 18 },

  empty: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 20,
  },

  emptyText: { color: colors.textSecondary, fontSize: 16 },

  card: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
    marginBottom: 14,
  },

  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  jobTitle: {
    color: colors.textPrimary,
    fontWeight: "800",
    fontSize: 17,
  },

  meta: {
    color: colors.textSecondary,
    fontSize: 14,
    marginTop: 6,
  },

  salary: {
    color: "#0F8E5E",
    fontWeight: "700",
    marginTop: 8,
  },

  applyBtn: {
    marginTop: 14,
    borderRadius: 30,
    paddingVertical: 12,
    alignItems: "center",
  },

  applyText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 15,
  },
});