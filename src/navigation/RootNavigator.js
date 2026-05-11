import React, { useCallback, useMemo, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useApp } from "../context/AppContext";
import { BrandHeader } from "../components/BrandHeader";
import { SideDrawer } from "../components/SideDrawer";
import { colors } from "../theme";

import { RegisterScreen } from "../screens/RegisterScreen";
import { LoginScreen } from "../screens/LoginScreen";
import { DashboardScreen } from "../screens/DashboardScreen";
import { JobsScreen } from "../screens/JobsScreen";
import { ApplicationsScreen } from "../screens/ApplicationsScreen";
import { SavedJobsScreen } from "../screens/SavedJobsScreen";
import { ProfileScreen } from "../screens/ProfileScreen";
import { SettingsScreen } from "../screens/SettingsScreen";
import { JobDetailsScreen } from "../screens/JobDetailsScreen";
import { BottomTabBar } from "../components/BottomTabBar";
import { SplashScreen } from "../screens/SplashScreen";
import { WelcomeScreen } from "../screens/WelcomeScreen";
import { PaymentSheet } from "../components/PaymentSheet";

export function RootNavigator() {
  const { width } = useWindowDimensions();

  const {
    currentUser,
    jobs,
    savedJobs,
    applications,
    profile,
    setProfile,
    logout,
    toggleSaveJob,
    applyForJob,
    isApplied,
    isSaved,
  } = useApp();

  const [authRoute, setAuthRoute] = useState("register");
  const [showSplash, setShowSplash] = useState(true);
  const [showWelcome, setShowWelcome] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [route, setRoute] = useState("jobs");
  const [selectedJob, setSelectedJob] = useState(null);
  const [detailsFrom, setDetailsFrom] = useState("jobs");
  const [payJobId, setPayJobId] = useState(null);
  const [payStep, setPayStep] = useState(0); // 0=closed, 1=required, 2=payment, 3=options

  const drawerWidth = Math.min(width * 0.78, 320);

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

  const goHome = useCallback(() => {
    setRoute("dashboard");
    setSelectedJob(null);
    setDrawerOpen(false);
  }, []);

  const openJobDetails = useCallback((job, fromRoute) => {
    setSelectedJob(job);
    setDetailsFrom(fromRoute);
    setRoute("details");
    setDrawerOpen(false);
  }, []);

  const handleDrawerNavigate = useCallback((next) => {
    setRoute(next);
    setSelectedJob(null);
    setDrawerOpen(false);
  }, []);

  const content = useMemo(() => {
    if (route === "details" && selectedJob) {
      return (
        <JobDetailsScreen
          job={selectedJob}
          onBack={() => {
            setRoute(detailsFrom);
            setSelectedJob(null);
          }}
          onApply={(jobId) => requestPayment(jobId)}
          onSave={toggleSaveJob}
          applied={isApplied(selectedJob.id)}
          saved={isSaved(selectedJob.id)}
        />
      );
    }

    if (route === "dashboard") {
      return (
        <DashboardScreen
          stats={{
            applications: applications.length,
            saved: savedJobs.length,
          }}
          onBrowseJobs={() => setRoute("jobs")}
          onPressRecentApplications={() => {
            setRoute("applications");
            setSelectedJob(null);
            setDrawerOpen(false);
          }}
          onPressSavedJobs={() => {
            setRoute("saved");
            setSelectedJob(null);
            setDrawerOpen(false);
          }}
        />
      );
    }

    if (route === "applications") {
      return (
        <ApplicationsScreen
          applications={applications}
          onOpenJob={(job) =>
            openJobDetails(job, "applications")
          }
        />
      );
    }

    if (route === "saved") {
  return (
    <SavedJobsScreen
      jobs={savedJobs}
      onOpenJob={(job) =>
        openJobDetails(job, "saved")
      }
      onToggleSave={toggleSaveJob}
      onApply={(job) => requestPayment(job?.id ?? job)}
    />
  );
}

    if (route === "profile") {
      return (
        <ProfileScreen
          profile={profile}
          setProfile={setProfile}
        />
      );
    }

    if (route === "settings") {
      return (
        <SettingsScreen
          onBrowseJobs={() => setRoute("jobs")}
        />
      );
    }

    return (
      <JobsScreen
        jobs={jobs}
        onOpenJob={(job) =>
          openJobDetails(job, "jobs")
        }
        onApply={(jobId) => requestPayment(jobId)}
        onSave={toggleSaveJob}
        isApplied={isApplied}
        isSaved={isSaved}
      />
    );
  }, [
    route,
    selectedJob,
    detailsFrom,
    openJobDetails,
    requestPayment,
    toggleSaveJob,
    isApplied,
    isSaved,
    applications,
    savedJobs,
    profile,
    setProfile,
    jobs,
  ]);

  // 🔐 AUTH FLOW
  if (!currentUser) {
    if (showSplash) {
      return (
        <SplashScreen
          durationMs={3000}
          onDone={() => setShowSplash(false)}
        />
      );
    }

    if (showWelcome) {
      return (
        <WelcomeScreen
          onPressRegister={() => {
            setAuthRoute("register");
            setShowWelcome(false);
          }}
          onPressLogin={() => {
            setAuthRoute("login");
            setShowWelcome(false);
          }}
        />
      );
    }

    if (authRoute === "register") {
      return (
        <RegisterScreen
          onNavigateLogin={() =>
            setAuthRoute("login")
          }
        />
      );
    }

    return (
      <LoginScreen
        onLoginSuccess={() => {
          setRoute("dashboard");
          setDrawerOpen(false);
          setSelectedJob(null);
        }}
        onNavigateRegister={() =>
          setAuthRoute("register")
        }
      />
    );
  }

  const drawerActiveKey =
    route === "details" ? detailsFrom : route;

  // 🔥 MAIN UI
  return (
    <>
      <SafeAreaView
        style={[styles.page, { backgroundColor: colors.pageBg }]}
        edges={["left", "right", "bottom"]} // 🚀 NO TOP
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
          behavior={
            Platform.OS === "ios" ? "padding" : undefined
          }
        >
        <View style={{ flex: 1 }}>{content}</View>

{/* 🔥 BOTTOM TAB */}
<BottomTabBar
  active={route === "details" ? detailsFrom : route}
  onChange={(key) => {
    setRoute(key);
    setSelectedJob(null);
    setDrawerOpen(false);
  }}
/>
        </KeyboardAvoidingView>

        {/* 🔥 DRAWER */}
        {drawerOpen && (
          <>
            {/* Overlay */}
            <Pressable
              style={styles.backdrop}
              onPress={() => setDrawerOpen(false)}
            />

            {/* Drawer */}
            <View
              style={[
                styles.drawerHost,
                { width: drawerWidth },
              ]}
            >
              <SideDrawer
                activeKey={drawerActiveKey}
                onNavigate={handleDrawerNavigate}
                onPressHome={goHome}
                onLogout={() => {
                  logout();
                  setAuthRoute("login");
                  setRoute("jobs");
                  setSelectedJob(null);
                  setDrawerOpen(false);
                }}
              />
            </View>
          </>
        )}
        </View>
      </SafeAreaView>

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
  main: {
  flex: 1,
   // 👈 prevents overlap
},

  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(15, 37, 71, 0.38)",
    zIndex: 999,
  },

  drawerHost: {
    position: "absolute",
    left: 0,
    top: 0,       // 🔥 THIS FIXES YOUR ISSUE
    bottom: 0,
    zIndex: 9999,
    elevation: 20,
    backgroundColor: "#fff",
  },
});