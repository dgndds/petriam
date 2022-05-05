import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, Dimensions, Pressable } from 'react-native';
import {useFonts, Roboto_700Bold,Roboto_700Bold_Italic  } from "@expo-google-fonts/roboto"
import { Icon } from 'react-native-elements';
import AppLoading from 'expo-app-loading';
import { useSelector } from 'react-redux';
import { getUserName, updateContractStatus } from '../../api/RestApiFunctions';

export default function NavigationBar(props, {navigation}) {
    const [dates, setDates] = useState("");
    const [petName, setPetName] = useState("");
    const [hostName, setHostName] = useState("");
    const [petType, setPetType] = useState("");
    const [status, setStatus] = useState("");
    const state = useSelector(state => state);
    let [fontsLoaded, err] = useFonts({
        Roboto_700Bold,
        Roboto_700Bold_Italic
    })

    const calculateDateDifference =  (date1: Date, date2: Date) => {
        let timeDiff = date2.getTime() - date1.getTime();
        let diffDays = Math.floor(timeDiff / (1000 * 3600 * 24));
        return diffDays;
    }

    const handleStatus = async (status: string) => {
        let endDateDifferenceFromToday = calculateDateDifference(new Date(), new Date(props.contract.endDate));
        
        if(status !== "sent"){

            if(endDateDifferenceFromToday > 0){
                setStatus("On Going");
                await updateContractStatus(state.token.token, props.contract._id, "On Going");
            }else if(endDateDifferenceFromToday < 0){
                setStatus("Completed");
                await updateContractStatus(state.token.token, props.contract._id, "Completed");
            }
        }else{
            setStatus("sent");
        }

    }

    useEffect(async () => {
        
        console.log("Burası", props.contract.status)
        handleStatus(props.contract.status);
        console.log("Orası", status)

        setDates(
            props.contract.startDate.substring(0, 10)
            + " - " + 
            props.contract.endDate.substring(0, 10)
            + " (" + calculateDateDifference(new Date(props.contract.startDate), new Date(props.contract.endDate)) + " days)"
        )

        setPetName(props.contract.pets[0].name)
        setPetType(props.contract.pets[0].type)

        let user = await getUserName(state.token.token, props.contract.hostId.userId)
        setHostName(
            user.name + " " + user.surname
        )
        
    }, [])

    if(!fontsLoaded){
        return <AppLoading/>
    }

    const handleMessaging = () => {
        props.navigation.navigate("Messaging", {
            contract: props.contract
        })
    }

    const handleReject = async () => {
        setStatus("Rejected");

        await updateContractStatus(state.token.token, props.contract._id, "Rejected");
    }

    const handleAccept = async () => {
        setStatus("Accepted");

        await updateContractStatus(state.token.token, props.contract._id, "Accepted");
    }

    return (
        <View style={styles.container}>
            <Image 
            style={styles.profilePic}
            source={require("../../../assets/icons/avatarWoman.png")}/>
            <View style={styles.infoContainer}>
                <Text style={styles.userName}>{hostName}</Text>
                <View style={styles.petInfo}>
                    <Icon
                        name={petType}
                        type="font-awesome-5"
                        size={10}
                        color='black'
                        style={styles.petIcon}
                    />
                    <Text style={styles.petName}>{petName}</Text>
                </View>
                <Text style={styles.contractInfo}>{dates}</Text>
            </View>
            <View style={styles.buttonsContainer}>
                <Pressable onPress={() => handleMessaging()}>
                    <Icon
                        name='envelope'
                        type="font-awesome-5"
                        size={20}
                        color='black'
                        solid
                        style={styles.petIcon}
                    />
                </Pressable>
                {
                    status === "On Going" ?

                        <View>
                            <Text style={styles.onGoing}>On Going</Text>
                        </View>

                        :

                        status === "Completed" ?

                        <View>
                            <Text style={styles.completed}>Completed</Text>
                        </View>

                        :

                        status === "Rejected" ?

                        <View>
                            <Text style={styles.rejected}>Rejected</Text>
                        </View>

                        :

                        status === "Accepted" ?

                        <View>
                            <Text style={styles.accepted}>Accepted</Text>
                        </View>

                        :

                        <View style={styles.buttonsContainer}>
                            <Pressable onPress={() => handleReject()}>
                                <Icon
                                    name='times'
                                    type="font-awesome-5"
                                    size={20}
                                    color='#FF0000'
                                    style={styles.petIcon}
                                />
                            </Pressable>
                            <Pressable onPress={() => handleAccept()}>
                                <Icon
                                    name='check'
                                    type="font-awesome-5"
                                    size={20}
                                    color='#00FF19'
                                    style={styles.petIcon}
                                />
                            </Pressable>
                        </View>
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flexDirection:"row",
        marginBottom:10
    },
    profilePic:{
        width: 55,
        height: 55,
        overflow: 'hidden',
        borderRadius: 55,
        borderWidth: 1,
        borderColor: "black"
    },
    infoContainer:{
        minWidth:230,
        flexDirection:"column",
        justifyContent:"space-around",
        marginLeft:10
    },
    userName:{
        fontFamily:"Roboto_700Bold",
        fontSize:15
    },
    petInfo:{
        flexDirection:"row",
        alignItems:"center"
    },
    petIcon:{
        marginRight:5
    },
    petName:{
        fontFamily:"Roboto_700Bold_Italic",
        fontSize:12
    },
    contractInfo:{
        fontFamily:"Roboto_700Bold_Italic",
        fontSize:12
    },
    buttonsContainer:{
        flex:1,
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-around"
    },
    completed:{
        fontFamily: "Roboto_700Bold_Italic",
        fontSize: 15,
        color: "#00FF19"
    },
    rejected:{
        fontFamily: "Roboto_700Bold_Italic",
        fontSize: 15,
        color: "#FF0101"
    },
    onGoing:{
        fontFamily: "Roboto_700Bold_Italic",
        fontSize: 15,
        color: "#D98236"
    },
    canceled:{
        fontFamily: "Roboto_700Bold_Italic",
        fontSize: 15,
        color: "#464040"
    },
    accepted:{
        fontFamily: "Roboto_700Bold_Italic",
        fontSize: 15,
        color: "#0066FF"
    },
})