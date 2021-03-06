import React, { useEffect, useState } from 'react';
import { Icon } from 'react-native-elements'
import { SafeAreaView, Text, Platform, StatusBar, StyleSheet, View, FlatList} from 'react-native';
import InputBoxItem from '../../components/InputBoxItem';
import Navi from '../../components/general/navi';
import AppLoading from 'expo-app-loading';
import {useFonts,Roboto_700Bold } from "@expo-google-fonts/roboto"
import { getConversations } from '../../api/RestApiFunctions';
import { useSelector } from 'react-redux';

export default function InboxScreen({navigation}){
    let [fontsLoaded,err] = useFonts({
        Roboto_700Bold
    });
    const state = useSelector(state => state);
    const [conversations, setConversations] = useState([]);

    useEffect(async () => {
        setConversations(await getConversations(state.token.token))
    } , []);

    if(!fontsLoaded){
        return <AppLoading/>
    }

    const goToMessagePage = (item: Object, name: string) => {
        navigation.navigate("MessagePage", {conversationId: item.item._id, ownerId: item.item.ownerId, name: name});
    }
    
    return (
        <View style={styles.container}>
            <View style = {styles.topBar}>
                <Icon 
                    name='chevron-left'
                    style={styles.back}
                    size={50}
                    color= '#707070'
                    onPress={() => navigation.pop()}
                />
                <Text style={styles.inboxText}>Inbox ({conversations.length})</Text>
            </View>
            {
                conversations.length > 0 
                    ?
                    <FlatList 
                        data={conversations} 
                        renderItem={(item)=>(<InputBoxItem item={item} nextPage={goToMessagePage}></InputBoxItem>)} 
                        keyExtractor={item => item._id}
                    ></FlatList>
                    :
                    <View style={styles.warningContainer}>
                        <Text style={styles.warning}>
                            You have no conversations yet.
                        </Text>
                    </View>
            }

            <Navi nextPage={() => navigation.pop()}></Navi>
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
        alignItems:"center",
        marginTop: 40
    },
    back: {
        alignSelf: 'flex-start',
    },
    warningContainer:{
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    },
    warning:{
        fontFamily:"Roboto_700Bold",
        fontSize:20,
        color:"#707070"
    }
  });