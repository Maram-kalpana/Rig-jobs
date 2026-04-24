import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { colors } from "../theme";

export function BrandHeader({ onMenu }) {
  return (
    <SafeAreaView edges={["top"]} style={styles.safe}>
      <View style={styles.top}>
        
        {/* MENU */}
        <Pressable onPress={onMenu} style={styles.menuHit}>
          <MaterialIcons name="menu" size={26} color="#344C71" />
        </Pressable>

        {/* SEARCH BAR */}
        <View style={styles.searchBox}>
          <MaterialIcons name="search" size={18} color="#7A869A" />
          <Text style={styles.searchText}>Browse Jobs</Text>
        </View>

        {/* USER PROFILE */}
        <View style={styles.profile}>
          <Text style={styles.avatarText}>MK</Text>
        </View>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    backgroundColor: colors.surface,
  },

  top: {
    minHeight: 60,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingBottom: 10, // optional spacing
  },

  menuHit: {
    padding: 8,
  },

  searchBox: {
    flex: 1,
    height: 40,
    backgroundColor: "#F1F4F9",
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    marginHorizontal: 10,
  },

  searchText: {
    marginLeft: 8,
    color: "#7A869A",
    fontSize: 14,
  },

  profile: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#2F5BEA",
    alignItems: "center",
    justifyContent: "center",
  },

  avatarText: {
    color: "#fff",
    fontWeight: "700",
  },
});