import React, { useEffect, useState } from 'react';
import {StyleSheet,SafeAreaView,Text,Platform, View, Image,ScrollView } from 'react-native';
import { useFonts, PlayfairDisplay_700Bold, PlayfairDisplay_700Bold_Italic} from "@expo-google-fonts/playfair-display"
import {Roboto_700Bold } from "@expo-google-fonts/roboto"
import { Icon } from 'react-native-elements';
import PetContainer from "../../components/PetContainer/PetContainer"
import Navi from '../../components/general/navi';
import AppLoading from 'expo-app-loading';
import { getCurrentUserInfo } from '../../api/RestApiFunctions';
import { useSelector } from 'react-redux';
import { BASE, BASE_URL } from '../../api/ApiConstants';

export default function ProfilePage({navigation}){
    const state = useSelector(state => state);
    const [userInfo,setUserInfo] = useState({})
    const [userPicPath,setUserPicPath] = useState("")
    const [ownedPets,setOwnedPets] = useState<string[]>([]);

    const handlePetIcons = (pets:any) => {
        let owned:string[] = []

        pets.map(pet => {
            
            if(!owned.includes(pet.type)){
                owned.push(pet.type)
            }
        })

        setOwnedPets(owned);
    }

    useEffect(() => {
        setOwnedPets([]);
        console.log("profil",state.token.token);
        getCurrentUserInfo(state.token.token, state.id.id).then(result=>{
            if(result === false){
                console.log("Failed to get user info!");
            }else{
                console.log("user",result);
                setUserInfo(result);
                handlePetIcons(result.pets)
                setUserPicPath(BASE_URL + result.profileImageURL);
                console.log("pic",userPicPath);
            }
        });
    },[]);


    let [fontsLoaded, err] = useFonts({
        PlayfairDisplay_700Bold,
        PlayfairDisplay_700Bold_Italic,
        Roboto_700Bold
    })

    if (!fontsLoaded || !userInfo) {
       return <AppLoading />;
    }

    const handlePetIconName = (pet:any) => {
        if(pet === "cat"){
            return "cat"
        }else if(pet === "dog"){
            return "dog"
        }else if(pet === "bird"){
            return "dove"
        }else if(pet === "turtle"){
            return "turtle"
        }
    }


    
    return(
        <SafeAreaView style={styles.container}>
            <ScrollView nestedScrollEnabled contentContainerStyle={{paddingBottom:90, paddingTop:5}}>
            <Icon 
                name='chevron-left'
                size={50}
                color= '#707070'
                style={{alignSelf: "flex-start"}}
                onPress={() => navigation.pop()}
            />
            <View style={styles.headerContainer}>
                <Image
                style={styles.profilePic}
                source={{uri:userPicPath.toString()}}/>
                <View style={styles.nameTag}>
                    <Text style={styles.profileName}>{userInfo.name + " " + userInfo.surname}</Text> 
                    <Icon
                    name='check-circle'
                    type="font-awesome"
                    size={23}
                    color='black'
                    />
                </View>
                <View style={styles.ownerPetsContainer}>
                    {ownedPets && ownedPets.map(
                        pet=>(
                            <>
                                <Icon
                                name={handlePetIconName(pet)}
                                type="font-awesome-5"
                                size={10}
                                color='#707070'
                                />
                                <Text style={styles.petText}>{pet.charAt(0).toUpperCase() + pet.slice(1)} Owner</Text>
                            </>
                        ))}


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
                        {userInfo.aboutMe}
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
                            {userInfo.address}
                        </Text>
                    </ScrollView>
                </View>
                <View style={styles.petsContainer}>
                    <Text style={styles.petTitle}>Pets</Text>
                    <ScrollView horizontal>
                    {userInfo.pets && userInfo.pets.map(pet=>(

                        <PetContainer pet={pet}/>
                    ))}
                    </ScrollView>
                </View>
            </View>
            </ScrollView>
            <View style={styles.navbar}>
                <Navi
                    nextPage={() => navigation.pop()}
                />
            </View>
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
        color:"#707070",
        marginTop:5
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