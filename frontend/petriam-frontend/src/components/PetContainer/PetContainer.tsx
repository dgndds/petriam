import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { useFonts,PlayfairDisplay_700Bold_Italic } from "@expo-google-fonts/playfair-display"


export default function NavigationBar(props) {
    let [fontsLoaded, err] = useFonts({
        PlayfairDisplay_700Bold_Italic,
      })

    const handleImage = (animal: string) => {
        
        switch (animal) {
            case "cat":
              return require('../../../assets/icons/cat.png')
          case "dog":
              return require('../../../assets/icons/dog.png')
          case "bird":
              return require('../../../assets/icons/dove.png')
          case "turtle":
              return require('../../../assets/icons/turtle.png')
          default:
              return require('../../../assets/icons/cat.png')
          }
    }

    return (
        <View style={styles.container}>
            <Image
                style={styles.petPic}
                source={handleImage(props.pet.type)}
            />
            <Text style={styles.petName}>{props.pet.name}</Text>
            <View style={styles.info}>
                <Text style={styles.infoText}>Age: {Math.floor(Math.random() * (10 - 0 + 1) + 0)}</Text>
                <Text style={styles.infoText}>Kind: {props.pet.type}</Text>
                <Text style={styles.infoText}>About: A lovely {props.pet.type}</Text>
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
        width:60,
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