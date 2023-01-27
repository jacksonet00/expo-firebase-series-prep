import { StatusBar } from 'expo-status-bar';
import { initializeApp } from "firebase/app";
import { Button, StyleSheet, Text, View } from 'react-native';
import Counter, { CounterData, CounterDocumentData, PartialCounterDocumentData } from "./components/Counter";
import { addDoc, collection, doc, getDocs, getFirestore, query, setDoc } from 'firebase/firestore';
import { useEffect, useState } from "react";
import * as FirebaseCore from 'expo-firebase-core';

initializeApp(
  FirebaseCore.DEFAULT_WEB_APP_OPTIONS as FirebaseCore.FirebaseOptions
);

export default function App() {
  const [counters, setCounters] = useState<CounterData[]>([]);
  const [loading, setLoading] = useState(true);

  async function refreshCounters() {
    setLoading(true);
    setCounters(await fetchCounters());
    setLoading(false);
  }

  useEffect(() => { refreshCounters(); }, []);

  async function decrement(counter: CounterData) {
    await setDoc(doc(getFirestore(), 'counters', counter.id), {
      count: Math.max(counter.count - 1, 0),
    } as PartialCounterDocumentData, {
      merge: true, // prevent this from causing future bugs
    });
    refreshCounters();
  }

  async function increment(counter: CounterData) {
    await setDoc(doc(getFirestore(), 'counters', counter.id), {
      count: counter.count + 1,
    } as PartialCounterDocumentData, {
      merge: true, // prevent this from causing future bugs
    });
    refreshCounters();
  }

  async function addCounter() {
    await addDoc(collection(getFirestore(), 'counters'), {
      count: 0,
    } as CounterDocumentData);
    refreshCounters();
  }

  async function fetchCounters(): Promise<CounterData[]> {
    const counterCollection =
      await getDocs(query(collection(getFirestore(), 'counters')));
    return counterCollection.docs.map((doc) => ({
      ...(doc.data() as CounterDocumentData),
      id: doc.id,
    }));
  }

  function render() {
    if (loading && !counters) {
      return (
        <Text>Loading...</Text>
      );
    }
    return (
      <>
        {counters.map((counter) => <Counter
          key={counter.id}
          count={counter.count}
          decrement={() => decrement(counter)}
          increment={() => increment(counter)}
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
