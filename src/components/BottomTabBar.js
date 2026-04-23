import React from "react";
import { View, Pressable, Text, StyleSheet } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const tabs = [
  { key: "dashboard", label: "Home", icon: "home" },
  { key: "jobs", label: "Apply", icon: "send" },
  { key: "profile", label: "Profile", icon: "person-outline" },
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
    flexDirection: "row",
    height: 64,
    borderTopWidth: 1,
    borderColor: "#eee",
    backgroundColor: "#fff",
    justifyContent: "space-around",
    alignItems: "center",
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