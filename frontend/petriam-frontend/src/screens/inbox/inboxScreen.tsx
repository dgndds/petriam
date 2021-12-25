import React from 'react';
import { Icon } from 'react-native-elements'
import { SafeAreaView, Text, Platform, StatusBar, StyleSheet, View, FlatList} from 'react-native';
import InputBoxItem from '../../components/InputBoxItem';
import Navi from '../../components/general/navi';
import AppLoading from 'expo-app-loading';
import {useFonts,Roboto_700Bold } from "@expo-google-fonts/roboto"

const DATA = [
    {
        id: 1,
        name: "Murat",
        surname: "Hancı",
        petname:"Karabaş",
        lastmsg: "Ne Kadar?",
        profilePic:require("../../../assets/profilepicm.jpeg"),
        petType:"dog"
    },
    {
        id: 2,
        name: "Sevda",
        surname: "Hancı",
        petname:"Tekir",
        lastmsg: "Merhaba!",
        profilePic:"",
        petType:"cat"
    },
    {
        id: 3,
        name: "John",
        surname: "Doe",
        petname:"Max",
        lastmsg: "Thanks",
        profilePic:require("../../../assets/profilepicm.jpeg"),
        petType:"dog"
    },
    {
        id: 4,
        name: "Jeniffer",
        surname: "Doew",
        petname:"Rufus",
        lastmsg: "Hey :(",
        profilePic: require("../../../assets/profilepicw.jpg"),
        petType:"cat"
    },
    {
        id: 5,
        name: "Jeniffer",
        surname: "Doew",
        petname:"Rufus",
        lastmsg: "Hey :(",
        profilePic: require("../../../assets/profilepicw.jpg"),
        petType:"cat"
    },
    {
        id: 6,
        name: "Sevda",
        surname: "Hancı",
        petname:"Tekir",
        lastmsg: "Merhaba!",
        profilePic:"",
        petType:"cat"
    },
    {
        id: 7,
        name: "John",
        surname: "Doe",
        petname:"Max",
        lastmsg: "Thanks",
        profilePic:require("../../../assets/profilepicm.jpeg"),
        petType:"dog"
    },
  ];

export default function InboxScreen(){

    let [fontsLoaded,err] = useFonts({
        Roboto_700Bold
    })

    if(!fontsLoaded){
        return <AppLoading/>
    }
    return (
        <View style={styles.container}>
            <View style = {styles.topBar}>
                <Icon 
                    name='chevron-left'
                    style={styles.back}
                    size={50}
                    color= '#707070'
                />
                <Text style={styles.inboxText}>Inbox (5)</Text>
            </View>

            <FlatList 
            data={DATA} 
            renderItem={(item)=>(<InputBoxItem item={item}></InputBoxItem>)} 
            keyExtractor={item => item.id}
            ></FlatList>
            <Navi></Navi>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: '#f2f2f2',
      paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    inboxText:{
        fontFamily: "Roboto_700Bold",
        fontSize:20,
        color: "white"
    },
    topBar:{
        flexDirection:'row',
        backgroundColor:"orange",
        alignItems:"center"
    },
    back: {
        alignSelf: 'flex-start',
    },
  });