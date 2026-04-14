import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../theme";

export function JobCard({ job, onOpen, onApply, onSave, applied, saved }) {
  return (
    <View style={styles.card}>
      <Pressable onPress={() => onOpen(job)} style={styles.titleHit}>
        <Text style={styles.title}>{job.title}</Text>
      </Pressable>
      <Text style={styles.company}>{job.company}</Text>
      <Text style={styles.meta}>Location: {job.location}</Text>
      <Text style={styles.salary}>{job.salary}</Text>
      <View style={styles.actions}>
        <Pressable style={[styles.actionPrimary, applied && styles.actionApplied]} onPress={() => onApply(job.id)}>
          <Text style={[styles.actionPrimaryText, applied && styles.actionAppliedText]}>{applied ? "Applied" : "Apply"}</Text>
        </Pressable>
        <Pressable style={styles.actionGhost} onPress={() => onSave(job.id)}>
          <Text style={styles.actionGhostText}>{saved ? "Saved" : "Save"}</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
    shadowColor: "#0F2545",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.07,
    shadowRadius: 10,
    elevation: 3,
    flex: 1,
  },
  titleHit: { marginBottom: 4 },
  title: { color: colors.textPrimary, fontWeight: "800", fontSize: 17, lineHeight: 24 },
  company: { color: colors.primaryDark, fontSize: 15, fontWeight: "600", marginTop: 2 },
  meta: { color: colors.textSecondary, fontSize: 14, marginTop: 4 },
  salary: { color: "#0F8E5E", fontWeight: "700", marginTop: 10, fontSize: 15 },
  actions: { marginTop: 14, flexDirection: "row", gap: 10 },
  actionPrimary: {
    flex: 1,
    borderRadius: 14,
    backgroundColor: colors.primary,
    paddingVertical: 12,
    alignItems: "center",
  },
  actionApplied: { backgroundColor: colors.successBg, borderWidth: 1, borderColor: "#C9EADB" },
  actionPrimaryText: { color: "#FFF", fontWeight: "700", fontSize: 15 },
  actionAppliedText: { color: colors.success },
  actionGhost: {
    flex: 1,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: 12,
    alignItems: "center",
    backgroundColor: "#F7F9FD",
  },
  actionGhostText: { color: colors.textPrimary, fontWeight: "700", fontSize: 15 },
});
