import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { PrimaryButton } from "../components/PrimaryButton";
import { colors } from "../theme";

export function JobDetailsScreen({
  job,
  onBack,
  onApply,
  onSave,
  onRequireAuth,
  applied,
  saved,
  isAuthenticated,
}) {
  if (!job) return null;

  const sections = {
    overview: job.description || "No overview available.",
    responsibilities:
      job.responsibilities ||
      "Responsibilities will be updated soon. This role involves day-to-day operations, safety compliance, and team coordination.",
    requirements:
      job.requirements ||
      "Requirements will be updated soon. Relevant experience and certifications are preferred.",
    benefits:
      job.benefits ||
      "Benefits information will be updated soon. Competitive salary and growth opportunities.",
  };

  const handleApply = () => {
    if (!isAuthenticated) {
      onRequireAuth?.();
      return;
    }
    onApply?.(job.id);
  };

  const handleSave = () => {
    if (!isAuthenticated) {
      onRequireAuth?.();
      return;
    }
    onSave(job.id);
  };

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode="on-drag"
    >
      <Pressable onPress={onBack} hitSlop={8}>
        <Text style={styles.back}>← Back</Text>
      </Pressable>

      {/* Header card */}
      <View style={styles.headerCard}>
        <View style={styles.companyAvatar}>
          <Text style={styles.companyAvatarText}>
            {(job.company || "J").trim().charAt(0).toUpperCase()}
          </Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>{job.title}</Text>
          <Text style={styles.meta}>
            {job.company} • {job.location}
          </Text>
          <Text style={styles.salary}>{job.salary}</Text>
        </View>
      </View>

      {/* Actions */}
      <View style={styles.actionCard}>
        <PrimaryButton
          label={
            !isAuthenticated
              ? "Login to Apply"
              : applied
              ? "Applied ✓"
              : "Apply Now"
          }
          onPress={handleApply}
          disabled={applied}
        />
        <Pressable onPress={handleSave} style={styles.secondaryHit}>
          <Text style={styles.secondaryTxt}>
            {!isAuthenticated
              ? "Login to Save"
              : saved
              ? "Saved ✓"
              : "Save Job"}
          </Text>
        </Pressable>
        {!isAuthenticated && (
          <Text style={styles.authHint}>
            Sign in to apply, save jobs, and track your applications
          </Text>
        )}
        {isAuthenticated && (
          <Text style={styles.tos}>
            By applying, you agree to our Terms of Service
          </Text>
        )}
      </View>

      {/* Details */}
      <View style={styles.detailsCard}>
        <Text style={styles.sectionTitle}>Overview</Text>
        <Text style={styles.body}>{sections.overview}</Text>

        <View style={styles.divider} />

        <Text style={styles.sectionTitle}>Responsibilities</Text>
        <Text style={styles.body}>{sections.responsibilities}</Text>

        <View style={styles.divider} />

        <Text style={styles.sectionTitle}>Requirements</Text>
        <Text style={styles.body}>{sections.requirements}</Text>

        <View style={styles.divider} />

        <Text style={styles.sectionTitle}>Benefits</Text>
        <Text style={styles.body}>{sections.benefits}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1, minWidth: 0 },
  content: { padding: 16, paddingBottom: 120 },
  back: {
    color: colors.primaryDark,
    fontWeight: "700",
    marginBottom: 14,
    fontSize: 16,
  },

  headerCard: {
    backgroundColor: colors.surface,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
    shadowColor: "#0F2545",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
  },
  companyAvatar: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: "#E9F0FF",
    alignItems: "center",
    justifyContent: "center",
  },
  companyAvatarText: {
    color: colors.primaryDark,
    fontWeight: "900",
    fontSize: 18,
  },
  title: {
    color: colors.textPrimary,
    fontWeight: "900",
    fontSize: 18,
    lineHeight: 24,
  },
  meta: { color: colors.textSecondary, fontSize: 14, marginTop: 2 },
  salary: { color: "#0F8E5E", fontWeight: "800", fontSize: 15, marginTop: 8 },

  actionCard: {
    marginTop: 14,
    backgroundColor: colors.surface,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
  },
  secondaryHit: { alignItems: "center", paddingVertical: 12 },
  secondaryTxt: { color: colors.primaryDark, fontWeight: "800", fontSize: 15 },
  authHint: {
    marginTop: 8,
    textAlign: "center",
    color: colors.primaryDark,
    fontSize: 13,
    fontWeight: "600",
    lineHeight: 18,
  },
  tos: {
    marginTop: 8,
    textAlign: "center",
    color: colors.textSecondary,
    fontSize: 12,
    lineHeight: 18,
  },

  detailsCard: {
    marginTop: 14,
    backgroundColor: colors.surface,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "900",
    color: colors.textPrimary,
    marginBottom: 8,
  },
  divider: { height: 1, backgroundColor: colors.border, marginVertical: 12 },
  body: { color: colors.textPrimary, fontSize: 14, lineHeight: 22 },
});
