import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export function ProfileScreen() {
  const [skills, setSkills] = useState([]);
  const [input, setInput] = useState("");

  const addSkill = () => {
    if (input.trim()) {
      setSkills([...skills, input]);
      setInput("");
    }
  };

  return (
    <ScrollView style={styles.container}>
      
      {/* 🔹 PROFILE HEADER */}
      <View style={styles.header}>
        <View style={styles.avatar} />

        <View style={{ flex: 1 }}>
          <Text style={styles.name}>m kalpana</Text>
          <Text style={styles.sub}>Profile last updated - Today</Text>

          <View style={styles.infoRow}>
            <MaterialIcons name="email" size={16} color="#888" />
            <Text style={styles.infoText}>maramkalpana@gmail.com</Text>
          </View>
        </View>

        <View style={styles.progressCircle}>
          <Text style={styles.percent}>0%</Text>
          <Text style={styles.small}>Profile Completion</Text>
        </View>
      </View>

      {/* 🔹 MAIN GRID */}
      <View style={styles.rowLayout}>
        
        {/* LEFT PANEL */}
        <View style={styles.left}>
          <Text style={styles.sectionTitle}>Profile Sections</Text>

          {[
            { label: "About", value: "100%" },
            { label: "Key skills", value: "0%" },
            { label: "Employment", value: "0%" },
            { label: "Education", value: "0%" },
            { label: "Certifications", value: "0%" },
            { label: "Resume", value: "0%" },
          ].map((item) => (
            <View key={item.label} style={styles.progressItem}>
              <View style={styles.progressTop}>
                <Text>{item.label}</Text>
                <Text style={{ color: item.value === "100%" ? "green" : "#888" }}>
                  {item.value}
                </Text>
              </View>

              <View style={styles.progressBar}>
                <View
                  style={[
                    styles.progressFill,
                    { width: item.value === "100%" ? "100%" : "0%" },
                  ]}
                />
              </View>
            </View>
          ))}
        </View>

        {/* RIGHT PANEL */}
        <View style={styles.right}>

          {/* ABOUT */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>About Me</Text>
              <Text style={styles.action}>Edit</Text>
            </View>
          </View>

          {/* SKILLS */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Key Skills</Text>
              <Text style={styles.action}>Cancel</Text>
            </View>

            <View style={styles.inputRow}>
              <TextInput
                placeholder="Add skill"
                value={input}
                onChangeText={setInput}
                style={styles.input}
              />
              <Pressable style={styles.addBtn} onPress={addSkill}>
                <Text style={{ color: "#fff" }}>+</Text>
              </Pressable>
            </View>

            <Pressable style={styles.saveBtn}>
              <Text style={{ color: "#fff" }}>Save Skills</Text>
            </Pressable>

            {skills.map((s, i) => (
              <Text key={i} style={styles.skillItem}>• {s}</Text>
            ))}
          </View>

          {/* EMPLOYMENT */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Employment</Text>
              <Text style={styles.action}>Add</Text>
            </View>
          </View>

          {/* EDUCATION */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Education</Text>
              <Text style={styles.action}>+ Add</Text>
            </View>
            <Text style={styles.empty}>
              No education added yet.
            </Text>
          </View>

          {/* CERTIFICATIONS */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Certifications</Text>
              <Text style={styles.action}>Add</Text>
            </View>
          </View>

          {/* RESUME */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Resume</Text>
            <View style={styles.uploadBox}>
              <Text>Upload Resume (PDF / DOC)</Text>
            </View>
          </View>

        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: "#F5F7FB" },

  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
  },

  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#ddd",
    marginRight: 12,
  },

  name: { fontWeight: "700", fontSize: 16 },
  sub: { color: "#777", fontSize: 12 },

  infoRow: { flexDirection: "row", alignItems: "center", marginTop: 6 },
  infoText: { marginLeft: 6, color: "#555", fontSize: 13 },

  progressCircle: { alignItems: "center" },
  percent: { fontWeight: "700" },
  small: { fontSize: 10, color: "#777" },

  rowLayout: { flexDirection: "row", gap: 12 },

  left: { width: "35%" },
  right: { width: "65%" },

  sectionTitle: { fontWeight: "700", marginBottom: 10 },

  progressItem: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },

  progressTop: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  progressBar: {
    height: 6,
    backgroundColor: "#eee",
    borderRadius: 4,
    marginTop: 6,
  },

  progressFill: {
    height: 6,
    backgroundColor: "green",
    borderRadius: 4,
  },

  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
  },

  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  cardTitle: { fontWeight: "700" },
  action: { color: "#2F5BEA" },

  inputRow: {
    flexDirection: "row",
    marginTop: 10,
  },

  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
  },

  addBtn: {
    backgroundColor: "#2F5BEA",
    marginLeft: 8,
    padding: 10,
    borderRadius: 8,
  },

  saveBtn: {
    marginTop: 10,
    backgroundColor: "green",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },

  skillItem: { marginTop: 4 },

  empty: { color: "#777", marginTop: 6 },

  uploadBox: {
    borderWidth: 1,
    borderStyle: "dashed",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
});