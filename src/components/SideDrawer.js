import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const menu = [
  { key: "jobs", label: "Browse Jobs", icon: "work" },
  { key: "applications", label: "My Applications", icon: "description" },
  { key: "saved", label: "Saved Jobs", icon: "bookmark-border" },
  { key: "profile", label: "My Profile", icon: "person" },
  { key: "settings", label: "Settings", icon: "settings" },
];

export function SideDrawer({ activeKey, onNavigate, onLogout, userName, profilePhoto }) {
  const displayName = userName || "User";
  const initials = displayName
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase())
    .slice(0, 2)
    .join("");

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        
        {/* Profile */}
        <Pressable
          style={styles.profileRow}
          onPress={() => onNavigate?.("profile")}
        >
          <View style={styles.avatar}>
            {profilePhoto ? (
              <Image source={{ uri: profilePhoto }} style={styles.avatarImage} />
            ) : (
              <Text style={styles.avatarText}>{initials}</Text>
            )}
          </View>

          <View style={{ flex: 1 }}>
            <Text style={styles.name}>{displayName}</Text>
            <Text style={styles.update}>Update profile</Text>
          </View>

          <MaterialIcons name="chevron-right" size={20} color="#999" />
        </Pressable>

        {/* Menu */}
        <View style={styles.menu}>
          {menu.map((item) => {
            const active = activeKey === item.key;
            return (
              <Pressable
                key={item.key}
                style={[styles.menuItem, active && styles.activeItem]}
                onPress={() => onNavigate(item.key)}
              >
                <MaterialIcons
                  name={item.icon}
                  size={22}
                  color={active ? "#2F5BEA" : "#444"}
                />
                <Text style={[styles.menuText, active && styles.activeText]}>
                  {item.label}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>

      {/* Logout */}
      <View style={styles.footer}>
        <Pressable style={styles.logout} onPress={onLogout}>
          <MaterialIcons name="logout" size={20} color="#2F5BEA" />
          <Text style={styles.logoutText}>Logout</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  profileRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },

  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#2F5BEA",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
    overflow: "hidden",
  },
  avatarImage: {
    width: 42,
    height: 42,
    borderRadius: 21,
  },
  avatarText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },

  name: { fontSize: 17, fontWeight: "600", color: "#222" },
  update: { fontSize: 14, color: "#2F5BEA" },

  menu: { marginTop: 8 },

  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 18,
  },

  menuText: {
    marginLeft: 16,
    fontSize: 16,
    color: "#333",
  },

  activeItem: {
    backgroundColor: "#E9F0FF",
    borderRadius: 8,
    marginHorizontal: 10,
  },

  activeText: {
    color: "#2F5BEA",
    fontWeight: "600",
  },

  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderColor: "#eee",
  },

  logout: {
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },

  logoutText: {
    marginLeft: 8,
    color: "#2F5BEA",
    fontWeight: "600",
    fontSize: 16,
  },
});