import { FirebaseOptions } from "expo-firebase-core";
import { ExpoConfig, ConfigContext } from 'expo/config';

const firebaseOptions: FirebaseOptions = {
  apiKey: "AIzaSyDHqLRCKFxccWdAX8NJpHRVPPqJXAgac8w",
  authDomain: "fir-expo-series-prep.firebaseapp.com",
  projectId: "fir-expo-series-prep",
  storageBucket: "fir-expo-series-prep.appspot.com",
  messagingSenderId: "500544743241",
  appId: "1:500544743241:web:5d424d480f14352cdf9c98"
};

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
      firebase: firebaseOptions,
    }
  }
});