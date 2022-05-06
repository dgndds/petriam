import React, { useEffect, useState } from 'react';
import { Text, Pressable, StyleSheet,Image,View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Icon } from 'react-native-elements'
import AppLoading from 'expo-app-loading';
import {useFonts,Roboto_700Bold,Roboto_300Light, Roboto_400Regular } from "@expo-google-fonts/roboto"
import { FlatList, TextInput } from 'react-native-gesture-handler';
import { getMessages, sendMessage } from '../../api/RestApiFunctions';
import { useSelector } from 'react-redux';

export default function MessagePage({route, navigation}){
    const { conversationId, ownerId } = route.params;
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const state = useSelector(state => state);

    let [fontsLoaded,err] = useFonts({
        Roboto_700Bold,
        Roboto_300Light, 
        Roboto_400Regular
    })

    useEffect(async () => {
        const filterResponse = (allMessages: Array<Object>) => {
            let formattedMessages = allMessages.map((message, index) => {
                return {
                    id: index,
                    message: message.content,
                    time: message.createdAt.substr(11, 5),
                    sent: state.id.id === message.senderId
                }
            });
            return formattedMessages;
        }

        setMessages(
            filterResponse(await getMessages(conversationId, state.token.token))
        );
        console.log("Burası: " + ownerId.userId);
        console.log("Gel Baba: " + messages.at(0));
    } , []);

    if(!fontsLoaded){
        return <AppLoading/>
    }

    const clickSend = () => {
        const getCurrentTime = () => {
            let hours = new Date().getHours().toString();
            let minutes = new Date().getMinutes().toString();
            return hours + ":" + minutes;
        }

        sendMessage(message, state.token.token, ownerId.userId);
        setMessages([...messages, {
            id: messages.length + 1,
            message: message,
            time: getCurrentTime(),
            sent: true
        }]);
        setMessage("");
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
                <Text style={styles.chatName}>{ownerId.name + " " + ownerId.surname}</Text>
            </View>
            <FlatList
                data={messages}
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
                onChangeText={(text)=>setMessage(text)}
                value={message}
                multiline={true}
                ></TextInput>
                <Pressable style={styles.sendButton} onPress={()=>clickSend()}>
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

function getCurrentTime(): string {
    throw new Error('Function not implemented.');
}
