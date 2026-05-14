import React from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { colors } from "../theme";

export function DashboardScreen({
  isAuthenticated,
  stats,
  onBrowseJobs,
  onPressRecentApplications,
  onPressSavedJobs,
  onPressProfile,
  onRequireAuth,
}) {
  // ── Banner categories (always visible) ──
  const categories = [
    {
      id: "offshore",
      label: "Offshore",
      icon: "directions-boat",
      color: ["#1E4CB6", "#0EA5E9"],
      jobs: "240+",
    },
    {
      id: "onshore",
      label: "Onshore",
      icon: "terrain",
      color: ["#0F8E5E", "#22C55E"],
      jobs: "180+",
    },
    {
      id: "drilling",
      label: "Drilling",
      icon: "hardware",
      color: ["#D97706", "#F59E0B"],
      jobs: "120+",
    },
    {
      id: "hse",
      label: "HSE & Safety",
      icon: "security",
      color: ["#7C3AED", "#A855F7"],
      jobs: "90+",
    },
  ];

  // ── Handle protected action ──────────────
  const handleProtectedPress = (action, callback) => {
    if (!isAuthenticated) {
      onRequireAuth?.(action);
      return;
    }
    callback?.();
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* ── HERO BANNER ──────────────────── */}
      <LinearGradient
        colors={["#1E4CB6", "#0EA5E9"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.heroBanner}
      >
        <Text style={styles.heroTitle}>
          {isAuthenticated
            ? "Find Your Dream Rig Job"
            : "Explore Oil & Gas Jobs"}
        </Text>
        <Text style={styles.heroSub}>
          {isAuthenticated
            ? "Browse thousands of verified roles worldwide"
            : "Sign in to apply and track your applications"}
        </Text>
        <Pressable style={styles.heroCta} onPress={onBrowseJobs}>
          <Text style={styles.heroCtaText}>Browse Jobs</Text>
          <MaterialIcons name="arrow-forward" size={18} color="#fff" />
        </Pressable>
      </LinearGradient>

      {/* ── CATEGORIES ───────────────────── */}
      <Text style={styles.sectionTitle}>Browse by Category</Text>
      <View style={styles.categoriesGrid}>
        {categories.map((cat) => (
          <Pressable
            key={cat.id}
            style={styles.categoryCard}
            onPress={onBrowseJobs}
          >
            <LinearGradient
              colors={cat.color}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.categoryIcon}
            >
              <MaterialIcons name={cat.icon} size={22} color="#fff" />
            </LinearGradient>
            <Text style={styles.categoryLabel}>{cat.label}</Text>
            <Text style={styles.categoryJobs}>{cat.jobs} jobs</Text>
          </Pressable>
        ))}
      </View>

      {/* ── STATS CARDS (auth only) ──────── */}
      {isAuthenticated && (
        <>
          <Text style={styles.sectionTitle}>Your Dashboard</Text>
          <View style={styles.cardRow}>
            <Pressable
              style={styles.card}
              onPress={() =>
                handleProtectedPress(
                  { type: "viewApplications" },
                  onPressRecentApplications
                )
              }
            >
              <MaterialIcons name="mail" size={24} color="#2F5BEA" />
              <Text style={styles.cardValue}>{stats.applications}</Text>
              <Text style={styles.cardLabel}>Applications</Text>
            </Pressable>

            <Pressable
              style={styles.card}
              onPress={() =>
                handleProtectedPress(
                  { type: "viewSavedJobs" },
                  onPressSavedJobs
                )
              }
            >
              <MaterialIcons name="bookmark" size={24} color="#0F8E5E" />
              <Text style={styles.cardValue}>{stats.saved}</Text>
              <Text style={styles.cardLabel}>Saved Jobs</Text>
            </Pressable>

            <Pressable
              style={styles.card}
              onPress={() =>
                handleProtectedPress({ type: "viewProfile" }, onPressProfile)
              }
            >
              <MaterialIcons name="person" size={24} color="#7C3AED" />
              <Text style={styles.cardValue}>1</Text>
              <Text style={styles.cardLabel}>Profile</Text>
            </Pressable>
          </View>
        </>
      )}

      {/* ── RECENT JOBS / TRENDING ────────── */}
      <Text style={styles.sectionTitle}>Trending Now</Text>
      <View style={styles.trendingCard}>
        <Text style={styles.trendingText}>
          🔥 Offshore Rig Electrician — Mumbai
        </Text>
        <Text style={styles.trendingText}>🔥 Drilling Engineer — Goa</Text>
        <Text style={styles.trendingText}>
          🔥 HSE Officer — Chennai
        </Text>
        <Pressable style={styles.viewAllBtn} onPress={onBrowseJobs}>
          <Text style={styles.viewAllText}>View All Jobs →</Text>
        </Pressable>
      </View>

      {/* ── AUTH CTA (public only) ────────── */}
      {!isAuthenticated && (
        <LinearGradient
          colors={["#1E4CB6", "#0EA5E9"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.authCtaBanner}
        >
          <Text style={styles.authCtaTitle}>
            Ready to take the next step?
          </Text>
          <Text style={styles.authCtaSub}>
            Create an account to apply for jobs, save your favorites, and track
            applications.
          </Text>
          <Pressable
            style={styles.authCtaBtn}
            onPress={() =>
              handleProtectedPress({ type: "viewProfile" }, () => {})
            }
          >
            <Text style={styles.authCtaBtnText}>Get Started</Text>
          </Pressable>
        </LinearGradient>
      )}

      {/* ── NOTIFICATIONS (auth only) ─────── */}
      {isAuthenticated && (
        <>
          <Text style={styles.sectionTitle}>Notifications</Text>
          <View style={styles.section}>
            <View style={styles.notifItem}>
              <MaterialIcons name="notifications" size={18} color="#2F5BEA" />
              <Text style={styles.notifText}>
                Interview scheduled for Rig Mechanic
              </Text>
            </View>
            <View style={styles.notifItem}>
              <MaterialIcons name="notifications" size={18} color="#D97706" />
              <Text style={styles.notifText}>
                Application under review — Offshore Electrician
              </Text>
            </View>
          </View>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { paddingBottom: 100 },

  // ── Hero Banner ──────────────────────────
  heroBanner: {
    marginHorizontal: 16,
    marginTop: 12,
    borderRadius: 20,
    padding: 24,
    paddingTop: 32,
    paddingBottom: 28,
  },
  heroTitle: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "800",
    letterSpacing: -0.3,
  },
  heroSub: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 15,
    marginTop: 8,
    lineHeight: 22,
  },
  heroCta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 18,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignSelf: "flex-start",
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 999,
  },
  heroCtaText: { color: "#fff", fontWeight: "700", fontSize: 15 },

  // ── Section Title ────────────────────────
  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: colors.textPrimary,
    marginTop: 24,
    marginBottom: 12,
    paddingHorizontal: 16,
  },

  // ── Categories ───────────────────────────
  categoriesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 12,
    gap: 8,
  },
  categoryCard: {
    width: "47%",
    backgroundColor: "#fff",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#eee",
    padding: 16,
    marginBottom: 4,
  },
  categoryIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  categoryLabel: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1E293B",
  },
  categoryJobs: {
    fontSize: 13,
    color: "#64748B",
    marginTop: 2,
  },

  // ── Stats Cards ──────────────────────────
  cardRow: {
    flexDirection: "row",
    paddingHorizontal: 16,
    gap: 10,
  },
  card: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#eee",
    alignItems: "center",
  },
  cardValue: {
    fontSize: 22,
    fontWeight: "800",
    color: "#1E293B",
    marginTop: 8,
  },
  cardLabel: { color: "#64748B", fontSize: 12, marginTop: 2 },

  // ── Trending ─────────────────────────────
  trendingCard: {
    marginHorizontal: 16,
    backgroundColor: "#fff",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#eee",
    padding: 16,
  },
  trendingText: {
    fontSize: 14,
    color: "#1E293B",
    marginBottom: 8,
    fontWeight: "500",
  },
  viewAllBtn: { marginTop: 8, alignItems: "flex-end" },
  viewAllText: { color: "#2F5BEA", fontWeight: "700", fontSize: 14 },

  // ── Auth CTA ─────────────────────────────
  authCtaBanner: {
    marginHorizontal: 16,
    marginTop: 24,
    borderRadius: 20,
    padding: 24,
    alignItems: "center",
  },
  authCtaTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "800",
    textAlign: "center",
  },
  authCtaSub: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 14,
    textAlign: "center",
    marginTop: 8,
    lineHeight: 20,
  },
  authCtaBtn: {
    marginTop: 16,
    backgroundColor: "#fff",
    paddingHorizontal: 28,
    paddingVertical: 12,
    borderRadius: 999,
  },
  authCtaBtnText: {
    color: "#1E4CB6",
    fontWeight: "800",
    fontSize: 15,
  },

  // ── Section ──────────────────────────────
  section: {
    marginHorizontal: 16,
    backgroundColor: "#fff",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#eee",
    padding: 16,
  },
  notifItem: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  notifText: { flex: 1, fontSize: 14, color: "#1E293B" },
});