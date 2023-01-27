import { ExpoConfig, ConfigContext } from 'expo/config';
import { firebaseConfig } from "./firebase";

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: "expo-firebase-series-prep",
  slug: "expo-firebase-series-prep",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/icon.png",
  userInterfaceStyle: "light",
  splash: {
    image: "./assets/splash.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff"
  },
  updates: {
    fallbackToCacheTimeout: 0
  },
  assetBundlePatterns: [
    "**/*"
  ],
  ios: {
    supportsTablet: true
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor: "#FFFFFF"
    }
  },
  web: {
    favicon: "./assets/favicon.png",
    config: {
      firebase: firebaseConfig,
    }
  }
});