import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import {useFonts, Roboto_700Bold,Roboto_700Bold_Italic  } from "@expo-google-fonts/roboto"
import { Icon } from 'react-native-elements';
import AppLoading from 'expo-app-loading';

export default function NavigationBar() {
    let [fontsLoaded, err] = useFonts({
        Roboto_700Bold,
        Roboto_700Bold_Italic
    })

    if(!fontsLoaded){
        return <AppLoading/>
    }

    return (
        <View style={styles.container}>
            <Image 
            style={styles.profilePic}
            source={require("../../../assets/icons/avatarWoman.png")}/>
            <View style={styles.infoContainer}>
                <Text style={styles.userName}>Name Surname</Text>
                <View style={styles.petInfo}>
                    <Icon
                        name='dog'
                        type="font-awesome-5"
                        size={10}
                        color='black'
                        style={styles.petIcon}
                    />
                    <Text style={styles.petName}>Pet Name</Text>
                </View>
                <Text style={styles.contractInfo}>01/01/2021 - 08/01/2021 (7 days)</Text>
            </View>
            <View style={styles.buttonsContainer}>
                <Icon
                    name='envelope'
                    type="font-awesome-5"
                    size={20}
                    color='black'
                    solid
                    style={styles.petIcon}
                />
                <Icon
                    name='times'
                    type="font-awesome-5"
                    size={20}
                    color='#FF0000'
                    style={styles.petIcon}
                />
                <Icon
                    name='check'
                    type="font-awesome-5"
                    size={20}
                    color='#00FF19'
                    style={styles.petIcon}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flexDirection:"row",
        marginBottom:10
    },
    profilePic:{
        width: 55,
        height: 55,
        overflow: 'hidden',
        borderRadius: 55,
        borderWidth: 1,
        borderColor: "black"
    },
    infoContainer:{
        minWidth:230,
        flexDirection:"column",
        justifyContent:"space-around",
        marginLeft:10
    },
    userName:{
        fontFamily:"Roboto_700Bold",
        fontSize:15
    },
    petInfo:{
        flexDirection:"row",
        alignItems:"center"
    },
    petIcon:{
        marginRight:5
    },
    petName:{
        fontFamily:"Roboto_700Bold_Italic",
        fontSize:12
    },
    contractInfo:{
        fontFamily:"Roboto_700Bold_Italic",
        fontSize:12
    },
    buttonsContainer:{
        flex:1,
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-around"
    }
})