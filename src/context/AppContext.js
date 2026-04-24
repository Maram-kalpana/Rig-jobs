import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jobsSeed } from "../data/jobs";

const AppContext = createContext(null);

const defaultProfile = {
  fullName: "",
  jobTitle: "",
  email: "",
  phone: "",
  location: "",
  openToWork: true,
};

export function AppProvider({ children }) {
  const [users, setUsers] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [jobs] = useState(jobsSeed);

  // 🔹 Load users from storage
  useEffect(() => {
    const loadData = async () => {
      const storedUsers = await AsyncStorage.getItem("users");
      const storedUserId = await AsyncStorage.getItem("currentUserId");

      if (storedUsers) setUsers(JSON.parse(storedUsers));
      if (storedUserId) setCurrentUserId(storedUserId);
    };

    loadData();
  }, []);

  // 🔹 Save users
  useEffect(() => {
    AsyncStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  // 🔹 Save logged in user
  useEffect(() => {
    if (currentUserId) {
      AsyncStorage.setItem("currentUserId", currentUserId);
    } else {
      AsyncStorage.removeItem("currentUserId");
    }
  }, [currentUserId]);

  // 🔹 Current user
  const currentUser = useMemo(
    () => users.find((u) => u.id === currentUserId) || null,
    [users, currentUserId]
  );

  // ===============================
  // ✅ REGISTER
  // ===============================
  const register = ({ fullName, email, password }) => {
    if (!fullName || !email || !password) {
      return { ok: false, message: "Please complete all fields." };
    }

    if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
      return { ok: false, message: "Email already exists." };
    }

    const newUser = {
      id: `user-${Date.now()}`,
      fullName,
      email,
      password,
      profile: { ...defaultProfile, fullName, email },
      savedJobIds: [],
      applicationIds: [],
    };

    setUsers((prev) => [...prev, newUser]);

    return { ok: true };
  };

  // ===============================
  // ✅ LOGIN
  // ===============================
  const login = ({ email, password }) => {
    const found = users.find(
      (u) =>
        u.email.toLowerCase() === email.toLowerCase() &&
        u.password === password
    );

    if (!found) {
      return { ok: false, message: "Invalid email or password." };
    }

    setCurrentUserId(found.id);
    return { ok: true };
  };

  // ===============================
  // ✅ LOGOUT
  // ===============================
  const logout = () => {
    setCurrentUserId(null);
  };

  // ===============================
  // ✅ UPDATE USER DATA
  // ===============================
  const updateUser = (updatedData) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === currentUserId ? { ...u, ...updatedData } : u
      )
    );
  };

  // ===============================
  // ✅ PROFILE
  // ===============================
  const profile = currentUser?.profile || defaultProfile;

  const setProfile = (newProfile) => {
    updateUser({ profile: newProfile });
  };

  // ===============================
  // ✅ JOB ACTIONS (PER USER)
  // ===============================
  const toggleSaveJob = (jobId) => {
    if (!currentUser) return;

    const updated = currentUser.savedJobIds.includes(jobId)
      ? currentUser.savedJobIds.filter((id) => id !== jobId)
      : [...currentUser.savedJobIds, jobId];

    updateUser({ savedJobIds: updated });
  };

  const applyForJob = (jobId) => {
    if (!currentUser) return;

    if (currentUser.applicationIds.includes(jobId)) return;

    updateUser({
      applicationIds: [...currentUser.applicationIds, jobId],
    });
  };

  // ===============================
  // ✅ DERIVED DATA
  // ===============================
  const savedJobs = jobs.filter((j) =>
    currentUser?.savedJobIds?.includes(j.id)
  );

  const applications = jobs.filter((j) =>
    currentUser?.applicationIds?.includes(j.id)
  );

  const isSaved = (jobId) =>
    currentUser?.savedJobIds?.includes(jobId);

  const isApplied = (jobId) =>
    currentUser?.applicationIds?.includes(jobId);

  return (
    <AppContext.Provider
      value={{
        currentUser,
        jobs,
        profile,
        setProfile,
        register,
        login,
        logout,
        savedJobs,
        applications,
        toggleSaveJob,
        applyForJob,
        isSaved,
        isApplied,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside AppProvider.");
  return ctx;
}