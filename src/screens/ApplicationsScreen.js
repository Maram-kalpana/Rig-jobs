import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { colors } from "../theme";

export function ApplicationsScreen({ applications, onOpenJob }) {
  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>My Applications</Text>
      <Text style={styles.subtitle}>Track roles you have applied to</Text>
      {applications.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyText}>No applications yet. Browse jobs and tap Apply.</Text>
        </View>
      ) : (
        applications.map((job) => (
          <Pressable key={job.id} onPress={() => onOpenJob(job)} style={styles.card}>
            <View style={styles.avatar}>
              <Text style={styles.avatarTxt}>{job.company.charAt(0)}</Text>
            </View>
            <View style={styles.cardBody}>
              <Text style={styles.jobTitle}>{job.title}</Text>
              <Text style={styles.meta}>
                {job.company} | {job.location}
              </Text>
              <Text style={styles.link}>View details</Text>
            </View>
          </Pressable>
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
    flexDirection: "row",
    backgroundColor: colors.surface,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 14,
    marginBottom: 12,
    shadowColor: "#0F2545",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  avatarTxt: { color: "#FFF", fontSize: 20, fontWeight: "800" },
  cardBody: { flex: 1, minWidth: 0 },
  jobTitle: { color: colors.textPrimary, fontWeight: "800", fontSize: 17 },
  meta: { color: colors.textSecondary, fontSize: 14, marginTop: 4 },
  link: { color: colors.primaryDark, fontWeight: "700", marginTop: 8, fontSize: 15 },
});
