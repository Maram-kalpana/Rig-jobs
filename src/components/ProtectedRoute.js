import React, { useCallback } from "react";
import { useAuth } from "../context/AuthContext";

/**
 * ProtectedRoute — wraps any component that requires authentication.
 *
 * If the user is not logged in, it stores the intended action in
 * `pendingAction` so the app can redirect back after login.
 *
 * Usage:
 *   <ProtectedRoute
 *     action={{ type: "viewJobDetails", payload: { jobId: "123" } }}
 *     onAuthenticated={() => navigation.navigate("JobDetails")}
 *   >
 *     <YourComponent />
 *   </ProtectedRoute>
 *
 * Or as a function:
 *   const { requireAuth } = useAuth();
 *   requireAuth({ type: "applyJob", payload: { jobId } }, () => {
 *     // proceed with protected action
 *   });
 */
export function ProtectedRoute({ children, action, onAuthenticated }) {
  const { isAuthenticated, setPendingAction } = useAuth();

  const handlePress = useCallback(() => {
    if (!isAuthenticated) {
      // Store the action they were trying to perform
      setPendingAction(action || { type: "unknown" });
      // The navigator will detect this and redirect to Login
      return;
    }
    onAuthenticated?.();
  }, [isAuthenticated, action, onAuthenticated, setPendingAction]);

  // If the user is already authenticated, render children normally
  if (isAuthenticated) {
    return <>{children}</>;
  }

  // Clone the child and inject an `onPress` that triggers auth gate
  if (!React.isValidElement(children)) return null;

  return React.cloneElement(children, {
    onPress: handlePress,
  });
}

/**
 * Hook-based alternative — returns a `requireAuth` function.
 */
export function useProtectedAction() {
  const { isAuthenticated, setPendingAction } = useAuth();

  const requireAuth = useCallback(
    (action, callback) => {
      if (!isAuthenticated) {
        setPendingAction(action || { type: "unknown" });
        return;
      }
      callback?.();
    },
    [isAuthenticated, setPendingAction]
  );

  return { requireAuth };
}