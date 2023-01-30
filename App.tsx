import { useFirestoreCollectionMutation, useFirestoreQueryData } from "@react-query-firebase/firestore";
import * as FirebaseCore from 'expo-firebase-core';
import { query, collection, getFirestore } from "firebase/firestore";
import { Button, View, StyleSheet, Text } from "react-native";
import { StatusBar } from 'expo-status-bar';
import { QueryClientProvider, QueryClient } from "react-query";
import Counter, { convertCounterData, convertCounterDocumentData, CounterData, CounterDocumentData } from "./components/Counter";
import { initializeApp } from 'firebase/app'

initializeApp(
  FirebaseCore.DEFAULT_WEB_APP_OPTIONS as FirebaseCore.FirebaseOptions
);

export default function Providers() {
  return (
    <QueryClientProvider client={new QueryClient()} >
      <App />
    </QueryClientProvider>
  );
}

function App() {
  const counterCollection = collection(getFirestore(), 'counters');

  const { data: counters, isLoading, isError } = useFirestoreQueryData<CounterData>(
    ['counters'],
    query(counterCollection.withConverter<CounterData>(convertCounterData)),
    {
      subscribe: true,
    },
  );

  const { mutate: addCounter } = useFirestoreCollectionMutation(
    counterCollection.withConverter<CounterDocumentData>(convertCounterDocumentData));

  function handleAddCounter() {
    addCounter({
      count: 0,
    });
  }

  if (isError) {
    return (
      <Text>Error!</Text>
    );
  }

  if (isLoading) {
    return (
      <Text>Loading...</Text>
    );
  }

  if (!counters) {
    return (
      <Text>No Counters.</Text>
    );
  }

  return (
    <View style={styles.container}>
      {counters!.map((counter) => <Counter
        key={counter.id}
        counter={counter}
      />)}
      <Button title="Add Counter" onPress={handleAddCounter} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
