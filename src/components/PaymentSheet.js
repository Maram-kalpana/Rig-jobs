import React from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { colors } from "../theme";

const METHODS = [
  { key: "upi", label: "UPI", icon: "qr-code-2" },
  { key: "cards", label: "Cards", icon: "credit-card" },
  { key: "netbanking", label: "Netbanking", icon: "account-balance" },
  { key: "wallet", label: "Wallet", icon: "account-balance-wallet" },
  { key: "paylater", label: "Pay Later", icon: "schedule" },
];

export function PaymentSheet({
  visible,
  title = "Payment Options",
  amountText = "$5",
  amountHint,
  feeLabel = "Application Fee",
  onClose,
  onPay,
}) {
  const [selected, setSelected] = React.useState(METHODS[0].key);

  React.useEffect(() => {
    if (visible) setSelected(METHODS[0].key);
  }, [visible]);

  const selectedLabel = METHODS.find((m) => m.key === selected)?.label || "UPI";
  const isMethodsScreen = title === "Payment Options";
  const ctaText =
    title === "Payment Required"
      ? "Proceed to Payment"
      : title === "Payment"
        ? "Continue"
        : `Pay ${amountText}`;

  return (
    <Modal transparent visible={visible} animationType="slide" onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.sheet}>
              <View style={styles.header}>
                <Text style={styles.title}>{title}</Text>
                <Pressable onPress={onClose} hitSlop={10} style={styles.closeHit}>
                  <MaterialIcons name="close" size={20} color={colors.textSecondary} />
                </Pressable>
              </View>

              <View style={styles.amountCard}>
                <View>
                  <Text style={styles.amountLabel}>AMOUNT</Text>
                  <Text style={styles.amountValue}>{amountText}</Text>
                  {amountHint ? <Text style={styles.amountHint}>{amountHint}</Text> : null}
                </View>
              </View>

              {isMethodsScreen ? (
                <>
                  <Text style={styles.sectionLabel}>Choose a payment method</Text>
                  <View style={styles.methods}>
                    {METHODS.map((m) => {
                      const active = selected === m.key;
                      return (
                        <Pressable
                          key={m.key}
                          onPress={() => setSelected(m.key)}
                          style={[styles.method, active && styles.methodActive]}
                        >
                          <View style={[styles.methodIcon, active && styles.methodIconActive]}>
                            <MaterialIcons
                              name={m.icon}
                              size={18}
                              color={active ? colors.primary : colors.textSecondary}
                            />
                          </View>
                          <Text style={[styles.methodText, active && styles.methodTextActive]}>
                            {m.label}
                          </Text>
                          {active ? (
                            <MaterialIcons name="check-circle" size={18} color={colors.primary} />
                          ) : null}
                        </Pressable>
                      );
                    })}
                  </View>

                  <View style={styles.footerRow}>
                    <Text style={styles.selectedHint}>Selected: {selectedLabel}</Text>
                  </View>
                </>
              ) : null}

              <View style={styles.btnRow}>
                <Pressable style={[styles.btn, styles.btnPrimary]} onPress={() => onPay?.(selected)}>
                  <Text style={styles.btnPrimaryText}>{ctaText}</Text>
                </Pressable>
                <Pressable style={[styles.btn, styles.btnGhost]} onPress={onClose}>
                  <Text style={styles.btnGhostText}>Cancel</Text>
                </Pressable>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(15, 23, 42, 0.45)",
  },
  sheet: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    padding: 18,
    paddingBottom: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  title: { fontSize: 18, fontWeight: "900", color: colors.textPrimary },
  closeHit: { padding: 6, borderRadius: 10, backgroundColor: "#F3F6FB" },

  amountCard: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
    padding: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#F8FAFF",
    marginBottom: 14,
  },
  amountLabel: { fontSize: 12, fontWeight: "800", color: colors.textSecondary, letterSpacing: 0.6 },
  amountValue: { fontSize: 24, fontWeight: "900", color: colors.textPrimary, marginTop: 4 },
  amountHint: { marginTop: 2, fontSize: 12, color: colors.textSecondary },
  feePill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: colors.successBg,
    color: colors.success,
    overflow: "hidden",
    fontWeight: "900",
    fontSize: 12,
  },

  sectionLabel: { color: colors.textSecondary, fontSize: 12, fontWeight: "800", marginBottom: 10 },
  methods: { gap: 10 },
  method: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: "#fff",
    gap: 10,
  },
  methodActive: { borderColor: "#BBD2FF", backgroundColor: "#F2F7FF" },
  methodIcon: {
    width: 34,
    height: 34,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F3F6FB",
  },
  methodIconActive: { backgroundColor: "#E9F0FF" },
  methodText: { flex: 1, fontSize: 14, fontWeight: "800", color: colors.textPrimary },
  methodTextActive: { color: colors.primaryDark },

  footerRow: { marginTop: 10 },
  selectedHint: { color: colors.textSecondary, fontSize: 12, fontWeight: "700" },

  btnRow: { flexDirection: "row", gap: 12, marginTop: 14 },
  btn: { flex: 1, borderRadius: 14, paddingVertical: 12, alignItems: "center", justifyContent: "center" },
  btnPrimary: { backgroundColor: colors.primary },
  btnPrimaryText: { color: "#fff", fontWeight: "900", fontSize: 14 },
  btnGhost: { borderWidth: 1, borderColor: colors.border, backgroundColor: "#fff" },
  btnGhostText: { color: colors.textPrimary, fontWeight: "900", fontSize: 14 },
});

