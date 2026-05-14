/** @type {import('expo/config').ExpoConfig} */
export default {
  name: "Rig World Jobs",
  slug: "rig-world-jobs",
  version: "1.0.0",
  scheme: "rigworldjobs",
  userInterfaceStyle: "light",

  androidStatusBar: {
    backgroundColor: "#ffffff",
    barStyle: "dark-content",
    translucent: false,
  },

  android: {
    package: "com.maramkalpana.rigworldjobs",
  },

  extra: {
    eas: {
      projectId: "f044d8c7-4aa3-4f57-bb3b-0fb1311b023e",
    },
  },
};