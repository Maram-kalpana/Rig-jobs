import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { colors } from "../theme";

export function InputField({ label, icon, ...props }) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.row}>
        {icon ? (
          <View style={styles.iconBox}>
            <MaterialIcons name={icon} size={20} color={colors.textSecondary} />
          </View>
        ) : null}
        <TextInput
          {...props}
          style={[styles.input, icon && styles.inputWithIcon]}
          placeholderTextColor="#90A0B8"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { marginBottom: 12 },
  label: { color: colors.textPrimary, fontWeight: "700", fontSize: 18, marginBottom: 8 },
  row: { position: "relative" },
  iconBox: {
    position: "absolute",
    left: 14,
    top: 0,
    bottom: 0,
    zIndex: 1,
    justifyContent: "center",
  },
  input: {
    height: 54,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 18,
    paddingHorizontal: 14,
    backgroundColor: colors.surface,
    color: colors.textPrimary,
    fontSize: 16,
  },
  inputWithIcon: { paddingLeft: 44 },
});
