import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
} from "react-native";
import { colors } from "../theme";

export function SettingsScreen() {
  const [current, setCurrent] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirm, setConfirm] = useState("");

  return (
    <ScrollView style={styles.container}>
      
      {/* 🔹 HEADER */}
      <Text style={styles.title}>Security Settings</Text>
      <Text style={styles.subtitle}>
        Manage your password and account security
      </Text>

      {/* 🔹 CARD */}
      <View style={styles.card}>
        <Text style={styles.section}>CHANGE PASSWORD</Text>

        {/* CURRENT PASSWORD */}
        <Text style={styles.label}>Current Password</Text>
        <View style={styles.inputBox}>
          <MaterialIcons name="lock" size={18} color="#7A869A" />
          <TextInput
            placeholder="Enter current password"
            value={current}
            onChangeText={setCurrent}
            secureTextEntry
            style={styles.input}
          />
        </View>

        {/* NEW + CONFIRM */}
        <View style={styles.row}>
          <View style={styles.col}>
            <Text style={styles.label}>New Password</Text>
            <View style={styles.inputBox}>
              <MaterialIcons name="lock" size={18} color="#7A869A" />
              <TextInput
                placeholder="Create new password"
                value={newPass}
                onChangeText={setNewPass}
                secureTextEntry
                style={styles.input}
              />
            </View>
          </View>

          <View style={styles.col}>
            <Text style={styles.label}>Confirm Password</Text>
            <View style={styles.inputBox}>
              <MaterialIcons name="lock" size={18} color="#7A869A" />
              <TextInput
                placeholder="Confirm new password"
                value={confirm}
                onChangeText={setConfirm}
                secureTextEntry
                style={styles.input}
              />
            </View>
          </View>
        </View>
      </View>

      {/* 🔥 UPDATE BUTTON */}
      <View style={styles.btnRow}>
        <Pressable style={styles.updateBtn}>
          <Text style={styles.btnText}>Update Password</Text>
        </Pressable>
      </View>

    </ScrollView>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#F5F7FB",
  },

  title: {
    fontSize: 22,
    fontWeight: "800",
    color: colors.textPrimary,
  },

  subtitle: {
    color: colors.textSecondary,
    marginTop: 4,
    marginBottom: 16,
  },

  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },

  section: {
    color: "#5A6B8C",
    fontWeight: "700",
    marginBottom: 12,
  },

  label: {
    fontWeight: "600",
    marginBottom: 6,
    marginTop: 10,
  },

  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#D8E1F2",
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 12,
    gap: 8,
    backgroundColor: "#F9FBFF",
  },

  input: {
    flex: 1,
    fontSize: 14,
  },

  row: {
    flexDirection: "row",
    gap: 10,
  },

  col: {
    flex: 1,
  },

  btnRow: {
    alignItems: "flex-end",
    marginTop: 20,
  },

  updateBtn: {
    backgroundColor: "#2F5BEA",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 20,
  },

  btnText: {
    color: "#fff",
    fontWeight: "700",
  },
});