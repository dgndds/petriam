import React from 'react';
import { Text, Pressable, StyleSheet,View, Platform } from 'react-native';
import { Icon } from 'react-native-elements'


export default function Navi(props){
    return (
            
            <View style={styles.container}>
                <Icon
                        name="file-signature"
                        type='font-awesome-5'
                        size={25}
                        color= 'white'
                        solid={true}
                />
                <Icon
                        name="envelope"
                        type='font-awesome-5'
                        size={25}
                        color= 'white'
                        solid={true}
                        onPress={() => {props.nextPage()} }
                />
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
                <Icon
                        name="hotel"
                        type='font-awesome-5'
                        size={25}
                        color= 'white'
                        solid={true}
                />
                <Icon
                        name="user"
                        type='font-awesome-5'
                        size={25}
                        color= 'white'
                        solid={true}
                />
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