import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { colors } from "../theme";

const tabs = ["Account", "Notifications", "Privacy", "Security"];

export function SettingsScreen() {
  const [active, setActive] = useState("Account");
  return (
    <View>
      <Text style={{ fontSize: 30 / 2, fontWeight: "800", marginBottom: 10 }}>Settings</Text>
      <View style={{ backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: 16, padding: 14 }}>
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8, marginBottom: 12 }}>
          {tabs.map((tab) => (
            <Pressable key={tab} onPress={() => setActive(tab)} style={{ paddingHorizontal: 10, paddingVertical: 8, borderRadius: 12, backgroundColor: active === tab ? "#E8EDF8" : "#F7F9FD" }}>
              <Text style={{ color: active === tab ? colors.primaryDark : colors.textSecondary, fontWeight: active === tab ? "700" : "500" }}>{tab}</Text>
            </Pressable>
          ))}
        </View>
        <Text style={{ color: colors.textPrimary, fontSize: 16, lineHeight: 24 }}>
          {active} settings module is active. This module is wired and ready for API integration.
        </Text>
      </View>
    </View>
  );
}
