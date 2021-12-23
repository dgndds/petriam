import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image, TextInput, Button, Pressable } from 'react-native';
import SubmitButton from '../../components/general/submitButton'

export default function Login() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.logoContainer}>
          <Image 
            style={styles.logo} 
            source={require('../../../assets/favicon.png')}
          />
        </View>
        <View style={styles.welcome}>
          <Text>
            HELLO
          </Text>
          <Text>
            welcome back!
          </Text>
          <View
            style={styles.line}
          />
          <Text>
            LOGIN
          </Text>
        </View>
        <View style={styles.form}>
          <TextInput style={styles.box}>
            
          </TextInput>
          <TextInput style={styles.box}>
            
          </TextInput>
          <Text style={styles.forgot}>
            Forgot Your Password?
            </Text>
        </View>
        <View style={styles.submitButton}>
          <SubmitButton text="LOGIN" />
          <Text style={styles.or}>
            or
          </Text>
          <Text style={styles.signup}>
            Sign up to Petriam
          </Text>
        </View>
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Petriam 2021 All Rights Reserved
          </Text>
        </View>
      </SafeAreaView>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F2F2F2',
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
    welcome: {
      flex: 2,
      justifyContent: 'center',
      paddingHorizontal: 10
    },
    line: {
      borderBottomColor: 'black',
      borderBottomWidth: 1,
    },
    form: {
      flex: 2,
      justifyContent: 'center',
      alignItems: 'center',
    },
    box: {
      backgroundColor: 'white',
      borderRadius: 18,
      width: 369,
      height: 43,
      alignSelf: 'center',
      marginTop: 10
    },
    forgot: {
      alignSelf: 'flex-end',
      marginRight: 12,
      marginTop: 10,
      textDecorationLine: 'underline'
    },
    submitButton: {
      flex: 2,
      alignItems: 'center'
    },
    or: {
      marginVertical: 20
    },
    signup: {
      textDecorationLine: 'underline'
    },
    footer: {
      flex: 1,
      justifyContent: 'flex-end',
    },
    footerText: {
      alignSelf: 'center',
      marginBottom: 10
    }
  });
  