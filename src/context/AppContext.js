import React, { createContext, useContext, useMemo, useState } from "react";
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
  const [savedJobIds, setSavedJobIds] = useState([]);
  const [applicationIds, setApplicationIds] = useState([]);
  const [profile, setProfile] = useState(defaultProfile);

  const currentUser = useMemo(() => users.find((u) => u.id === currentUserId) || null, [users, currentUserId]);

  const register = ({ fullName, email, password }) => {
    if (!fullName || !email || !password) return { ok: false, message: "Please complete all fields." };
    if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
      return { ok: false, message: "Email already exists." };
    }
    const id = `user-${Date.now()}`;
    setUsers((prev) => [...prev, { id, fullName, email, password }]);
    return { ok: true };
  };

  const login = ({ email, password }) => {
    const found = users.find((u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
    if (!found) return { ok: false, message: "Invalid email or password." };
    setCurrentUserId(found.id);
    setProfile((old) => ({ ...old, fullName: found.fullName, email: found.email }));
    return { ok: true };
  };

  const logout = () => {
    setCurrentUserId(null);
    setSavedJobIds([]);
    setApplicationIds([]);
  };

  const toggleSaveJob = (jobId) => {
    setSavedJobIds((prev) => (prev.includes(jobId) ? prev.filter((id) => id !== jobId) : [...prev, jobId]));
  };

  const applyForJob = (jobId) => {
    setApplicationIds((prev) => (prev.includes(jobId) ? prev : [...prev, jobId]));
  };

  const savedJobs = jobs.filter((j) => savedJobIds.includes(j.id));
  const applications = jobs.filter((j) => applicationIds.includes(j.id));
  const isSaved = (jobId) => savedJobIds.includes(jobId);
  const isApplied = (jobId) => applicationIds.includes(jobId);

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
