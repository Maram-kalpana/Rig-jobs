import React from "react";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../theme";

export function WelcomeScreen({ onPressRegister, onPressLogin }) {
  const premiumGradient = ["#1E4CB6", "#0EA5E9"];

  return (
    <SafeAreaView style={styles.safe} edges={["top", "left", "right", "bottom"]}>
      <ScrollView
        style={styles.page}
        contentContainerStyle={styles.pageContent}
        showsVerticalScrollIndicator={false}
      >
          <View style={styles.badgeRow}>
            <Image
              source={require("../assets/logo.png")}
              style={styles.logo}
              resizeMode="contain"
            />
            <View style={styles.badge}>
              <Text style={styles.badgeText}>
                #1 Job Platform for Oil & Gas Professionals
              </Text>
            </View>
          </View>

          <View style={styles.hero}>
            <Text style={styles.title}>Find Onshore & Offshore</Text>
            <Text style={styles.titleAccent}>Oil & Gas Jobs Worldwide</Text>
          </View>

          <View style={styles.aboutWrap}>
            <ScrollView
              style={styles.aboutScroll}
              contentContainerStyle={styles.aboutScrollContent}
              showsVerticalScrollIndicator={false}
            >
              <Text style={styles.about}>
                RigWorldJobs connects skilled energy professionals with leading upstream
                and downstream operators across the globe. Whether you're an experienced
                drilling engineer, an HSE specialist, or a rig supervisor seeking your
                next offshore rotation — we have thousands of verified roles waiting for
                you. From the Gulf of Mexico to the North Sea, the Middle East to
                Southeast Asia, your next career move starts here.
              </Text>
            </ScrollView>
          </View>

        <View style={styles.authCol}>
          <Pressable style={styles.ctaHit} onPress={onPressRegister}>
            <LinearGradient
              colors={premiumGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.btn}
            >
              <Text style={styles.btnText}>Register</Text>
            </LinearGradient>
          </Pressable>

          <Pressable style={styles.ctaHit} onPress={onPressLogin}>
            <LinearGradient
              colors={premiumGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.btn}
            >
              <Text style={styles.btnText}>Login</Text>
            </LinearGradient>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.pageBg },
  page: {
    flex: 1,
    backgroundColor: colors.pageBg,
    paddingHorizontal: 16,
  },

  pageContent: {
    flexGrow: 1,
    paddingTop: 0,
    paddingBottom: 18,
    justifyContent: "flex-start",
  },

  badgeRow: { alignItems: "center", marginTop: 10 },
  logo: { width: 350, height: 120, marginBottom: 10 ,marginTop: 0},
  badge: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  badgeText: {
    color: colors.textSecondary,
    fontSize: 12,
    fontWeight: "700",
  },

  hero: { marginTop: 28, alignItems: "center" },
  title: {
    color: colors.textPrimary,
    fontSize: 34,
    fontWeight: "900",
    letterSpacing: 0.2,
    textAlign: "center",
  },
  titleAccent: {
    marginTop: 8,
    color: colors.primary,
    fontSize: 34,
    fontWeight: "900",
    letterSpacing: 0.2,
    textAlign: "center",
  },

  btn: {
    height: 54,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 10,
  },
  btnText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "800",
  },

  aboutWrap: { marginTop: 18, alignItems: "center" },
  aboutScroll: { maxHeight: 150, width: "92%" },
  aboutScrollContent: { paddingHorizontal: 6, paddingBottom: 6 },
  about: {
    color: colors.textSecondary,
    fontSize: 14,
    lineHeight: 22,
    textAlign: "center",
    fontWeight: "600",
  },

  authCol: {
    marginTop: 18,
    alignItems: "center",
    justifyContent: "center",
    gap: 14,
  },
  ctaHit: { width: "82%" },

});

