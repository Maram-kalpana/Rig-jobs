import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { colors } from "../theme";

export function BrandHeader({ onMenu, onPressBrowseJobs }) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.safe, { paddingTop: insets.top }]}>
      <View style={styles.top}>
        <Pressable onPress={() => onMenu?.()} style={styles.menuHit}>
          <MaterialIcons name="menu" size={26} color="#344C71" />
        </Pressable>

        <Pressable
          onPress={onPressBrowseJobs}
          style={styles.searchBox}
          disabled={!onPressBrowseJobs}
        >
          <MaterialIcons name="search" size={18} color="#7A869A" />
          <Text style={styles.searchText}>Browse Jobs</Text>
        </Pressable>

        <Image
          source={require("../assets/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: {
    backgroundColor: colors.surface,
  },

  top: {
    minHeight: 72,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
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
    marginHorizontal: 8,
  },

  searchText: {
    marginLeft: 8,
    color: "#7A869A",
    fontSize: 14,
  },

  logo: {
    width: 96,
    height: 46,
    marginLeft: 8,
  },
});