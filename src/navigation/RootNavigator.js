import React, { useCallback, useMemo, useState, useEffect, useRef } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  useWindowDimensions,
  View,
  Animated,
  Text,
} from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { useAuth } from "../context/AuthContext";
import { useApp } from "../context/AppContext";
import { BrandHeader } from "../components/BrandHeader";
import { SideDrawer } from "../components/SideDrawer";
import { BottomTabBar } from "../components/BottomTabBar";
import { colors } from "../theme";

import { SplashScreen } from "../screens/SplashScreen";
import { LoginScreen } from "../screens/LoginScreen";
import { RegisterScreen } from "../screens/RegisterScreen";
import { DashboardScreen } from "../screens/DashboardScreen";
import { JobsScreen } from "../screens/JobsScreen";
import { ApplicationsScreen } from "../screens/ApplicationsScreen";
import { SavedJobsScreen } from "../screens/SavedJobsScreen";
import { ProfileScreen } from "../screens/ProfileScreen";
import { SettingsScreen } from "../screens/SettingsScreen";
import { JobDetailsScreen } from "../screens/JobDetailsScreen";
import { PaymentSheet } from "../components/PaymentSheet";

// ─────────────────────────────────────────────
// PROTECTED ROUTES — require login
// ─────────────────────────────────────────────
const PROTECTED_ROUTES = [
  "applications",
  "saved",
  "profile",
  "settings",
  "details",
];

