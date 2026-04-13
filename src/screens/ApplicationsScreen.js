import React from "react";
import { Pressable, Text, View } from "react-native";
import { colors } from "../theme";

export function ApplicationsScreen({ applications, onOpenJob }) {
  return (
    <View>
      <Text style={{ fontSize: 30 / 2, fontWeight: "800", marginBottom: 10 }}>My Applications</Text>
      {applications.length === 0 ? <Text style={{ color: colors.textSecondary }}>No applications yet.</Text> : null}
      {applications.map((job) => (
        <Pressable key={job.id} onPress={() => onOpenJob(job)} style={{ backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: 16, padding: 14, marginBottom: 10 }}>
          <Text style={{ color: colors.textPrimary, fontWeight: "700", fontSize: 16 }}>{job.title}</Text>
          <Text style={{ color: colors.textSecondary }}>{job.company} | {job.location}</Text>
          <Text style={{ color: colors.primaryDark, marginTop: 4 }}>View details</Text>
        </Pressable>
      ))}
    </View>
  );
}
