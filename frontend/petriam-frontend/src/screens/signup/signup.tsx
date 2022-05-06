import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image, TextInput, Pressable } from 'react-native';
import SubmitButton from '../../components/general/submitButton'
import { Icon } from 'react-native-elements'
import LabelInput from '../../components/labelInput/labelInput';
import AppLoading from 'expo-app-loading';
import { useFonts, PlayfairDisplay_700Bold, PlayfairDisplay_400Regular, PlayfairDisplay_800ExtraBold } from "@expo-google-fonts/playfair-display"
import { signUpNewUser } from '../../api/RestApiFunctions';
import { ScrollView } from 'react-native-gesture-handler';

export default function SignUp({ navigation }) {
    //For Fonts
    let [fontsLoaded, err] = useFonts({
        PlayfairDisplay_700Bold,
        PlayfairDisplay_400Regular,
        PlayfairDisplay_800ExtraBold
    })

    //Variables For Signing Up
    const [username, setUsername] = useState('');
    const [userSurname, setuserSurname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordAgain, setPasswordAgain] = useState('');
    const [canBeReturned, setCanBeReturned] = useState(false);

    if (!fontsLoaded) {
        return <AppLoading />
    }

    const submitFunction = async () => {
        let result: boolean = false;

        if (username && userSurname && email && (password == passwordAgain)) {
            console.log(username, email, password);
            result = await signUpNewUser(username,userSurname, email, password);
        }
        
        if(result){
            setCanBeReturned(result);
            await new Promise(f => setTimeout(f, 3000));
            navigation.goBack();
        }
    }

    const returnLogin = () => {
        navigation.goBack();
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={{
                paddingBottom:30
            }}>
                <View style={styles.logoContainer}>
                    <Icon
                        name='chevron-left'
                        style={styles.back}
                        size={50}
                        color='#707070'
                        onPress={() => navigation.goBack()}
                    />
                    <Image
                    style={styles.logo}
                    source={require('../../../assets/logo.png')}
                    />
                </View>
                <View style={styles.register}>
                    <Text style={styles.registerText}>Register</Text>
                </View>
                <View style={styles.form}>
                    <View>
                        <Text style={styles.formText}>Your Name</Text>
                        <TextInput style={styles.box} value={username} onChangeText={setUsername}>

                        </TextInput>
                    </View>
                    <View>
                        <Text style={styles.formText}>Your Surname</Text>
                        <TextInput style={styles.box} value={userSurname} onChangeText={setuserSurname}>

                        </TextInput>
                    </View>
                    <View>
                        <Text style={styles.formText}>Email</Text>
                        <TextInput style={styles.box} value={email} onChangeText={setEmail} autoCapitalize='none'>

                        </TextInput>
                    </View>
                    <View>
                        <Text style={styles.formText}>Password</Text>
                        <TextInput style={styles.box} value={password} onChangeText={setPassword} secureTextEntry={true}>

                        </TextInput>
                    </View>
                    <View>
                        <Text style={styles.formText}>Password Again</Text>
                        <TextInput style={styles.box} value={passwordAgain} onChangeText={setPasswordAgain} secureTextEntry={true}>

                        </TextInput>
                    </View>
                    <Text style={styles.incorrectPass}>
                        {(password != passwordAgain) && (passwordAgain != "") ? "*Passwords do not match!" : ""}
                    </Text>
                </View>
                <View style={styles.submit}>
                    {
                        canBeReturned ?
                            (
                                <Pressable style={styles.submitButton} onPress={returnLogin}>
                                    <Text style={styles.submitText}>Saved, Let's Login!</Text>
                                </Pressable>
                            )
                                :
                            (
                                <SubmitButton text="SIGN UP" submitFunction={submitFunction}></SubmitButton>
                            )

                    }
                </View>
            </ScrollView>
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
        fontSize: 40,
        fontFamily: "PlayfairDisplay_700Bold",
        color: "#707070"
    },
    form: {
        flex: 5
    },
    formText: {
        marginLeft: 20,
        marginTop: 20,
        fontSize: 15,
        fontFamily: "PlayfairDisplay_400Regular",
        color: "#707070"
    },
    box: {
        backgroundColor: 'white',
        paddingLeft:15,
        borderRadius: 18,
        width: 369,
        height: 43,
        alignSelf: 'center',
        marginTop: 10
    },
    submit: {
        flex: 2,
    },
    incorrectPass: {
        color: 'red',
        marginLeft: 20,
        marginTop: 5
    },
    submitButton: {
        borderRadius: 18,
        width: 369,
        height: 43,
        backgroundColor: '#42ba96',
        alignSelf: 'center',
        alignItems:'center',
        marginTop: 20
      },
      submitText:{
        // alignSelf: 'center',
        color: 'white',
        fontFamily:"PlayfairDisplay_800ExtraBold",
        fontSize:25
      },
});