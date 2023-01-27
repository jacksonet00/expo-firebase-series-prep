import { StatusBar } from 'expo-status-bar';
import { initializeApp } from "firebase/app";
import { Button, StyleSheet, View } from 'react-native';
import Counter from "./components/Counter";
import { firebaseConfig } from "./firebase";

initializeApp(firebaseConfig);

function decrement(id: string): void {

}

function increment(id: string): void {

}

function addCounter(): void {

}

export default function App() {
  const counters = [
    {
      id: 'a',
      count: 0,
    },
    {
      id: 'b',
      count: 0,
    }
  ];

  return (
    <View style={styles.container}>
      {counters.map(({ count, id }) => <Counter
        count={count}
        decrement={() => decrement(id)}
        increment={() => increment(id)}
      />)}
      <Button title="Add Counter" onPress={addCounter} />
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
