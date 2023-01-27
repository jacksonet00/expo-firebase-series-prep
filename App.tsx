import { StatusBar } from 'expo-status-bar';
import { initializeApp } from "firebase/app";
import { StyleSheet, Text, View } from 'react-native';
import { firebaseConfig } from "./firebase";

initializeApp(firebaseConfig);

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
