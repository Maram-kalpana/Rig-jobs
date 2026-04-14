import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { PrimaryButton } from "../components/PrimaryButton";
import { colors } from "../theme";

export function JobDetailsScreen({ job, onBack, onApply, onSave, applied, saved }) {
  if (!job) return null;

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <Pressable onPress={onBack} hitSlop={8}>
        <Text style={styles.back}>Back</Text>
      </Pressable>
      <View style={styles.card}>
        <Text style={styles.title}>{job.title}</Text>
        <Text style={styles.meta}>
          {job.company} | {job.location}
        </Text>
        <Text style={styles.salary}>{job.salary}</Text>
        <View style={styles.divider} />
        <Text style={styles.body}>{job.description}</Text>
        <PrimaryButton label={applied ? "Applied" : "Apply for this job"} onPress={() => onApply(job.id)} disabled={applied} />
        <Pressable onPress={() => onSave(job.id)} style={styles.secondaryHit}>
          <Text style={styles.secondaryTxt}>{saved ? "Remove from saved jobs" : "Save this job"}</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1, minWidth: 0 },
  content: { padding: 16, paddingBottom: 32 },
  back: { color: colors.primaryDark, fontWeight: "700", marginBottom: 14, fontSize: 16 },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 20,
    shadowColor: "#0F2545",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
    gap: 12,
  },
  title: { color: colors.textPrimary, fontWeight: "800", fontSize: 24, lineHeight: 32 },
  meta: { color: colors.textSecondary, fontSize: 16, marginTop: 4 },
  salary: { color: "#0F8E5E", fontWeight: "700", fontSize: 17, marginTop: 4 },
  divider: { height: 1, backgroundColor: colors.border, marginVertical: 8 },
  body: { color: colors.textPrimary, fontSize: 16, lineHeight: 26, marginBottom: 8 },
  secondaryHit: { alignItems: "center", paddingVertical: 12 },
  secondaryTxt: { color: colors.primaryDark, fontWeight: "700", fontSize: 16 },
});
