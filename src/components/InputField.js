import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { colors } from "../theme";

export function InputField({ label, icon, secureTextEntry, showPasswordToggle, onTogglePassword, ...props }) {
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
          secureTextEntry={secureTextEntry}
          style={[styles.input, icon && styles.inputWithIcon, showPasswordToggle && styles.inputWithRightIcon]}
          placeholderTextColor="#90A0B8"
        />
        {showPasswordToggle && onTogglePassword ? (
          <Pressable onPress={onTogglePassword} style={styles.eyeBtn} hitSlop={8}>
            <MaterialIcons
              name={secureTextEntry ? "visibility-off" : "visibility"}
              size={22}
              color={colors.textSecondary}
            />
          </Pressable>
        ) : null}
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
  inputWithRightIcon: { paddingRight: 48 },
  eyeBtn: {
    position: "absolute",
    right: 12,
    top: 0,
    bottom: 0,
    justifyContent: "center",
    zIndex: 2,
  },
});
