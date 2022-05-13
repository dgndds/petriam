import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, Dimensions, Pressable } from 'react-native';
import {useFonts, Roboto_700Bold,Roboto_700Bold_Italic  } from "@expo-google-fonts/roboto"
import { Icon } from 'react-native-elements';
import AppLoading from 'expo-app-loading';
import { useSelector } from 'react-redux';
import { createConversation, getUserName, updateContractStatus } from '../../api/RestApiFunctions';

export default function ContractUnit(props) {
    const [dates, setDates] = useState("");
    const [petName, setPetName] = useState("");
    const [hostName, setHostName] = useState("");
    const [name, setName] = useState("");
    const [petType, setPetType] = useState("");
    const [status, setStatus] = useState("");
    const state = useSelector(state => state);
    const [oppositeSender, setOppositeSender] = useState({});
    let [fontsLoaded, err] = useFonts({
        Roboto_700Bold,
        Roboto_700Bold_Italic
    })

    const calculateDateDifference =  (date1: Date, date2: Date) => {
        let timeDiff = date2.getTime() - date1.getTime();
        let diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
        return diffDays;
    }

    const handleStatus = async (status: string) => {
        let endDateDifferenceFromToday = calculateDateDifference(new Date(), new Date(props.contract.endDate));
        let startDateDifferenceFromToday = calculateDateDifference(new Date(), new Date(props.contract.startDate));
        
        console.log("endDateDifferenceFromToday", endDateDifferenceFromToday)
        console.log("startDateDifferenceFromToday", startDateDifferenceFromToday)
        console.log(props.contract.status)

        console.log(props.contract.hostId.userId)
        console.log(state.id.id)

        if(props.contract.status.toLowerCase() === "sent" && props.contract.hostId.userId !== state.id.id){
            setStatus("sent");
        }else{
            if(props.contract.status === "Accepted"){
                if(endDateDifferenceFromToday > 0 && startDateDifferenceFromToday < 0){
                    setStatus("On Going");
                    await updateContractStatus(state.token.token, props.contract._id, "On Going");
                }
                else if(endDateDifferenceFromToday < 0 && startDateDifferenceFromToday < 0){
                    setStatus("Completed");
                    await updateContractStatus(state.token.token, props.contract._id, "Completed");
                }
            }else{
                if(endDateDifferenceFromToday < 0 && startDateDifferenceFromToday < 0){
                    setStatus("Passed");
                    await updateContractStatus(state.token.token, props.contract._id, "Passed");
                }
            }
        }
    }

    useEffect(async () => {

        console.log("GELLLLLL: " + props.contract.hostId.userId)
        console.log("GELLLLLL: " + JSON.stringify(props.contract))

        let endDateDifferenceFromToday = calculateDateDifference(new Date(), new Date(props.contract.endDate));
        let startDateDifferenceFromToday = calculateDateDifference(new Date(), new Date(props.contract.startDate));
        if(props.contract.status.toLowerCase() === "sent" && props.contract.hostId.userId !== state.id.id){
            setStatus("sent");
        }else{
            setStatus(props.contract.status);
        }
        if(props.contract.status === "Accepted"){
            if(endDateDifferenceFromToday > 0 && startDateDifferenceFromToday < 0){
                setStatus("On Going");
                await updateContractStatus(state.token.token, props.contract._id, "On Going");
            }
            else if(endDateDifferenceFromToday < 0 && startDateDifferenceFromToday < 0){
                setStatus("Completed");
                await updateContractStatus(state.token.token, props.contract._id, "Completed");
            }
        }else if(props.contract.status !== "Completed"){
            if(endDateDifferenceFromToday < 0 && startDateDifferenceFromToday < 0){
                setStatus("Passed");
                await updateContractStatus(state.token.token, props.contract._id, "Passed");
            }
        }
        

        setDates(
            props.contract.startDate.substring(0, 10)
            + " - " + 
            props.contract.endDate.substring(0, 10)
            + " (" + calculateDateDifference(new Date(props.contract.startDate), new Date(props.contract.endDate)) + " days)"
        )

        let user = await getUserName(state.token.token, props.contract.hostId.userId)
        setHostName(
            user.name + " " + user.surname
        )

        setPetName(props.contract.pets[0].name)
        setPetType(props.contract.pets[0].type)

        //console.log("GELLAAAA"+ JSON.stringify(props.contract))
        let hostUser = await getUserName(state.token.token, props.contract.hostId.userId)
        let ownerUser = await getUserName(state.token.token, props.contract.ownerId._id)
        
        //console.log("GELLAAAA"+ JSON.stringify(hostUser))
        if(state.id.id !== hostUser._id){
            console.log("host", hostUser);
            setOppositeSender(hostUser);
        }else{
            console.log("suer", ownerUser);
            setOppositeSender(ownerUser);
        }
        console.log(hostUser._id)
        console.log(ownerUser._id)
        console.log(state.id.id)
        console.log("BURRR:", props.contract.ownerId._id)

        //console.log("oppositeSender: " + JSON.stringify(oppositeSender))
        
    }, [])

    if(!fontsLoaded){
        return <AppLoading/>
    }

    const handleMessaging = async () => {
        console.log("Bak: " + props.contract.hostId.userId)
        let conversation = await createConversation(state.token.token, props.contract.hostId.userId);
        console.log("CCCCCCCCCCConversation: " + JSON.stringify(conversation))
        props.navigation.navigate("MessagePage", {conversationId: conversation._id, ownerId: oppositeSender, name: hostName})
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
                <Text style={styles.userName}>{oppositeSender.name + " " + oppositeSender.surname}</Text>
                <View style={styles.petInfo}>
                    <Icon
                        name={petType === "turtle" ? "grin-alt" : petType}
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

                        status === "Passed" ?

                        <View>
                            <Text style={styles.canceled}>Passed</Text>
                        </View>

                        :


                        status === "sent" ?

                        <View>
                            <Text style={styles.canceled}>Sent</Text>
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