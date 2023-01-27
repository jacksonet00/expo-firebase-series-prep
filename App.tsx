import { StatusBar } from 'expo-status-bar';
import { initializeApp } from "firebase/app";
import { Button, StyleSheet, Text, View } from 'react-native';
import Counter, { CounterData, CounterDocumentData } from "./components/Counter";
import { firebaseConfig } from "./firebase";
import { collection, doc, getDocs, getFirestore, query } from 'firebase/firestore';
import { useEffect, useState } from "react";

initializeApp(firebaseConfig);

function decrement(id: string): void {

}

function increment(id: string): void {

}

function addCounter(): void {

}

async function fetchCounters(): Promise<CounterData[]> {
  const counterCollection =
    await getDocs(query(collection(getFirestore(), 'counters')));
  return counterCollection.docs.map((doc) => ({
    ...(doc.data() as CounterDocumentData),
    id: doc.id,
  }));
}


export default function App() {
  const [counters, setCounters] = useState<CounterData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const data = await fetchCounters();
      setCounters(data);
      setLoading(false);
    })();
  }, []);

  function render() {
    if (loading) {
      return (
        <Text>Loading...</Text>
      );
    }
    return (
      <>
        {counters.map(({ count, id }) => <Counter
          count={count}
          decrement={() => decrement(id)}
          increment={() => increment(id)}
        />)}
        <Button title="Add Counter" onPress={addCounter} />
      </>
    );
  }

  return (
    <View style={styles.container}>
      {render()}
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
