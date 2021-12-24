import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image, TextInput } from 'react-native';
import SubmitButton from '../../components/general/submitButton'
import { Icon } from 'react-native-elements'
import AppLoading from 'expo-app-loading';
import {useFonts, PlayfairDisplay_700Bold,PlayfairDisplay_400Regular,PlayfairDisplay_800ExtraBold } from "@expo-google-fonts/playfair-display"

export default function SignUp() {
    let [fontsLoaded,err] = useFonts({
        PlayfairDisplay_700Bold,
        PlayfairDisplay_400Regular,
        PlayfairDisplay_800ExtraBold
    })

    if(!fontsLoaded){
        return <AppLoading/>
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.logoContainer}>
                <Icon 
                    name='chevron-left'
                    style={styles.back}
                    size={50}
                    color= '#707070'
                />
                <Image
                    style={styles.logo}
                    source={require('../../../assets/favicon.png')}
                />
            </View>
            <View style={styles.register}>
                <Text style={styles.registerText}>Register</Text>
            </View>
            <View style={styles.form}>
                <Text style={styles.formText}>Username</Text>
                <TextInput style={styles.box}>
                
                </TextInput>
                <Text style={styles.formText}>Email</Text>
                <TextInput style={styles.box}>
                
                </TextInput>
                <Text style={styles.formText}>Password</Text>
                <TextInput style={styles.box}>
                
                </TextInput>
                <Text style={styles.formText}>Password Again</Text>
                <TextInput style={styles.box}>
                
                </TextInput>
            </View>
            <View style={styles.submit}>
                <SubmitButton text="SIGN UP"></SubmitButton>
            </View>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F2F2',
    },
    back: {
        alignSelf: 'flex-start',
    },
    logoContainer: {
        flex: 2,
        justifyContent: 'center'
    },
    logo: {
        width: 50,
        height: 50,
        alignSelf: 'center'
    },
    register: {
        flex: 1,
    },
    registerText: {
        marginLeft: 15,
        fontSize:40,
        fontFamily: "PlayfairDisplay_700Bold",
        color:"#707070"
    },
    form:{
        flex: 5
    },
    formText:{
        marginLeft: 20,
        marginTop: 20,
        fontSize:15,
        fontFamily: "PlayfairDisplay_400Regular",
        color:"#707070"
    },
    box: {
        backgroundColor: 'white',
        borderRadius: 18,
        width: 369,
        height: 43,
        alignSelf: 'center',
        marginTop: 10
    },
    submit: {
        flex: 2,
    }
});