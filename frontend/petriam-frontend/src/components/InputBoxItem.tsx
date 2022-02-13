import React, { Profiler } from 'react';
import { Text, Pressable, StyleSheet,Image,View } from 'react-native';
import { Icon } from 'react-native-elements'
import AppLoading from 'expo-app-loading';
import {useFonts, Roboto_400Regular,Roboto_700Bold } from "@expo-google-fonts/roboto"

export default function InputBoxItem(props){
    let [fontsLoaded,err] = useFonts({
        Roboto_400Regular,
        Roboto_700Bold
    })

    if(!fontsLoaded){
        return <AppLoading/>
    }

    return (
        <Pressable style={styles.container} onPress={() => props.nextPage()}>
            <Image
            style={styles.profilePic}
            source={props.item.item.profilePic ? props.item.item.profilePic : require("../../assets/profilepicd.png") }></Image>
            <View style={styles.textcontainer}>
                <Text style={styles.nameSurname}> {props.item.item.name + " " + props.item.item.surname}</Text>
                <Text style={styles.lastmsg}> {props.item.item.lastmsg}  </Text>
            </View>
            <View style={styles.pet}>
                <Icon
                    name={props.item.item.petType === "dog" ? "dog" : "cat"}
                    type='font-awesome-5'
                    size={25}
                    color= 'black'
                />
                <Text>{props.item.item.petname}</Text>
            </View>
        </Pressable>
    )
}


const styles = StyleSheet.create({
    container: {
        minHeight: 100,
        flexDirection: 'row',
        // backgroundColor: '#4411ee',
        justifyContent:"space-around",
        alignItems:"center",
        // borderColor:"black",
        // borderWidth: 1
    },
    profilePic:{
        height: 80,
        width: 80,
        borderRadius:50,
        borderWidth: 1,
        borderColor: "black",
        marginLeft: 10
    },
    textcontainer:{
        flex:1,
        marginLeft:10,
        // backgroundColor:"blue"
    },
    nameSurname:{
        fontFamily: "Roboto_700Bold",
        fontSize:20
    },
    lastmsg:{
        fontFamily: "Roboto_400Regular",
        fontSize: 15
    },
    pet:{
        minWidth:100,
        // backgroundColor:"red",
        alignItems:"center"
    },
  });