import React from "react";
import { Switch, Text, View } from "react-native";
import { InputField } from "../components/InputField";
import { PrimaryButton } from "../components/PrimaryButton";
import { colors } from "../theme";

export function ProfileScreen({ profile, setProfile }) {
  const update = (key, value) => setProfile((old) => ({ ...old, [key]: value }));
  return (
    <View>
      <Text style={{ fontSize: 30 / 2, fontWeight: "800", marginBottom: 10 }}>My Profile</Text>
      <View style={{ backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: 16, padding: 14 }}>
        <InputField label="Full Name" value={profile.fullName} onChangeText={(v) => update("fullName", v)} />
        <InputField label="Job Title" value={profile.jobTitle} onChangeText={(v) => update("jobTitle", v)} />
        <InputField label="Email Address" value={profile.email} onChangeText={(v) => update("email", v)} />
        <InputField label="Phone Number" value={profile.phone} onChangeText={(v) => update("phone", v)} />
        <InputField label="Location" value={profile.location} onChangeText={(v) => update("location", v)} />
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <Text style={{ color: colors.textPrimary, fontWeight: "700", fontSize: 16 }}>Open to Work</Text>
          <Switch value={profile.openToWork} onValueChange={(v) => update("openToWork", v)} />
        </View>
        <PrimaryButton label="Save Changes" onPress={() => {}} />
      </View>
    </View>
  );
}
