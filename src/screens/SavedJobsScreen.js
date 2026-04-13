import React from "react";
import { Pressable, Text, View } from "react-native";
import { colors } from "../theme";

export function SavedJobsScreen({ jobs, onOpenJob, onToggleSave }) {
  return (
    <View>
      <Text style={{ fontSize: 30 / 2, fontWeight: "800", marginBottom: 10 }}>Saved Jobs</Text>
      {jobs.length === 0 ? <Text style={{ color: colors.textSecondary }}>No saved jobs yet.</Text> : null}
      {jobs.map((job) => (
        <View key={job.id} style={{ backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: 16, padding: 14, marginBottom: 10 }}>
          <Pressable onPress={() => onOpenJob(job)}>
            <Text style={{ color: colors.textPrimary, fontWeight: "700", fontSize: 16 }}>{job.title}</Text>
          </Pressable>
          <Text style={{ color: colors.textSecondary }}>{job.company} | {job.location}</Text>
          <Text style={{ color: "#0F8E5E", marginVertical: 4 }}>{job.salary}</Text>
          <Pressable onPress={() => onToggleSave(job.id)} style={{ marginTop: 2 }}>
            <Text style={{ color: colors.primaryDark, fontWeight: "700" }}>Remove from saved</Text>
          </Pressable>
        </View>
      ))}
    </View>
  );
}
