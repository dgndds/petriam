import React, { useEffect, useState } from 'react';
import {StyleSheet,SafeAreaView,Text,Platform, View, Image,ScrollView, Pressable } from 'react-native';
import { useFonts, PlayfairDisplay_700Bold, PlayfairDisplay_700Bold_Italic,PlayfairDisplay_800ExtraBold} from "@expo-google-fonts/playfair-display"
import {Roboto_700Bold } from "@expo-google-fonts/roboto"
import { Icon } from 'react-native-elements';
import AppLoading from 'expo-app-loading';
import Navi from '../../components/general/navi';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useSelector } from 'react-redux';
import { createContract, getCurrentUserInfo } from '../../api/RestApiFunctions';

export default function HostPage({route, navigation}){
    const [openStartDate,setStartOpenDate] = useState(false);
    const [openFinishDate,setFinishOpenDate] = useState(false);
    const [userInfo,setUserInfo] = useState({});
    const [startDate,setStartDate] = useState(new Date());
    const [finishDate,setFinishDate] = useState(new Date());
    const [selectedPet,setSelectedPet] = useState(null);
    const [status, setStatus] = useState('Hire This Host');
    const state = useSelector(state => state);
    const { hostId } = route.params;

    useEffect(() => {
        console.log("Host:" + hostId)
        console.log("user token",state.token.token)
        console.log("user id ",state.id.id)

        getCurrentUserInfo(state.token.token,state.id.id).then(result=>{
            if(result === false){
                console.log("Failed to retrieve user information!");
            }else{
                setUserInfo(result);
            }
        })

    }, [])

    let [fontsLoaded, err] = useFonts({
        PlayfairDisplay_700Bold,
        PlayfairDisplay_700Bold_Italic,
        PlayfairDisplay_800ExtraBold,
        Roboto_700Bold
      })

      if (!fontsLoaded || !userInfo) {
        return <AppLoading />;
      }

    const handleStartDateChange = (event,date) => {
        setStartOpenDate(false);
        setStartDate(date);
    }

    const handleFinishDateChange = (event,date) => {
        setFinishOpenDate(false);
        setFinishDate(date);
    }

    const handlePetSelect = (pet:any) => {
        setSelectedPet(pet);
    }

    const handleSubmit = async () => {
        if( selectedPet === null){
            return false;
        }else{
            if(selectedPet.length <= 0){
                return false;
            }
        }

        let body = {
            selectedPet:selectedPet,
            startDate:startDate,
            finishDate:finishDate
        }

        let contract = await createContract(state.token.token, hostId, [selectedPet], new Date(startDate).toISOString(), new Date(finishDate).toISOString())

        if(contract){
            setStatus("Successfully Hired!");
        }
    }

    return(
        <SafeAreaView style={styles.container}>       
            <ScrollView nestedScrollEnabled contentContainerStyle={{paddingBottom:100, paddingTop:5}}>
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
                    <View style={styles.priceAndRatingContainer}>
                        <View style={styles.priceContainer}>
                            <Text style={styles.priceTitle}>Price</Text>
                            <Text style={styles.priceLabel}><Text style={styles.price}>55</Text> TL</Text>
                            <Text style={styles.perdayTitle}>Per Day</Text>
                        </View>
                        <View>
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
                        </View>
                    </View>
                    <View style={styles.datePickerContainer}>
                        <View style={{alignItems:"center"}}>
                            <Pressable onPress={()=>setStartOpenDate(true)} style={styles.openDateButton}>
                                <Text style={styles.openDateButtonText}>Choose a Start Date</Text>
                            </Pressable>
                            <Text>{startDate.getDate().toString().padStart(2, '0') + "/" +
                                   (startDate.getMonth()+1).toString().padStart(2, '0') + "/" +
                                   startDate.getFullYear().toString().padStart(2, '0')}</Text> 
                            {openStartDate&&<DateTimePicker minimumDate={new Date()} mode='date' value={new Date()} onChange={handleStartDateChange}/>}
                        </View>
                        <View style={{alignItems:"center"}}>
                            <Pressable onPress={()=>setFinishOpenDate(true)} style={styles.openDateButton}>
                                <Text style={styles.openDateButtonText}>Choose a Finish Date</Text>
                            </Pressable>
                            <Text>{finishDate.getDate().toString().padStart(2, '0') + "/" +
                                   (finishDate.getMonth()+1).toString().padStart(2, '0') + "/" +
                                   finishDate.getFullYear().toString().padStart(2, '0')
                                   }</Text>
                            {openFinishDate&&<DateTimePicker minimumDate={new Date()} mode='date' value={new Date()} onChange={handleFinishDateChange}/>}
                        </View>
                    </View>
                    <View style={styles.petsContainer}>
                        <Text style={styles.addressTitle}>Your Pets</Text>
                        <View style={{flexDirection:"row", flexWrap:"wrap"}}>
                            {userInfo.pets&&userInfo.pets.map(
                                (pet,i)=>(
                                    <Pressable key={i} onPress={()=>handlePetSelect(pet)} style={[styles.petChooseButton,{backgroundColor:selectedPet===pet?"green":"#D99E6A"}]}>
                                        <Text style={styles.petChooseButtonText}>{pet.name} ({pet.type})</Text>
                                    </Pressable>
                                )
                            )}
                        </View>
                    </View>
                    <Pressable style={styles.submitButton} onPress={() => handleSubmit()}>
                        <Text style={styles.submitButtonText}>{status}</Text>
                    </Pressable>
                </View>
            </ScrollView>
            <View style={styles.navbar}>
                <Navi />
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
    priceAndRatingContainer:{
        width:350,
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center"
    },
    priceContainer:{
        flexDirection:"column",
        justifyContent:"space-between",
        alignItems:"center" 
    },
    priceTitle:{
        fontFamily:"PlayfairDisplay_700Bold",
        fontSize:15
    },
    priceLabel:{
        fontFamily:"Roboto_700Bold",
        fontSize:30 
    },
    price:{
        color:"#FF0101"
    },
    perdayTitle:{
        fontFamily:"PlayfairDisplay_700Bold",
        fontSize:10
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
    datePickerContainer:{
        flexDirection:"row",
        justifyContent:"space-between",
        marginBottom:15, 
        width:"95%"
    },
    openDateButton:{
        width:170,
        height:30,
        alignItems:"center",
        justifyContent:"center",
        borderRadius:10,
        backgroundColor:"#D99E6A",
    },
    openDateButtonText:{
        fontFamily:"PlayfairDisplay_700Bold",
        fontSize:15,
        color:"white",
        textAlign:"center"
    },
    petsContainer:{
        width:350,
        justifyContent:"flex-start",
        marginLeft:"2.5%",
        marginBottom:20
    },
    petChooseButton:{
        width:100,
        height:25,
        backgroundColor:"#D99E6A",
        justifyContent:"center",
        borderRadius:5,
        marginLeft:10,
        marginBottom:10
    },
    petChooseButtonText:{
        fontFamily:"PlayfairDisplay_700Bold",
        fontSize:12,
        color:"white",
        textAlign:"center"
    },
    submitButton:{
        width:350,
        height:50,
        backgroundColor:"#D99E6A",
        alignItems:"center",
        borderRadius:50
    },
    submitButtonText:{
        fontFamily:"PlayfairDisplay_700Bold",
        fontSize:30,
        color:"white",
        textAlign:"center"
    },
    navbar:{
        position:"absolute",
        bottom:0,
        width:"100%"
    }
})