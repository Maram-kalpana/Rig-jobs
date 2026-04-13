import React, { useMemo, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
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

export function RootNavigator() {
  const { currentUser, jobs, savedJobs, applications, profile, setProfile, logout, toggleSaveJob, applyForJob, isApplied, isSaved } = useApp();
  const [authRoute, setAuthRoute] = useState("register");
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [route, setRoute] = useState("jobs");
  const [selectedJob, setSelectedJob] = useState(null);

  const content = useMemo(() => {
    if (route === "details") {
      return (
        <JobDetailsScreen
          job={selectedJob}
          onBack={() => setRoute("jobs")}
          onApply={applyForJob}
          onSave={toggleSaveJob}
          applied={selectedJob ? isApplied(selectedJob.id) : false}
          saved={selectedJob ? isSaved(selectedJob.id) : false}
        />
      );
    }
    if (route === "dashboard") {
      return <DashboardScreen stats={{ applications: applications.length, saved: savedJobs.length }} onBrowseJobs={() => setRoute("jobs")} />;
    }
    if (route === "applications") {
      return <ApplicationsScreen applications={applications} onOpenJob={(job) => { setSelectedJob(job); setRoute("details"); }} />;
    }
    if (route === "saved") {
      return <SavedJobsScreen jobs={savedJobs} onOpenJob={(job) => { setSelectedJob(job); setRoute("details"); }} onToggleSave={toggleSaveJob} />;
    }
    if (route === "profile") {
      return <ProfileScreen profile={profile} setProfile={setProfile} />;
    }
    if (route === "settings") {
      return <SettingsScreen />;
    }
    return <JobsScreen jobs={jobs} onOpenJob={(job) => { setSelectedJob(job); setRoute("details"); }} onApply={applyForJob} onSave={toggleSaveJob} isApplied={isApplied} isSaved={isSaved} />;
  }, [route, selectedJob, applyForJob, toggleSaveJob, isApplied, isSaved, applications.length, savedJobs.length, applications, savedJobs, profile, setProfile, jobs]);

  if (!currentUser) {
    if (authRoute === "register") return <RegisterScreen onNavigateLogin={() => setAuthRoute("login")} />;
    return (
      <LoginScreen
        onLoginSuccess={() => {
          setRoute("dashboard");
          setDrawerOpen(true);
          setSelectedJob(null);
        }}
        onNavigateRegister={() => setAuthRoute("register")}
      />
    );
  }

  return (
    <View style={styles.page}>
      <BrandHeader onMenu={() => setDrawerOpen((v) => !v)} />
      <View style={styles.body}>
        <SideDrawer
          visible={drawerOpen}
          activeKey={route}
          onNavigate={(next) => setRoute(next)}
          onLogout={() => {
            logout();
            setAuthRoute("login");
            setRoute("jobs");
            setSelectedJob(null);
            setDrawerOpen(false);
          }}
        />
        <ScrollView style={styles.content} contentContainerStyle={{ padding: 12, paddingBottom: 24 }}>
          {content}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: colors.pageBg },
  body: { flex: 1, flexDirection: "row" },
  content: { flex: 1 },
});
