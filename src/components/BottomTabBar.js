import React from "react";
import { View, Pressable, Text, StyleSheet } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const tabs = [
  { key: "dashboard", label: "Home", icon: "home" },
  { key: "jobs", label: "Apply", icon: "send" },
  { key: "applications", label: "N Vites", icon: "mail" },
  { key: "profile", label: "Profile", icon: "person" },
];

export function BottomTabBar({ active, onChange }) {
  return (
    <View style={styles.container}>
      {tabs.map((tab) => {
        const isActive = active === tab.key;

        return (
          <Pressable
            key={tab.key}
            style={styles.tab}
            onPress={() => onChange(tab.key)}
          >
            <MaterialIcons
              name={tab.icon}
              size={24}
              color={isActive ? "#2F5BEA" : "#7A869A"}
            />
            <Text style={[styles.label, isActive && styles.activeLabel]}>
              {tab.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
  flexDirection: "row",
  height: 64,
  position: "absolute",   // ✅ ADD
  bottom: 0,              // ✅ ADD
  left: 0,                // ✅ ADD
  right: 0,               // ✅ ADD
  borderTopWidth: 1,
  borderColor: "#eee",
  backgroundColor: "#F1F5F9",
  justifyContent: "space-around",
  alignItems: "center",
  paddingHorizontal: 12
},

  tab: {
    alignItems: "center",
    justifyContent: "center",
  },

  label: {
    fontSize: 12,
    color: "#7A869A",
    marginTop: 4,
  },

  activeLabel: {
    color: "#2F5BEA",
    fontWeight: "600",
  },
});