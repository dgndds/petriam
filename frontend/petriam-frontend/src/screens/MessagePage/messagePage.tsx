import React from 'react';
import { Text, Pressable, StyleSheet,Image,View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Icon } from 'react-native-elements'
import AppLoading from 'expo-app-loading';
import {useFonts,Roboto_700Bold,Roboto_300Light, Roboto_400Regular } from "@expo-google-fonts/roboto"
import { FlatList, TextInput } from 'react-native-gesture-handler';

const DATA = [
    {
        id: 1,
        message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent mauris lectus, tincidunt vel ullamcorper quis",
        time:"13:42",
        sent: true
    },
    {
        id: 2,
        message: "Lorem ipsum dolor, tincidunt vel ullamcorper quis",
        time:"13:44",
        sent: false
    },
    {
        id: 3,
        message: "Praesent mauris lectus, tincidunt vel ullamcorper quis",
        time:"13:45",
        sent:true
    },
    {
        id: 4,
        message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam eget sem at velit accumsan semper. Aliquam viverra velit tellus, vitae feugiat nunc euismod at. Donec vitae urna non justo cursus commodo a at quam. Nunc tempor lorem sit amet nisl dapibus feugiat. Donec ut diam vehicula, faucibus leo et, ultricies.",
        time:"13:47",
        sent:true
    },
    {
        id: 5,
        message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vitae urna non justo cursus commodo a at quam. Nunc tempor lorem sit amet nisl dapibus feugiat. Donec ut diam vehicula, faucibus leo et, ultricies.",
        time:"13:47",
        sent:false
    },
    {
        id: 6,
        message: "Lorem ipsum dolor Praesent mauris lectus, tincidunt vel ullamcorper quis",
        time:"13:48",
        sent:false
    },
    {
        id: 7,
        message: "Lorem ipsum dolor Lorem ipsum dolor sit amet, consectetur adip feugiat nunc euismod at. Donec vitae urna non justo cursus commodo a at quam. Nunc tempor lorem sit amet nisl dapibus feugiat. Donec ut diam vehicula, faucibus leo et, ultricies.",
        time:"13:50",
        sent:true
    },
    {
        id: 8,
        message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent mauris lectus, tincidunt vel ullamcorper quis",
        time:"13:53",
        sent:false
    }
  ];

export default function MessagePage({navigation}){
    let [fontsLoaded,err] = useFonts({
        Roboto_700Bold,
        Roboto_300Light, 
        Roboto_400Regular
    })

    if(!fontsLoaded){
        return <AppLoading/>
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.topBar}>
                <Icon 
                        name='chevron-left'
                        style={styles.back}
                        size={60}
                        color= '#000000'
                        iconStyle={{opacity:0.5}}
                        onPress={() => navigation.pop()}
                />
                <Image 
                style={styles.profilePic}
                source={require("../../../assets/profilepicm.jpeg")}></Image>
                <Text style={styles.chatName}>John Doe</Text>
            </View>
            <FlatList
                data={DATA}
                renderItem={(item)=>(
                    <View>
                        <View style={[styles.textBox,item.item.sent?styles.textSent:styles.textReceived]}>
                            <Text style={styles.message}>{item.item.message}</Text>
                        </View>
                        <Text style={item.item.sent?styles.timeSent:styles.timeReceived}>{item.item.time}</Text> 
                    </View>
                )}
                keyExtractor={item=>item.id}
            />
            <View style={styles.inputBar}>
                <TextInput 
                style={styles.textInput}
                placeholder='Your Text'
                multiline={true}
                ></TextInput>
                <Pressable style={styles.sendButton} onPress={()=>alert("Message Sent!")}>
                    <Icon 
                            name='paper-plane'
                            type='font-awesome-5'
                            solid={true}
                            size={30}
                            color= '#000000'
                    />
                </Pressable>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: "#F2F2F2"
    },
    topBar:{
        backgroundColor:"#D98236",
        minHeight: 75,
        flexDirection: "row",
        alignItems: "center"
    },
    back: {
        alignSelf: 'flex-start',
    },
    profilePic:{
        height:60,
        width:60,
        borderRadius:60,
        borderColor: "black",
        borderWidth: 1,
        marginLeft: 10
    },
    chatName:{
        fontFamily: "Roboto_700Bold",
        fontSize:20,
        color: "white",
        marginLeft: 15
    },
    textBox:{
        backgroundColor:"red",
        minHeight: 50,
        maxWidth:200,
        borderWidth:1,
        borderColor:"black",
        borderRadius:10,
        padding:5,
        margin:10,
    },
    message:{
    fontFamily:"Roboto_400Regular",
    },
    textSent:{
        alignSelf:"flex-end",
        backgroundColor:"#D9BCA3"
    },
    textReceived:{
        alignSelf:"flex-start",
        backgroundColor:"#D99E6A"
    },
    timeSent:{
        alignSelf:"flex-end",
        marginRight: 10
    },
    timeReceived:{
        alignSelf:"flex-start",
        marginLeft:10
    },
    textInput:{
        minHeight:50,
        borderWidth:1,
        borderRadius:5,
        borderColor:"black",
        margin:10,
        padding:10,
        flex:1
    },
    inputBar:{
        flexDirection:"row"
    },
    sendButton:{
        height:50,
        width:50,
        alignSelf:"center",
        alignItems:"center",
        justifyContent:"center",
        marginRight:10,
        borderWidth:1,
        borderRadius:5,
        borderColor:"black",
    },
})