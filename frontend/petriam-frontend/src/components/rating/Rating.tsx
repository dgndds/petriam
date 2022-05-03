import React from 'react';
import { StyleSheet, Platform, SafeAreaView,Text, View, Image,ScrollView} from 'react-native';
import { useFonts, PlayfairDisplay_400Regular} from "@expo-google-fonts/playfair-display"
import {Roboto_700Bold} from "@expo-google-fonts/roboto"
import { Icon } from 'react-native-elements';

export default function Rating(){
    let [fontsLoaded, err] = useFonts({
        PlayfairDisplay_400Regular,
        Roboto_700Bold
      })

    return(
        <View>
            <View style={styles.container}>
                <Image
                style={styles.profilePic}
                source={require("../../../assets/icons/avatarWoman.png")}/>
                <View style={styles.infoContainer}>
                    <Text style={styles.nameTag}>John Doe</Text>
                    <Text style={styles.comment}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quis lectus at eros luctus ultrices. In hac habitasse platea dictumst. Curabitur interdum convallis diam id luctus.</Text>
                </View>
                <View style={styles.ratingContainer}>
                    <View style={styles.starsContainer}>
                        {[...Array(4)].map((v, i) => <Icon solid name="star" type="font-awesome-5"  size={10} key={`selector-${i}`} /> )}
                        <Icon solid name="star-half" type="font-awesome-5"  size={10} />
                        <Text style={styles.scoreBoard}><Text style={styles.score}>4.5</Text>/5</Text>
                    </View>
                    <View style={styles.petInfo}>
                        <Icon
                            name='dog'
                            type="font-awesome-5"
                            size={12}
                            color='black'
                        />
                        <Text style={styles.petText}>Dog Owner</Text>
                    </View>    
                </View>
            </View>
            <View
                style={{
                    borderBottomColor: 'black',
                    borderBottomWidth: 1,
                    marginBottom:15
                }}
            />    
        </View>
        
    )
}

const styles = StyleSheet.create({
    container:{
        flexDirection:"row",
        height:130
    },
    profilePic:{
        width: 75,
        height: 75,
        overflow: 'hidden',
        borderRadius: 75,
        borderWidth: 1,
        borderColor: "black"
    },
    nameTag:{
        fontFamily:"Roboto_700Bold",
        fontSize:20
    },
    comment:{
        fontFamily:"PlayfairDisplay_400Regular",
        fontSize:13,
        color:"#707070"
    },
    infoContainer:{
        maxWidth:230,
        marginLeft:10
    },
    ratingContainer:{
        marginLeft:5,
        marginTop:15
    },
    starsContainer:{
        flexDirection:"row",
        marginBottom:10
    },
    scoreBoard:{
        fontFamily:"Roboto_700Bold",
        fontSize:10
    },
    score:{
        color:"#FF0101"
    },
    petInfo:{
        flexDirection:"row"
    },
    petText:{
        fontFamily:"Roboto_700Bold",
        fontSize:12,
        color:"black",
        marginLeft:5
    },
})