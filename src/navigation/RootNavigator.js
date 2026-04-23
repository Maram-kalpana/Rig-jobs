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
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [route, setRoute] = useState("jobs");
  const [selectedJob, setSelectedJob] = useState(null);
  const [detailsFrom, setDetailsFrom] = useState("jobs");

  const drawerWidth = Math.min(width * 0.78, 320);

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
          onApply={applyForJob}
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
        onApply={applyForJob}
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
    applyForJob,
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
    <SafeAreaView
      style={[styles.page, { backgroundColor: colors.pageBg }]}
      edges={["left", "right", "bottom"]} // 🚀 NO TOP
    >
      <View style={styles.shell}>

        {/* HEADER */}
        <BrandHeader
          onMenu={() => setDrawerOpen((v) => !v)}
          onPressHome={goHome}
        />

        {/* CONTENT */}
        <KeyboardAvoidingView
          style={styles.keyboard}
          behavior={
            Platform.OS === "ios" ? "padding" : undefined
          }
        >
        <View style={styles.main}>{content}</View>

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
  paddingBottom: 70, // 👈 prevents overlap
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
});0