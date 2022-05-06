import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import SubmitButton from '../../components/general/submitButton'
import AppLoading from 'expo-app-loading';
import { useFonts, PlayfairDisplay_700Bold, PlayfairDisplay_400Regular, PlayfairDisplay_800ExtraBold, PlayfairDisplay_700Bold_Italic, PlayfairDisplay_500Medium } from "@expo-google-fonts/playfair-display"
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { loginUser } from '../../api/RestApiFunctions';
import { connect, useSelector, useDispatch } from 'react-redux';
import { changeToken } from '../../redux/actions/token';
import { changeId } from '../../redux/actions/userId';
import { bindActionCreators } from 'redux';
import * as tokenActionCreators from '../../redux/actions/token'
import * as userActionCreators from '../../redux/actions/userId'
import { ScrollView } from 'react-native-gesture-handler';

export default function Login({ navigation }) {
  let [fontsLoaded, err] = useFonts({
    PlayfairDisplay_700Bold,
    PlayfairDisplay_400Regular,
    PlayfairDisplay_800ExtraBold,
    PlayfairDisplay_700Bold_Italic,
    PlayfairDisplay_500Medium
  })
 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const state = useSelector(state => state);
  const dispatch = useDispatch();
  const {changeToken} = bindActionCreators(tokenActionCreators, dispatch);
  const {changeId} = bindActionCreators(userActionCreators, dispatch);
  
  useEffect(() => {
  }, [])

  if (!fontsLoaded) {
    return <AppLoading />
  }


  const goToSignUp = () => {
    navigation.push("SignUp");
  }

  const submitFunction = async () => {
    let info = {};

    if (email && password) {
      info = await loginUser(email, password);
    }
    
    if(info.token.length > 0 && info.userId !==  "-1"){
      changeToken(info.token);
      changeId(info.userId);
      navigation.push("Main");
    }else{
      alert("Invalid email or password");
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{
        paddingTop:80
      }}>
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require('../../../assets/logo.png')}
        />
      </View>
      <View style={styles.welcome}>
        <Text style={styles.mainTitle}>
          PETRIAM
        </Text>
        <Text style={styles.subTitle}>
          welcome back!
        </Text>
        <View
          style={styles.line}
        />
        <Text style={styles.loginTitle}>
          LOGIN
        </Text>
      </View>
      <View style={styles.form}>
        <TextInput style={styles.box} value={email} onChangeText={setEmail} placeholder='Type Your Email'  autoCapitalize='none'>

        </TextInput>
        <TextInput style={styles.box} value={password} onChangeText={setPassword} placeholder='Type Your Password' secureTextEntry={true}>

        </TextInput>
        <Text style={styles.forgot}>
          Forgot Your Password?
        </Text>
      </View>
      <View style={styles.submitButton}>
        <SubmitButton text="LOGIN" submitFunction={submitFunction}/>
        <Text style={styles.or}>
          or
        </Text>
        <Text style={styles.signup} onPress={goToSignUp}>
          Sign up to Petriam
        </Text>
      </View>
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Petriam 2021 All Rights Reserved
        </Text>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS === 'android' ? 25 : 0,
    backgroundColor: '#F2F2F2',
  },
  logoContainer: {
    flex: 2,
    justifyContent: 'center'
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginBottom:15
  },
  welcome: {
    flex: 2,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  mainTitle: {
    fontFamily: "PlayfairDisplay_800ExtraBold",
    fontSize: 50,
    color: "#707070"
  },
  subTitle: {
    fontFamily: "PlayfairDisplay_700Bold_Italic",
    fontSize: 25,
    color: "#707070"
  },
  loginTitle: {
    fontFamily: "PlayfairDisplay_700Bold",
    fontSize: 25,
    color: "#707070"
  },
  line: {
    borderBottomColor: '#707070',
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
    marginTop: 10,
    paddingLeft:15
  },
  forgot: {
    alignSelf: 'flex-end',
    marginRight: 12,
    marginTop: 10,
    textDecorationLine: 'underline',
    fontFamily: "PlayfairDisplay_500Medium",
    color: "#707070",
    fontSize: 10,
  },
  submitButton: {
    flex: 2,
    alignItems: 'center'
  },
  or: {
    marginVertical: 20,
    fontFamily: "PlayfairDisplay_400Regular",
    fontSize: 10
  },
  signup: {
    textDecorationLine: 'underline',
    fontFamily: "PlayfairDisplay_700Bold",
    fontSize: 15,
    color: "black"
  },
  footer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  footerText: {
    alignSelf: 'center',
    marginBottom: 10,
    fontFamily: "PlayfairDisplay_700Bold",
    fontSize: 10,
    color: "#707070"
  }
});
