import React from 'react';
import {StyleSheet,SafeAreaView,Text,Platform, View, Image,ScrollView } from 'react-native';
import { useFonts, PlayfairDisplay_700Bold, PlayfairDisplay_700Bold_Italic} from "@expo-google-fonts/playfair-display"
import {Roboto_700Bold } from "@expo-google-fonts/roboto"
import { Icon } from 'react-native-elements';
import PetContainer from "../../components/PetContainer/PetContainer"
import Navi from '../../components/general/navi';

export default function ProfilePage(){
    let [fontsLoaded, err] = useFonts({
        PlayfairDisplay_700Bold,
        PlayfairDisplay_700Bold_Italic,
        Roboto_700Bold
      })

    return(
        <SafeAreaView style={styles.container}>
            <ScrollView nestedScrollEnabled contentContainerStyle={{paddingBottom:90, paddingTop:5}}>
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
            <View style={styles.detailsContainer}>
                <View style={{marginTop:10,height:150 }}>
                    <Text style={styles.aboutMeTitle}>About Me</Text>
                    <ScrollView nestedScrollEnabled  style={styles.aboutMe} 
                    contentContainerStyle={{
                        paddingTop: 15,
                        paddingBottom: 15,
                        paddingLeft:10,
                        paddingRight:10,
                    }}
                    >
                        <Text style={{textAlign:"justify"}}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In id 
                        fringilla metus, ut suscipit felis. Mauris mollis enim a orci sollicitudin,
                        et dapibus ipsum mat-tis. Maecenas faucibus et tortor vel laoreet. Nunc mattis 
                        lorem ex, nec interd-um justo vehicula at. Mauris sollicitudin metus mauris, ac 
                        egestas tellus dapibus non. Suspendisse potenti. Cras vitae libero lacus.
                        </Text>
                    </ScrollView>
                </View>
                <View style={{marginTop:15, height:100}}>
                    <Text style={styles.addressTitle}>Address</Text>
                    <ScrollView nestedScrollEnabled  style={styles.address} 
                    contentContainerStyle={{
                        paddingTop: 5,
                        paddingBottom: 5,
                        paddingLeft:10,
                        paddingRight:10,
                        flexGrow: 1 
                    }}
                    >
                        <Text> 
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In id fringilla metus.
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In id fringilla metus.
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In id fringilla metus.
                        </Text>
                    </ScrollView>
                </View>
                <View style={styles.petsContainer}>
                    <Text style={styles.petTitle}>Pets</Text>
                    <ScrollView horizontal>
                        <PetContainer></PetContainer>
                        <PetContainer></PetContainer>
                        <PetContainer></PetContainer>
                        <PetContainer></PetContainer>
                        <PetContainer></PetContainer>
                        <PetContainer></PetContainer>
                        <PetContainer></PetContainer>
                        <PetContainer></PetContainer>
                    </ScrollView>
                </View>
            </View>
            </ScrollView>
            <View style={styles.navbar}><Navi></Navi></View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
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
    detailsContainer:{
        alignItems:"center",
    },
    aboutMeTitle:{
        fontFamily:"PlayfairDisplay_700Bold",
        fontSize:20,
        marginBottom:5,
    },
    aboutMe:{
        width:350,
        height:100,
        borderColor:"black",
        borderWidth:1,
        borderStyle:"solid",
        borderRadius:10
    },
    addressTitle:{
        fontFamily:"PlayfairDisplay_700Bold",
        fontSize:15,
        marginBottom:5
    },
    address:{
        width:350,
        borderColor:"black",
        borderWidth:1,
        borderStyle:"solid",
        borderRadius:10,
        marginBottom:5,
        flex:1
    },
    petTitle:{
        fontFamily:"PlayfairDisplay_700Bold",
        fontSize:15,
        marginBottom:5
    },
    petsContainer:{
        width:350,
    },
    navbar:{
        position:"absolute",
        bottom:0,
        width:"100%"
    }
});