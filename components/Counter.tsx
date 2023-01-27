import { useFirestoreDocumentDeletion, useFirestoreDocumentMutation } from "@react-query-firebase/firestore";
import { doc, getFirestore } from "firebase/firestore";
import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

export type CounterData = {
    id: string;
    count: number;
};

export type CounterDocumentData = {
    count: number;
};

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

    const { mutate } = useFirestoreDocumentMutation(
        counterDocument,
        {
            merge: true,
        }
    );

    const { mutate: remove } = useFirestoreDocumentDeletion(counterDocument);

    return (
        <View style={styles.container}>
            <Button title="x" onPress={() => remove()} />
            <Text>{count}</Text>
            <Button title="-" onPress={() => mutate({
                count: Math.max(0, count - 1)
            })} />
            <Button title="+" onPress={() => mutate({ count: count + 1 })} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
        flexDirection: 'row',
    },
});

export default Counter;