import React, { useEffect } from 'react';
import {StyleSheet,View, Platform } from 'react-native';
import { Icon } from 'react-native-elements'


export default function Navi(props){

    useEffect(() => {
        if(props.goToContract){
            console.log("ahhahahahah")
        }
    }, [])

    return (        
            <View style={styles.container}>
                {
                    props.goToContract ? 

                    <Icon
                        name="file-signature"
                        type='font-awesome-5'
                        size={25}
                        color= 'white'
                        solid={true}
                        onPress={() => {props.goToContract()} }
                    />
                        :
                    <View></View>
                }
                {
                    props.goToInbox ? 

                    <Icon
                        name="envelope"
                        type='font-awesome-5'
                        size={25}
                        color= 'white'
                        solid={true}
                        onPress={() => {props.goToInbox()} }
                    />
                    :
                    <View></View>
                }
                <View style={styles.circle}>
                    <View style={styles.home}>
                    <Icon
                            
                            name="home"
                            type='font-awesome-5'
                            size={60}
                            color= 'white'
                            solid={true}
                            onPress={() => {props.nextPage()} }
                    />
                    </View>
                </View>
                {
                    props.goToInbox ? 

                    <Icon
                        name="hotel"
                        type='font-awesome-5'
                        size={25}
                        color= 'white'
                        solid={true}
                        onPress={() => {props.goToBecomeHost()} }
                    />
                    :
                    <View></View>
                }
                {
                    props.goToInbox ? 

                    <Icon
                        name="user"
                        type='font-awesome-5'
                        size={25}
                        color= 'white'
                        solid={true}
                        onPress={() => {props.goToProfile()} }
                    />
                    :
                    <View></View>
                }
            </View>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:"#D98236",
        height: 50,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center"
    },
    circle:{
        backgroundColor:"#D98236",
        height: 160,
        width:160,
        alignItems:"center",
        justifyContent: Platform.OS === 'android' ? "flex-start" : "center",
        borderRadius:100,
        bottom: -30
    },
    home:{
        marginTop: Platform.OS === 'android' ? 10 : 0,
        marginBottom: Platform.OS === 'android' ? 0 : 80,
    }
})