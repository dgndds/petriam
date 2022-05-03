import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { useFonts,PlayfairDisplay_700Bold_Italic } from "@expo-google-fonts/playfair-display"


export default function NavigationBar() {
    let [fontsLoaded, err] = useFonts({
        PlayfairDisplay_700Bold_Italic,
      })

    return (
        <View style={styles.container}>
            <Image
            style={styles.petPic}
            source={require("../../../assets/profilepicw.jpg")}
            />
            <Text style={styles.petName}>Pet Name</Text>
            <View style={styles.info}>
                <Text style={styles.infoText}>Age: 5</Text>
                <Text style={styles.infoText}>Kind: Terrier</Text>
                <Text style={styles.infoText}>About: Loves to play</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        width:140,
        height:170,
        marginRight:10,
        borderColor:"black",
        borderWidth:1,
        borderStyle:"solid",
        padding:10,
        alignItems:"center"
    },
    petPic:{
        width:120,
        height:60
    },
    petName:{
        fontFamily:"PlayfairDisplay_700Bold_Italic",
        fontSize:15,
        marginBottom:3,
        marginTop:2
    },
    info:{
        alignSelf:"baseline",
        width:120,
    },
    infoText:{
        fontSize:10
    }
})