import React from 'react';
import { View, Text, StyleSheet, Button, GestureResponderEvent } from 'react-native';


export type CounterData = {
    id: string;
    count: number;
};

export type CounterDocumentData = {
    count: number;
};

interface CounterProps {
    count: number;
    decrement: () => void;
    increment: () => void;
}

const Counter: React.FC<CounterProps> = ({
    count,
    decrement,
    increment
}) => {
    return (
        <View style={styles.container}>
            <Text>{count}</Text>
            <Button title="-" onPress={decrement} />
            <Button title="+" onPress={increment} />
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