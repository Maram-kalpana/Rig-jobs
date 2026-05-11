import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { BrandHeader } from "../components/BrandHeader";
import { InputField } from "../components/InputField";
import { PrimaryButton } from "../components/PrimaryButton";
import { ScreenSafeView } from "../components/ScreenSafeView";
import { useApp } from "../context/AppContext";
import { colors } from "../theme";

export function LoginScreen({ onLoginSuccess, onNavigateRegister }) {
  const { login } = useApp();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const submit = () => {
    const result = login({ email, password });
    if (!result.ok) setMessage(result.message);
    else onLoginSuccess();
  };

  return (
    <ScreenSafeView style={styles.safe}>
      <ScrollView style={styles.page} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.card}>
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.sub}>Sign in to your candidate account to continue</Text>
          <InputField label="Email Address" placeholder="you@example.com" value={email} onChangeText={setEmail} />
          <InputField label="Password" placeholder="Enter your password" value={password} onChangeText={setPassword} secureTextEntry />
          {!!message && <Text style={styles.message}>{message}</Text>}
          <PrimaryButton label="Sign In" onPress={submit} />
          <Text style={styles.switchText}>
            Don't have an account? <Text style={styles.link} onPress={onNavigateRegister}>Create Account</Text>
          </Text>
        </View>
      </ScrollView>
    </ScreenSafeView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.pageBg },
  page: { flex: 1 },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 12,
    paddingBottom: 32,
  },
  card: { borderRadius: 18, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.panel, padding: 14 },
  title: { color: colors.textPrimary, fontSize: 42 / 2, fontWeight: "800" },
  sub: { color: colors.textSecondary, fontSize: 17, marginVertical: 12 },
  message: { marginBottom: 10, color: "#A13B30", fontWeight: "600" },
  switchText: { textAlign: "center", color: colors.textSecondary, marginTop: 12, fontSize: 16 },
  link: { color: colors.primaryDark, fontWeight: "700" },
});
