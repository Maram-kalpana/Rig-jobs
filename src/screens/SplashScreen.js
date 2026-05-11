import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, View, Image, Text } from "react-native";

export function SplashScreen({ onDone, durationMs = 3000 }) {
  const spin = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.timing(spin, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      })
    );

    loop.start();

    const t = setTimeout(() => {
      onDone?.();
    }, durationMs);

    return () => {
      clearTimeout(t);
      loop.stop();
    };
  }, [durationMs, onDone, spin]);

  const rotate = spin.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View style={styles.page}>
      <Animated.View style={{ transform: [{ rotate }] }}>
        <Image
          source={require("../assets/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </Animated.View>
      <Text style={styles.footer}>Made with ❤ in India</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 140,
    height: 140,
  },
  footer: {
    position: "absolute",
    bottom: 32,
    color: "rgba(17,42,74,0.55)",
    fontWeight: "600",
  },
});

