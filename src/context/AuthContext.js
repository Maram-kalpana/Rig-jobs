import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useCallback,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// ─────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────
const USERS_KEY = "@rig_auth_users";
const SESSION_KEY = "@rig_auth_session";

const defaultProfile = {
  fullName: "",
  jobTitle: "",
  email: "",
  phone: "",
  location: "",
  openToWork: true,
};

// ─────────────────────────────────────────────
// CONTEXT
// ─────────────────────────────────────────────
const AuthContext = createContext(null);

// ─────────────────────────────────────────────
// PROVIDER
// ─────────────────────────────────────────────
export function AuthProvider({ children }) {
  const [users, setUsers] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [pendingAction, setPendingAction] = useState(null);

  // ── Load persisted data on mount ──────────
  useEffect(() => {
    const load = async () => {
      try {
        const [rawUsers, rawSession] = await Promise.all([
          AsyncStorage.getItem(USERS_KEY),
          AsyncStorage.getItem(SESSION_KEY),
        ]);
        if (rawUsers) setUsers(JSON.parse(rawUsers));
        if (rawSession) setCurrentUserId(rawSession);
      } catch {
        // silent fail
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, []);

  // ── Persist users ─────────────────────────
  useEffect(() => {
    if (!isLoading) {
      AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));
    }
  }, [users, isLoading]);

  // ── Persist session ───────────────────────
  useEffect(() => {
    if (!isLoading) {
      if (currentUserId) {
        AsyncStorage.setItem(SESSION_KEY, currentUserId);
      } else {
        AsyncStorage.removeItem(SESSION_KEY);
      }
    }
  }, [currentUserId, isLoading]);

  // ── Derived: current user ─────────────────
  const currentUser = useMemo(
    () => users.find((u) => u.id === currentUserId) || null,
    [users, currentUserId]
  );

  const isAuthenticated = !!currentUser;

  // ── Register ──────────────────────────────
  const register = useCallback(({ fullName, email, password }) => {
    if (!fullName || !email || !password) {
      return { ok: false, message: "Please complete all fields." };
    }

    // Password strength validation
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~]/.test(password);
    if (!hasUpper || !hasLower || !hasNumber || !hasSpecial) {
      return {
        ok: false,
        message:
          "Password must include uppercase, lowercase, a number, and a special character.",
      };
    }

    const exists = users.some(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );
    if (exists) {
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
  }, [users]);

  // ── Login ─────────────────────────────────
  const login = useCallback(
    ({ email, password }) => {
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
    },
    [users]
  );

  // ── Logout ────────────────────────────────
  const logout = useCallback(() => {
    setCurrentUserId(null);
    setPendingAction(null);
  }, []);

  // ── Update user data ──────────────────────
  const updateUser = useCallback(
    (updatedData) => {
      setUsers((prev) =>
        prev.map((u) =>
          u.id === currentUserId ? { ...u, ...updatedData } : u
        )
      );
    },
    [currentUserId]
  );

  // ── Profile ───────────────────────────────
  const profile = currentUser?.profile || defaultProfile;

  const setProfile = useCallback(
    (newProfile) => {
      updateUser({ profile: newProfile });
    },
    [updateUser]
  );

  // ── Job actions (per user) ────────────────
  const toggleSaveJob = useCallback(
    (jobId) => {
      if (!currentUser) return;
      const updated = currentUser.savedJobIds.includes(jobId)
        ? currentUser.savedJobIds.filter((id) => id !== jobId)
        : [...currentUser.savedJobIds, jobId];
      updateUser({ savedJobIds: updated });
    },
    [currentUser, updateUser]
  );

  const applyForJob = useCallback(
    (jobId) => {
      if (!currentUser) return;
      if (currentUser.applicationIds.includes(jobId)) return;
      updateUser({
        applicationIds: [...currentUser.applicationIds, jobId],
      });
    },
    [currentUser, updateUser]
  );

  // ── Context value ─────────────────────────
  const value = useMemo(
    () => ({
      // Auth state
      currentUser,
      isAuthenticated,
      isLoading,
      pendingAction,
      setPendingAction,
      clearPendingAction: () => setPendingAction(null),

      // Auth actions
      register,
      login,
      logout,

      // Profile
      profile,
      setProfile,

      // Job actions
      toggleSaveJob,
      applyForJob,
    }),
    [
      currentUser,
      isAuthenticated,
      isLoading,
      pendingAction,
      setPendingAction,
      register,
      login,
      logout,
      profile,
      setProfile,
      toggleSaveJob,
      applyForJob,
    ]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// ─────────────────────────────────────────────
// HOOK
// ─────────────────────────────────────────────
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}