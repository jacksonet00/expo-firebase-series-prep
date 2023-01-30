import { useFirestoreDocumentDeletion, useFirestoreDocumentMutation } from "@react-query-firebase/firestore";
import { doc, FirestoreDataConverter, getFirestore, QueryDocumentSnapshot } from "firebase/firestore";
import { View, Text, StyleSheet, Button } from 'react-native';

export type CounterData = {
    id: string;
    count: number;
};

export const convertCounterData: FirestoreDataConverter<CounterData> = {
    toFirestore: ({ count }: CounterData): CounterDocumentData => ({
        count,
    }),
    fromFirestore: (doc: QueryDocumentSnapshot): CounterData => ({
        ...doc.data() as CounterDocumentData,
        id: doc.id,
    }),
};

export type CounterDocumentData = {
    count: number;
};

export const convertCounterDocumentData: FirestoreDataConverter<CounterDocumentData> = {
    toFirestore: ({ count }: CounterDocumentData): CounterDocumentData => ({
        count,
    }),
    fromFirestore: (doc: QueryDocumentSnapshot): CounterDocumentData => ({
        ...doc.data() as CounterDocumentData,
    }),
}

export type PartialCounterDocumentData = {
    count?: number;
}

interface CounterProps {
    counter: CounterData;
}

const Counter: React.FC<CounterProps> = ({
    counter,
}) => {
    const { id, count } = counter;

    const counterDocument = doc(getFirestore(), 'counters', id);

    const { mutate: updateCounter } = useFirestoreDocumentMutation<PartialCounterDocumentData>(
        counterDocument,
        {
            merge: true,
        }
    );

    const { mutate: deleteCounter } = useFirestoreDocumentDeletion(counterDocument);

    function handleIncrementCounter() {
        updateCounter({
            count: Math.max(0, count - 1),
        });
    }

    function handleDecrementCounter() {
        updateCounter({
            count: count + 1,
        });
    }

    function handleDeleteCounter() {
        deleteCounter();
    }

    return (
        <View style={styles.container}>
            <Button title="x" onPress={handleDeleteCounter} />
            <Text>{count}</Text>
            <Button title="-" onPress={handleDecrementCounter} />
            <Button title="+" onPress={handleIncrementCounter} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flexDirection: 'row',
    },
});

export default Counter;