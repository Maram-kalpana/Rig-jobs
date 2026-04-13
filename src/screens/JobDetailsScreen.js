import React from "react";
import { Pressable, Text, View } from "react-native";
import { PrimaryButton } from "../components/PrimaryButton";
import { colors } from "../theme";

export function JobDetailsScreen({ job, onBack, onApply, onSave, applied, saved }) {
  if (!job) return null;
  return (
    <View style={{ backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: 16, padding: 14 }}>
      <Pressable onPress={onBack}><Text style={{ color: colors.primaryDark, fontWeight: "700", marginBottom: 12 }}>Back</Text></Pressable>
      <Text style={{ color: colors.textPrimary, fontWeight: "800", fontSize: 22 }}>{job.title}</Text>
      <Text style={{ color: colors.textSecondary, marginTop: 4 }}>{job.company} | {job.location}</Text>
      <Text style={{ color: "#0F8E5E", fontWeight: "700", marginTop: 4 }}>{job.salary}</Text>
      <Text style={{ color: colors.textPrimary, marginTop: 12, lineHeight: 24 }}>{job.description}</Text>
      <View style={{ marginTop: 12, gap: 10 }}>
        <PrimaryButton label={applied ? "Applied" : "Apply for this job"} onPress={() => onApply(job.id)} disabled={applied} />
        <Pressable onPress={() => onSave(job.id)} style={{ alignItems: "center", paddingVertical: 10 }}>
          <Text style={{ color: colors.primaryDark, fontWeight: "700" }}>{saved ? "Remove from saved jobs" : "Save this job"}</Text>
        </Pressable>
      </View>
    </View>
  );
}
