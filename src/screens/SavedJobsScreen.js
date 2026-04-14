import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { colors } from "../theme";

export function SavedJobsScreen({ jobs, onOpenJob, onToggleSave }) {
  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>Saved Jobs</Text>
      <Text style={styles.subtitle}>Roles you bookmarked for later</Text>
      {jobs.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyText}>No saved jobs yet. Save a job from the list or job details.</Text>
        </View>
      ) : (
        jobs.map((job) => (
          <View key={job.id} style={styles.card}>
            <Pressable onPress={() => onOpenJob(job)}>
              <Text style={styles.jobTitle}>{job.title}</Text>
            </Pressable>
            <Text style={styles.meta}>
              {job.company} | {job.location}
            </Text>
            <Text style={styles.salary}>{job.salary}</Text>
            <Pressable onPress={() => onToggleSave(job.id)} style={styles.removeHit}>
              <Text style={styles.remove}>Remove from saved</Text>
            </Pressable>
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1, minWidth: 0 },
  content: { padding: 16, paddingBottom: 32 },
  title: { color: colors.textPrimary, fontSize: 26, fontWeight: "800" },
  subtitle: { color: colors.textSecondary, fontSize: 15, marginTop: 6, marginBottom: 18 },
  empty: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 20,
  },
  emptyText: { color: colors.textSecondary, fontSize: 16, lineHeight: 24 },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#0F2545",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  jobTitle: { color: colors.textPrimary, fontWeight: "800", fontSize: 17 },
  meta: { color: colors.textSecondary, fontSize: 14, marginTop: 6 },
  salary: { color: "#0F8E5E", fontWeight: "700", marginTop: 8, fontSize: 15 },
  removeHit: { marginTop: 12, alignSelf: "flex-start" },
  remove: { color: colors.primaryDark, fontWeight: "700", fontSize: 15 },
});
