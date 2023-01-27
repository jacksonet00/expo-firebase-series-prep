import { useFirestoreQuery, useFirestoreCollectionMutation } from "@react-query-firebase/firestore";
import * as FirebaseCore from 'expo-firebase-core';
import { query, collection, getFirestore } from "firebase/firestore";
import { Button, View, StyleSheet, Text } from "react-native";
import { StatusBar } from 'expo-status-bar';
import { QueryClientProvider, QueryClient } from "react-query";
import Counter, { CounterDocumentData, PartialCounterDocumentData } from "./components/Counter";
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
  const { data: counters, isLoading } = useFirestoreQuery(
    ['counters'],
    query(collection(getFirestore(), 'counters')),
    {
      subscribe: true,
    },
    {
      select: (snapshot) => snapshot.docs.map((doc) => ({
        ...doc.data() as CounterDocumentData,
        id: doc.id
      })),
    },
  );

  const { mutate: addCounter } = useFirestoreCollectionMutation(
    collection(getFirestore(), 'counters'),
  );

  function render() {
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
      <>
        {counters!.map((counter) => <Counter
          key={counter.id}
          counter={counter}
        />)}
        <Button title="Add Counter" onPress={() => addCounter({ count: 0 })} />
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
