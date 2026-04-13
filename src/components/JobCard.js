import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../theme";

export function JobCard({ job, onOpen, onApply, onSave, applied, saved }) {
  return (
    <View style={styles.card}>
      <Pressable onPress={() => onOpen(job)}>
        <Text style={styles.title}>{job.title}</Text>
      </Pressable>
      <Text style={styles.sub}>{job.company}</Text>
      <Text style={styles.sub}>Location: {job.location}</Text>
      <Text style={styles.salary}>{job.salary}</Text>
      <View style={styles.actions}>
        <Pressable style={[styles.actionBtn, applied && styles.success]} onPress={() => onApply(job.id)}>
          <Text style={[styles.btnText, applied && styles.successText]}>{applied ? "Applied" : "Apply"}</Text>
        </Pressable>
        <Pressable style={styles.actionBtn} onPress={() => onSave(job.id)}>
          <Text style={styles.btnText}>{saved ? "Unsave" : "Save"}</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 18,
    padding: 14,
    marginBottom: 10,
  },
  title: { color: colors.textPrimary, fontWeight: "800", fontSize: 18 },
  sub: { color: colors.textSecondary, fontSize: 15, marginTop: 2 },
  salary: { color: "#0F8E5E", fontWeight: "700", marginTop: 6 },
  actions: { marginTop: 10, flexDirection: "row", gap: 8 },
  actionBtn: { flex: 1, borderRadius: 12, borderWidth: 1, borderColor: colors.border, paddingVertical: 10, alignItems: "center" },
  btnText: { color: colors.textPrimary, fontWeight: "600" },
  success: { backgroundColor: colors.successBg, borderColor: "#C9EADB" },
  successText: { color: colors.success },
});
