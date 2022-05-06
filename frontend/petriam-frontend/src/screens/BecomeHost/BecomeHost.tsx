import React, { useEffect, useState } from 'react';
import {StyleSheet,SafeAreaView,Text,Platform, View, Image,ScrollView, TextInput, Pressable, } from 'react-native';
import {useFonts, PlayfairDisplay_400Regular} from "@expo-google-fonts/playfair-display"
import {Roboto_700Bold } from "@expo-google-fonts/roboto"
import AppLoading from 'expo-app-loading';
import { Icon } from 'react-native-elements';
import Navi from '../../components/general/navi';
import { useSelector } from 'react-redux';
import { becomeHost, getHostApplicationInfo } from '../../api/RestApiFunctions';


export default function BecomeHost({navigation}){
    const [userId,setUserId] = useState('');
    const [hasApplication,setHasApplication] = useState(null);
    const [sendingStatus,setSendingStatus] = useState('Become A Host');
    const [token,setToken] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [tc, setTc] = useState('');
    const [hes, setHes] = useState('');
    const [crimRecord, setCrimRecord] = useState('');
    const [address, setAddress] = useState('');
    const [price, setPrice] = useState('');
    const [languages, setLanguages]= useState('');
    const [pets, setPets]= useState<string[]>([]);
    const [about, setAbout]= useState('');
    const state = useSelector(state => state);

    let [fontsLoaded, err] = useFonts({
        PlayfairDisplay_400Regular,
        Roboto_700Bold
    })

    useEffect(() => {
        console.log("this",state.id.id);
        console.log("token",state.token.token);
        setUserId(state.id.id);
        setToken(state.token.token);

        getHostApplicationInfo(state.token.token).then(
            result => {
                setHasApplication(result);
            }
        );
    }, [])

    const handleSubmit = async () => {
        
        if(userId.length <= 0 || userId === null){
            return false;
        }
        
        if(tc.length <= 0 || tc === null){
            return false;
        }

        if(pets.length <= 0){
            return false;
        }

        if(address.length <= 0 || address === null){
            return false
        }

        if(about.length <= 0 || about === null){
            return false
        }

        let hostInfo = {
            userId: userId,
            tc: tc,
            acceptedPets: pets,
            criminalRecord: "none",
            address: address
        }

        setSendingStatus("Sending...");

       
        await becomeHost(token,userId,tc,about,pets,"none",address).then( result => {
            console.log("err",result);
            if(result === true){
                setSendingStatus("Successfully Registered!");
            }else if(result === "User already is a host"){
                console.log("err",result);
                setSendingStatus("Already a Host");
            }else{
                 setSendingStatus("Failed to Register!");
            }
        });
    }

    if (!fontsLoaded) {
        return <AppLoading />;
    }

    function handlePet(pet:string){
        if(pets.includes(pet)){
            setPets(pets.filter(item => item !== pet));
        }else{
            setPets(oldPets=>[...oldPets, pet])
        }
        
    }

    function handleSelected(pet:string){
        if(pets.includes(pet)){
            return styles.gridButtonSelected
        }else{
            return styles.gridButton
        }
    }
    
    return(
        <SafeAreaView style={styles.container}>
            <ScrollView style={{padding:15}} contentContainerStyle={{
                paddingBottom:60
            }}>
                <View style={styles.pageTitleContainer}>
                    <Icon 
                        name='chevron-left'
                        size={50}
                        color= '#707070'
                        style={{marginLeft:-15}}
                        onPress={() => navigation.pop()}
                    />
                    <Text style={styles.pageTitle}>Become A Host!</Text>
                </View>
                <View style={{borderBottomColor:"black", borderBottomWidth:1}}></View>
                {
                    hasApplication && 
                    <View style={styles.warningContainer}>
                        <Text style={styles.warning}>
                        User Already Has an Active Application
                        </Text>
                    </View>
                }
                {
                    !hasApplication && 
                    <>
                        <View>
                        {/* <Text style={styles.label}>Name</Text>
                        <TextInput style={styles.box} value={name} onChangeText={setName} placeholder='Type Your Name'  autoCapitalize='none'/>
                        
                        <Text style={styles.label}>Surname</Text>
                        <TextInput style={styles.box} value={surname} onChangeText={setSurname} placeholder='Type Your Surname'  autoCapitalize='none'/>
                        
                        <Text style={styles.label}>Email</Text>
                        <TextInput style={styles.box} value={email} onChangeText={setEmail} placeholder='Type Your Email'  autoCapitalize='none'/> */}
                        
                        <Text style={styles.label}>Identification Number</Text>
                        <TextInput style={styles.box} value={tc} onChangeText={setTc} placeholder='Type Your Identification Number'  autoCapitalize='none'/>
                        
                        {/* <Text style={styles.label}>HES Code</Text>
                        <TextInput style={styles.box} value={hes} onChangeText={setHes} placeholder='Type Your Hes Code'  autoCapitalize='none'/> */}
                        
                        {/* <Text style={styles.label}>Criminal Record</Text>
                        <Pressable><Text style={styles.upload}>Upload a File</Text></Pressable> */}
                        
                        <Text style={styles.label}>Address</Text>
                        <TextInput style={styles.box} value={address} onChangeText={setAddress} placeholder='Type Your Address'  autoCapitalize='none'/>
                        
                        <Text style={styles.label}>Price Per Night</Text>
                        <TextInput style={styles.box} value={price} onChangeText={setPrice} placeholder='Type Your Price Per Night'  autoCapitalize='none'/>
                        
                        <Text style={styles.label}>Languages</Text>
                        <TextInput style={styles.box} value={languages} onChangeText={setLanguages} placeholder='Type Your Languages'  autoCapitalize='none'/>
                        
                        <Text style={styles.label}>Pets</Text>
                        <View style={styles.buttonGrid}>
                            <Pressable style={handleSelected("Dog")} onPress={()=>handlePet("Dog")}><Text>Dog</Text></Pressable>
                            <Pressable style={handleSelected("Cat")} onPress={()=>handlePet("Cat")}><Text>Cat</Text></Pressable>
                            <Pressable style={handleSelected("Bird")} onPress={()=>handlePet("Bird")}><Text>Bird</Text></Pressable>
                            <Pressable style={handleSelected("Fish")} onPress={()=>handlePet("Fish")}><Text>Fish</Text></Pressable>
                            <Pressable style={handleSelected("Turtle")} onPress={()=>handlePet("Turtle")}><Text>Turtle</Text></Pressable>
                            <Pressable style={handleSelected("Hamster")} onPress={()=>handlePet("Hamster")}><Text>Hamster</Text></Pressable>
                            <Pressable style={handleSelected("Rabbit")} onPress={()=>handlePet("Rabbit")}><Text>Rabbit</Text></Pressable>
                            <Pressable style={handleSelected("Other")} onPress={()=>handlePet("Other")}><Text>Other</Text></Pressable>
                        </View>
                        
                        <Text style={styles.label}>About</Text>
                        <TextInput multiline style={styles.textBox} value={about} onChangeText={setAbout} placeholder='About Yourself'  autoCapitalize='none'/>
                    </View>
                    <Pressable style={styles.submitButton} onPress={handleSubmit}>
                        <Text style={styles.submitButtonText}>
                            {sendingStatus}
                        </Text>
                    </Pressable>
                    </>
                }
                
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#F2F2F2",
        marginTop: Platform.OS === 'android' ? 25 : 0,
    },
    errorText:{
        marginTop:20,
        fontFamily:"Roboto_700Bold",
        fontSize:25,
        color:"red"  
    },
    pageTitleContainer:{
        flexDirection:"row",
        alignItems: "flex-start"
    },
    pageTitle:{
        fontFamily:"Roboto_700Bold",
        fontSize:25,
        marginTop: 10
    },
    label:{
        fontFamily:"PlayfairDisplay_400Regular",
        fontSize:15,
        marginTop:10
    },
    box: {
        backgroundColor: 'white',
        borderRadius: 18,
        width: "100%",
        height: 43,
        alignSelf: 'center',
        marginTop: 10,
        paddingLeft:15
    },
    upload:{
        fontSize:15,
        color:"#004CFF",
        textDecorationLine: "underline",
        textDecorationStyle: "solid",
        textDecorationColor:"#004CFF",
        marginTop:5
    },
    buttonGrid:{
          flex:1,
          flexDirection:"row",
          flexWrap:"wrap",
          alignItems:"center",
          justifyContent:"center"
    },
    gridButton:{
          width:"20%",
          height:35,
          borderColor:"black",
          borderWidth:1,
          borderRadius:5,
          alignItems:"center",
          justifyContent:"center",
          marginLeft:5,
          marginRight:5,
          marginBottom:10,
    },
    gridButtonSelected:{
        width:"20%",
        height:35,
        borderColor:"green",
        backgroundColor:"#90EE90",
        borderWidth:1,
        borderRadius:5,
        alignItems:"center",
        justifyContent:"center",
        marginLeft:5,
        marginRight:5,
        marginBottom:10,
    },
    textBox:{
        backgroundColor: 'white',
        borderRadius: 15,
        width: "100%",
        height: 100,
        marginTop: 10,
        padding:15,
        textAlignVertical:"top"
    },
    submitButton:{
        height:50,
        backgroundColor:"#D99E6A",
        alignItems:"center",
        borderRadius:50,
        marginTop:25
    },
    submitButtonText:{
        fontFamily:"PlayfairDisplay_700Bold",
        fontSize:30,
        color:"white",
        textAlign:"center"
    },
    infoBox:{
        height:100,
        backgroundColor:"#F2F2F2",
        marginTop:20,
        borderRadius:10,
        borderColor:"black",
        borderWidth:1
    },
    warningContainer:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        height: 500
    },
    warning:{
        fontFamily:"Roboto_700Bold",
        fontSize:20,
        color:"#707070"
    }
})