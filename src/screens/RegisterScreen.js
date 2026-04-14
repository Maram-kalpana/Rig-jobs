import React, { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { InputField } from "../components/InputField";
import { PrimaryButton } from "../components/PrimaryButton";
import { BrandHeader } from "../components/BrandHeader";
import { ScreenSafeView } from "../components/ScreenSafeView";
import { colors } from "../theme";
import { useApp } from "../context/AppContext";

export function RegisterScreen({ onNavigateLogin }) {
  const { register } = useApp();
  const [form, setForm] = useState({ fullName: "", email: "", password: "", confirm: "", agreed: false });
  const [message, setMessage] = useState("");

  const update = (key, value) => setForm((old) => ({ ...old, [key]: value }));

  const submit = () => {
    if (form.password !== form.confirm) {
      setMessage("Passwords do not match.");
      return;
    }
    if (!form.agreed) {
      setMessage("Please agree to terms and privacy policy.");
      return;
    }
    const res = register(form);
    if (!res.ok) setMessage(res.message);
    else {
      setMessage("Registration successful. Please sign in.");
      onNavigateLogin();
    }
  };

  return (
    <ScreenSafeView style={styles.safe}>
      <ScrollView style={styles.page} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <BrandHeader />
        <View style={styles.card}>
          <Text style={styles.title}>Create Your Account</Text>
          <Text style={styles.sub}>Start your career journey today - it is free</Text>
          <InputField label="Full Name" placeholder="John Doe" value={form.fullName} onChangeText={(v) => update("fullName", v)} />
          <InputField label="Email Address" placeholder="you@example.com" value={form.email} onChangeText={(v) => update("email", v)} />
          <InputField label="Password" placeholder="Create a password" value={form.password} onChangeText={(v) => update("password", v)} secureTextEntry />
          <InputField label="Confirm Password" placeholder="Confirm your password" value={form.confirm} onChangeText={(v) => update("confirm", v)} secureTextEntry />
          <Pressable style={styles.agree} onPress={() => update("agreed", !form.agreed)}>
            <View style={[styles.checkbox, form.agreed && styles.checked]} />
            <Text style={styles.agreeText}>I agree to Terms of Service and Privacy Policy</Text>
          </Pressable>
          {!!message && <Text style={styles.message}>{message}</Text>}
          <PrimaryButton label="Create Account" onPress={submit} />
          <Text style={styles.switchText}>
            Already have an account? <Text style={styles.link} onPress={onNavigateLogin}>Sign In</Text>
          </Text>
        </View>
      </ScrollView>
    </ScreenSafeView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.pageBg },
  page: { flex: 1 },
  scrollContent: { paddingBottom: 32 },
  card: { margin: 12, borderRadius: 18, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.panel, padding: 14 },
  title: { color: colors.textPrimary, fontSize: 40 / 2, fontWeight: "800" },
  sub: { color: colors.textSecondary, fontSize: 17, marginVertical: 10 },
  agree: { flexDirection: "row", gap: 10, alignItems: "flex-start", marginBottom: 10 },
  checkbox: { width: 20, height: 20, borderWidth: 1, borderColor: "#9BB0CC", borderRadius: 4, backgroundColor: "#FFF", marginTop: 3 },
  checked: { backgroundColor: colors.primary, borderColor: colors.primary },
  agreeText: { flex: 1, color: colors.textSecondary, fontSize: 16, lineHeight: 22 },
  message: { marginBottom: 10, color: "#A13B30", fontWeight: "600" },
  switchText: { textAlign: "center", color: colors.textSecondary, marginTop: 12, fontSize: 16 },
  link: { color: colors.primaryDark, fontWeight: "700" },
});
