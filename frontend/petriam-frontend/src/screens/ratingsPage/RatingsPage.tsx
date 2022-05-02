import React from 'react';
import { StyleSheet, Platform, SafeAreaView,Text, View, Image,ScrollView} from 'react-native';
import { useFonts, PlayfairDisplay_700Bold, PlayfairDisplay_700Bold_Italic} from "@expo-google-fonts/playfair-display"
import {Roboto_700Bold } from "@expo-google-fonts/roboto"
import { Icon } from 'react-native-elements';
import Rating from '../../components/rating/Rating';
import Navi from '../../components/general/navi';

export default function RatingsPage(){
    let [fontsLoaded, err] = useFonts({
        PlayfairDisplay_700Bold,
        PlayfairDisplay_700Bold_Italic,
        Roboto_700Bold
      })

    return(
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={{
                paddingBottom:50
            }}>
                <View style={styles.headerContainer}>
                    <Image
                    style={styles.profilePic}
                    source={require("../../../assets/icons/avatarWoman.png")}/>
                    <View style={styles.nameTag}>
                        <Text style={styles.profileName}>John Doe</Text> 
                        <Icon
                        name='check-circle'
                        type="font-awesome"
                        size={23}
                        color='black'
                        />
                    </View>
                    <View style={styles.ownerPetsContainer}>
                        <Icon
                        name='dog'
                        type="font-awesome-5"
                        size={10}
                        color='#707070'
                        />
                        <Text style={styles.petText}>Dog Owner</Text>
                        <Icon
                        name='cat'
                        type="font-awesome-5"
                        size={10}
                        color='#707070'
                        />
                        <Text style={styles.petText}>Cat Owner</Text>
                    </View>
                    <Text style={styles.verficText}>*Verified with TC and Address</Text>
                </View>
                <View style={styles.ratingContainer}>
                    <View style={styles.starsContainer}>
                        {[...Array(4)].map((v, i) => <Icon solid name="star" type="font-awesome-5"  size={15} key={`selector-${i}`} /> )}
                        <Icon solid name="star-half" type="font-awesome-5"  size={15} />
                    </View>
                    <View style={styles.ratingText}>
                        <Text style={styles.scoreBoard}><Text style={styles.score}>4.5</Text>/5</Text>
                        <Text style={styles.ratingSubtitle}>rating</Text>
                    </View>       
                </View>
                <Rating/>
                <Rating/>
                <Rating/>
                <Rating/>
                <Rating/>
                <Rating/>
                <Rating/>
                <Rating/>
            </ScrollView>
            <View style={styles.navbar}><Navi></Navi></View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#F2F2F2",
        marginTop: Platform.OS === 'android' ? 25 : 0,
    },
    headerContainer:{
        alignItems:"center",
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
        flexDirection:"row",
        alignItems:"center"
    },
    profileName:{
        fontFamily: "Roboto_700Bold",
        fontSize:30,
        marginRight:10
    },
    ownerPetsContainer:{
        flexDirection:"row"
    },
    petText:{
        fontFamily:"Roboto_700Bold",
        fontSize:8,
        color:"#707070",
        marginRight:5
    },
    verficText:{
        fontFamily:"PlayfairDisplay_700Bold_Italic",
        fontSize:10,
        color:"#707070"
    },
    ratingContainer:{
        alignItems:"center",
        marginTop:20,
        marginBottom:20
    },
    starsContainer:{
        flexDirection:"row"
    },
    ratingText:{
        alignItems:"center"
    },
    scoreBoard:{
        fontFamily:"Roboto_700Bold",
        fontSize:30
    },
    score:{
        color:"#FF0101"
    },
    ratingSubtitle:{
        fontFamily:"Roboto_700Bold",
        fontSize:10
    },
    navbar:{
        position:"absolute",
        bottom:0,
        width:"100%"
    }
})