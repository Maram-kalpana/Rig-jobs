import React, { createContext, useContext, useMemo, useState } from "react";
import { jobsSeed } from "../data/jobs";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [jobs] = useState(jobsSeed);

  const value = useMemo(() => ({ jobs }), [jobs]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside AppProvider.");
  return ctx;
}