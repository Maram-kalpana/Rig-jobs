import React from "react";
import { ScrollView, StyleSheet, Switch, Text, View } from "react-native";
import { InputField } from "../components/InputField";
import { PrimaryButton } from "../components/PrimaryButton";
import { colors } from "../theme";

export function ProfileScreen({ profile, setProfile }) {
  const update = (key, value) => setProfile((old) => ({ ...old, [key]: value }));

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
      <Text style={styles.title}>My Profile</Text>
      <Text style={styles.subtitle}>Keep your details current for recruiters</Text>
      <View style={styles.card}>
        <InputField label="Full Name" value={profile.fullName} onChangeText={(v) => update("fullName", v)} />
        <InputField label="Job Title" value={profile.jobTitle} onChangeText={(v) => update("jobTitle", v)} />
        <InputField label="Email Address" value={profile.email} onChangeText={(v) => update("email", v)} />
        <InputField label="Phone Number" value={profile.phone} onChangeText={(v) => update("phone", v)} />
        <InputField label="Location" value={profile.location} onChangeText={(v) => update("location", v)} />
        <View style={styles.toggleRow}>
          <View style={styles.toggleCopy}>
            <Text style={styles.toggleTitle}>Open to Work</Text>
            <Text style={styles.toggleSub}>Show recruiters you are actively looking</Text>
          </View>
          <Switch value={profile.openToWork} onValueChange={(v) => update("openToWork", v)} trackColor={{ false: "#D0D8E8", true: "#B8E6D3" }} thumbColor={profile.openToWork ? "#0F8E5E" : "#F4F6FA"} />
        </View>
        <PrimaryButton label="Save Changes" onPress={() => {}} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1, minWidth: 0 },
  content: { padding: 16, paddingBottom: 32 },
  title: { color: colors.textPrimary, fontSize: 26, fontWeight: "800" },
  subtitle: { color: colors.textSecondary, fontSize: 15, marginTop: 6, marginBottom: 18 },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
    shadowColor: "#0F2545",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  toggleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    marginBottom: 16,
    marginTop: 4,
    padding: 14,
    borderRadius: 16,
    backgroundColor: colors.successBg,
    borderWidth: 1,
    borderColor: "#C9EADB",
  },
  toggleCopy: { flex: 1, minWidth: 0 },
  toggleTitle: { color: "#0B5F46", fontWeight: "800", fontSize: 16 },
  toggleSub: { color: "#21715A", fontSize: 14, marginTop: 4, lineHeight: 20 },
});