// ─────────────────────────────────────────────
// ROOT NAVIGATOR
// ─────────────────────────────────────────────
export function RootNavigator() {
  // ══════════════════════════════════════════
  // ALL HOOKS MUST BE UNCONDITIONAL
  // ══════════════════════════════════════════
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const drawerWidth = Math.min(width * 0.78, 320);

  // ── Auth ──────────────────────────────────
  const {
    isAuthenticated,
    pendingAction,
    setPendingAction,
    clearPendingAction,
    currentUser,
    profile,
    setProfile,
    logout,
    toggleSaveJob,
    applyForJob,
  } = useAuth();

  // ── App data ──────────────────────────────
  const { jobs } = useApp();

  // ── Navigation state ──────────────────────
  const [showSplash, setShowSplash] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [route, setRoute] = useState("dashboard");
  const [selectedJob, setSelectedJob] = useState(null);
  const [detailsFrom, setDetailsFrom] = useState("jobs");
  const [payJobId, setPayJobId] = useState(null);
  const [payStep, setPayStep] = useState(0);

  // ── Auth gate state ───────────────────────
  const [showAuthGate, setShowAuthGate] = useState(false);
  const [authGateMode, setAuthGateMode] = useState("login");
  const authSlideAnim = useRef(new Animated.Value(0)).current;

  // ── Derived user data ─────────────────────
  const savedJobs = useMemo(
    () =>
      currentUser
        ? jobs.filter((j) => currentUser.savedJobIds?.includes(j.id))
        : [],
    [currentUser, jobs]
  );

  const applications = useMemo(
    () =>
      currentUser
        ? jobs.filter((j) => currentUser.applicationIds?.includes(j.id))
        : [],
    [currentUser, jobs]
  );

  const isSaved = useCallback(
    (jobId) => currentUser?.savedJobIds?.includes(jobId) ?? false,
    [currentUser]
  );

  const isApplied = useCallback(
    (jobId) => currentUser?.applicationIds?.includes(jobId) ?? false,
    [currentUser]
  );

  // ── Open auth gate ────────────────────────
  const openAuthGate = useCallback(
    (mode = "login") => {
      setAuthGateMode(mode);
      setShowAuthGate(true);
      Animated.spring(authSlideAnim, {
        toValue: 1,
        useNativeDriver: true,
        tension: 80,
        friction: 12,
      }).start();
    },
    [authSlideAnim]
  );

  // ── Close auth gate ───────────────────────
  const closeAuthGate = useCallback(() => {
    Animated.timing(authSlideAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setShowAuthGate(false);
      clearPendingAction();
    });
  }, [authSlideAnim, clearPendingAction]);

  // ── Handle pending action after login ─────
  useEffect(() => {
    if (isAuthenticated && pendingAction) {
      const action = pendingAction;
      clearPendingAction();

      if (action.type === "viewJobDetails" && action.payload?.job) {
        setSelectedJob(action.payload.job);
        setDetailsFrom(action.payload.from || "jobs");
        setRoute("details");
      }

      if (showAuthGate) {
        Animated.timing(authSlideAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }).start(() => {
          setShowAuthGate(false);
        });
      }
    }
  }, [isAuthenticated, pendingAction]);

  // ── Auth gate: require login ──────────────
  const requireAuth = useCallback(
    (action) => {
      if (isAuthenticated) return true;
      setPendingAction(action);
      openAuthGate("login");
      return false;
    },
    [isAuthenticated, setPendingAction, openAuthGate]
  );

  // ── Payment ───────────────────────────────
  const requestPayment = useCallback((jobId) => {
    if (!jobId) return;
    setPayJobId(jobId);
    setPayStep(1);
  }, []);

  const closePayment = useCallback(() => {
    setPayStep(0);
    setPayJobId(null);
  }, []);

  const goToPaymentPage = useCallback(() => setPayStep(2), []);
  const goToPaymentOptions = useCallback(() => setPayStep(3), []);

  // ── Open job details (public: limited view) ──
  const openJobDetails = useCallback(
    (job, fromRoute) => {
      if (!isAuthenticated) {
        setPendingAction({
          type: "viewJobDetails",
          payload: { job, from: fromRoute },
        });
        openAuthGate("login");
        return;
      }
      setSelectedJob(job);
      setDetailsFrom(fromRoute);
      setRoute("details");
      setDrawerOpen(false);
    },
    [isAuthenticated, setPendingAction, openAuthGate]
  );

  // ── Handle apply (protected) ──────────────
  const handleApply = useCallback(
    (jobId) => {
      if (!requireAuth({ type: "applyJob", payload: { jobId } })) return;
      requestPayment(jobId);
    },
    [requireAuth, requestPayment]
  );

  // ── Handle save (protected) ───────────────
  const handleSave = useCallback(
    (jobId) => {
      if (!requireAuth({ type: "saveJob", payload: { jobId } })) return;
      toggleSaveJob(jobId);
    },
    [requireAuth, toggleSaveJob]
  );

  // ── Handle tab navigation (with auth gate) ──
  const handleTabChange = useCallback(
    (key) => {
      if (PROTECTED_ROUTES.includes(key) && !isAuthenticated) {
        const actionMap = {
          applications: { type: "viewApplications" },
          saved: { type: "viewSavedJobs" },
          profile: { type: "viewProfile" },
          settings: { type: "viewSettings" },
        };
        setPendingAction(actionMap[key] || { type: key });
        openAuthGate("login");
        return;
      }
      setRoute(key);
      setSelectedJob(null);
      setDrawerOpen(false);
    },
    [isAuthenticated, setPendingAction, openAuthGate]
  );

  const handleDrawerNavigate = useCallback(
    (next) => {
      if (PROTECTED_ROUTES.includes(next) && !isAuthenticated) {
        const actionMap = {
          applications: { type: "viewApplications" },
          saved: { type: "viewSavedJobs" },
          profile: { type: "viewProfile" },
          settings: { type: "viewSettings" },
        };
        setPendingAction(actionMap[next] || { type: next });
        openAuthGate("login");
        return;
      }
      setRoute(next);
      setSelectedJob(null);
      setDrawerOpen(false);
    },
    [isAuthenticated, setPendingAction, openAuthGate]
  );

  // ── Content renderer ──────────────────────
  const content = useMemo(() => {
    if (route === "details" && selectedJob) {
      return (
        <JobDetailsScreen
          job={selectedJob}
          isAuthenticated={isAuthenticated}
          onBack={() => {
            setRoute(detailsFrom);
            setSelectedJob(null);
          }}
          onApply={handleApply}
          onSave={handleSave}
          onRequireAuth={() =>
            requireAuth({
              type: "viewJobDetails",
              payload: { job: selectedJob, from: detailsFrom },
            })
          }
          applied={isApplied(selectedJob.id)}
          saved={isSaved(selectedJob.id)}
        />
      );
    }

    if (route === "dashboard") {
      return (
        <DashboardScreen
          isAuthenticated={isAuthenticated}
          stats={{
            applications: applications.length,
            saved: savedJobs.length,
          }}
          onBrowseJobs={() => setRoute("jobs")}
          onPressRecentApplications={() => handleTabChange("applications")}
          onPressSavedJobs={() => handleTabChange("saved")}
          onPressProfile={() => handleTabChange("profile")}
          onRequireAuth={(action) => requireAuth(action)}
        />
      );
    }

    if (route === "applications") {
      return (
        <ApplicationsScreen
          applications={applications}
          onOpenJob={(job) => openJobDetails(job, "applications")}
        />
      );
    }

    if (route === "saved") {
      return (
        <SavedJobsScreen
          jobs={savedJobs}
          onOpenJob={(job) => openJobDetails(job, "saved")}
          onToggleSave={toggleSaveJob}
          onApply={(job) => handleApply(job?.id ?? job)}
        />
      );
    }

    if (route === "profile") {
      return (
        <ProfileScreen profile={profile} setProfile={setProfile} />
      );
    }

    if (route === "settings") {
      return <SettingsScreen onBrowseJobs={() => setRoute("jobs")} />;
    }

    // Default: Jobs screen (public)
    return (
      <JobsScreen
        jobs={jobs}
        onOpenJob={(job) => openJobDetails(job, "jobs")}
        onApply={handleApply}
        onSave={handleSave}
        isApplied={isApplied}
        isSaved={isSaved}
      />
    );
  }, [
    route,
    selectedJob,
    detailsFrom,
    isAuthenticated,
    openJobDetails,
    handleApply,
    handleSave,
    requireAuth,
    handleTabChange,
    isApplied,
    isSaved,
    applications,
    savedJobs,
    profile,
    setProfile,
    jobs,
    toggleSaveJob,
  ]);

  const drawerActiveKey =
    route === "details" ? detailsFrom : route;

  // ── Auth gate translate animation ─────────
  const authGateTranslateX = authSlideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [width, 0],
  });

  // ══════════════════════════════════════════
  // RENDER
  // ══════════════════════════════════════════

  // ── Splash screen (rendered inside JSX, not early return) ──
  if (showSplash) {
    return (
      <SplashScreen
        durationMs={2500}
        onDone={() => setShowSplash(false)}
      />
    );
  }

  return (
    <>
      <SafeAreaView
        style={[styles.page, { backgroundColor: colors.pageBg }]}
        edges={["left", "right", "bottom"]}
      >
        <View style={styles.shell}>
          {/* HEADER */}
          <BrandHeader
            onMenu={() => setDrawerOpen((v) => !v)}
            onPressBrowseJobs={() => {
              setRoute("jobs");
              setSelectedJob(null);
              setDrawerOpen(false);
            }}
          />

          {/* CONTENT */}
          <KeyboardAvoidingView
            style={styles.keyboard}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
          >
            <View style={{ flex: 1 }}>{content}</View>

            {/* BOTTOM TAB */}
            <BottomTabBar
              active={route === "details" ? detailsFrom : route}
              onChange={handleTabChange}
            />
          </KeyboardAvoidingView>

          {/* DRAWER */}
          {drawerOpen && (
            <>
              <Pressable
                style={styles.backdrop}
                onPress={() => setDrawerOpen(false)}
              />
              <View
                style={[styles.drawerHost, { width: drawerWidth }]}
              >
                <SideDrawer
                  activeKey={drawerActiveKey}
                  onNavigate={handleDrawerNavigate}
                  onLogout={() => {
                    logout();
                    setRoute("dashboard");
                    setSelectedJob(null);
                    setDrawerOpen(false);
                  }}
                />
              </View>
            </>
          )}
        </View>
      </SafeAreaView>

      {/* PAYMENT SHEETS */}
      <PaymentSheet
        visible={payStep === 1}
        title="Payment Required"
        amountText="$5"
        amountHint="You'll be redirected to payment page to complete your application."
        feeLabel="Application Fee"
        onClose={closePayment}
        onPay={() => goToPaymentPage()}
      />
      <PaymentSheet
        visible={payStep === 2}
        title="Payment"
        amountText="$5"
        amountHint="This is a placeholder payment page. Integrate Stripe/Razorpay here."
        feeLabel="Application Fee"
        onClose={closePayment}
        onPay={() => goToPaymentOptions()}
      />
      <PaymentSheet
        visible={payStep === 3}
        title="Payment Options"
        amountText="$5"
        amountHint="≈ ₹472.85"
        feeLabel="Application Fee"
        onClose={closePayment}
        onPay={() => {
          if (payJobId) applyForJob(payJobId);
          closePayment();
        }}
      />

      {/* ── AUTH GATE OVERLAY ──────────────── */}
      {showAuthGate && (
        <Animated.View
          style={[
            styles.authGateContainer,
            { transform: [{ translateX: authGateTranslateX }] },
          ]}
        >
          <SafeAreaView style={styles.authGateSafe}>
            {/* Close button */}
            <Pressable
              style={[
                styles.authCloseBtn,
                { top: insets.top + (Platform.OS === "ios" ? 4 : 8) },
              ]}
              onPress={closeAuthGate}
              hitSlop={12}
            >
              <Text style={styles.authCloseText}>✕</Text>
            </Pressable>

            {/* Auth screens */}
            {authGateMode === "login" ? (
              <LoginScreen
                onLoginSuccess={() => {
                  // Auth state change triggers useEffect above
                }}
                onNavigateRegister={() => setAuthGateMode("register")}
              />
            ) : (
              <RegisterScreen
                onNavigateLogin={() => setAuthGateMode("login")}
              />
            )}
          </SafeAreaView>
        </Animated.View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1 },
  shell: {
    flex: 1,
    position: "relative",
  },
  keyboard: { flex: 1 },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(15, 37, 71, 0.38)",
    zIndex: 999,
  },
  drawerHost: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    zIndex: 9999,
    elevation: 20,
    backgroundColor: "#fff",
  },

  // ── Auth gate overlay ─────────────────────
  authGateContainer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 10000,
    elevation: 30,
    backgroundColor: "#F1F5F9",
  },
  authGateSafe: {
    flex: 1,
    position: "relative",
  },
  authCloseBtn: {
    position: "absolute",
    right: 16,
    zIndex: 100,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(0,0,0,0.06)",
    alignItems: "center",
    justifyContent: "center",
  },
  authCloseText: {
    fontSize: 18,
    color: "#1E293B",
    fontWeight: "700",
  },
});