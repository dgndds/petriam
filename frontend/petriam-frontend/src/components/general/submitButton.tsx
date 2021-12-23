import React from 'react';
import { Text, Pressable, StyleSheet } from 'react-native';

export default function Login(props) {
    return (
        <Pressable style={styles.submit}>
            <Text style={styles.submitText}>{props.text}</Text>
        </Pressable>
    )
};

const styles = StyleSheet.create({
    submit: {
        borderRadius: 18,
        width: 369,
        height: 43,
        backgroundColor: '#D99E6A',
        alignSelf: 'center',
        justifyContent: 'center',
        marginTop: 20
      },
      submitText:{
        alignSelf: 'center',
      },
});