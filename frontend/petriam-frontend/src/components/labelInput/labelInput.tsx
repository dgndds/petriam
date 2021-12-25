import React from 'react';
import { StyleSheet, Text, View, Image, TextInput } from 'react-native';

export default function LbelInput(props) {
    return (
        <View>
            <Text style={styles.formText}>{props.text}</Text>
            <TextInput style={styles.box} >
                
            </TextInput>
        </View>
    )
};

const styles = StyleSheet.create({
    formText:{
        marginLeft: 20,
        marginTop: 20
    },
    box: {
        backgroundColor: 'white',
        borderRadius: 18,
        width: 369,
        height: 43,
        alignSelf: 'center',
        marginTop: 10
    },
});