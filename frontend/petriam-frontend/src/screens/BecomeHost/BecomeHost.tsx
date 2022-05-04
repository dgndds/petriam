import React, { useEffect, useState } from 'react';
import {StyleSheet,SafeAreaView,Text,Platform, View, Image,ScrollView, TextInput, Pressable, } from 'react-native';
import {useFonts, PlayfairDisplay_400Regular} from "@expo-google-fonts/playfair-display"
import {Roboto_700Bold } from "@expo-google-fonts/roboto"
import AppLoading from 'expo-app-loading';
import { Icon } from 'react-native-elements';
import Navi from '../../components/general/navi';
import { useSelector } from 'react-redux';
import { becomeHost } from '../../api/RestApiFunctions';


export default function BecomeHost({navigation}){
    const [userId,setUserId] = useState('');
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
        console.log(state.id.id);
        setUserId(state.id.id);
    }, [])

    const handleSubmit = () => {
        console.log(becomeHost());

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

        // console.log("submit")


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
                <View>
                    <Text style={styles.label}>Name</Text>
                    <TextInput style={styles.box} value={name} onChangeText={setName} placeholder='Type Your Name'  autoCapitalize='none'/>
                    
                    <Text style={styles.label}>Surname</Text>
                    <TextInput style={styles.box} value={surname} onChangeText={setSurname} placeholder='Type Your Surname'  autoCapitalize='none'/>
                    
                    <Text style={styles.label}>Email</Text>
                    <TextInput style={styles.box} value={email} onChangeText={setEmail} placeholder='Type Your Email'  autoCapitalize='none'/>
                    
                    <Text style={styles.label}>Identification Number</Text>
                    <TextInput style={styles.box} value={tc} onChangeText={setTc} placeholder='Type Your Identification Number'  autoCapitalize='none'/>
                    
                    <Text style={styles.label}>HES Code</Text>
                    <TextInput style={styles.box} value={hes} onChangeText={setHes} placeholder='Type Your Hes Code'  autoCapitalize='none'/>
                    
                    <Text style={styles.label}>Criminal Record</Text>
                    <Pressable><Text style={styles.upload}>Upload a File</Text></Pressable>
                    
                    <Text style={styles.label}>Address</Text>
                    <TextInput style={styles.box} value={address} onChangeText={setAddress} placeholder='Type Your Address'  autoCapitalize='none'/>
                    
                    <Text style={styles.label}>Price Per Night</Text>
                    <TextInput style={styles.box} value={price} onChangeText={setPrice} placeholder='Type Your Price Per Night'  autoCapitalize='none'/>
                    
                    <Text style={styles.label}>Languages</Text>
                    <TextInput style={styles.box} value={languages} onChangeText={setLanguages} placeholder='Type Your Languages'  autoCapitalize='none'/>
                    
                    <Text style={styles.label}>Pets</Text>
                    <View style={styles.buttonGrid}>
                        <Pressable style={handleSelected("dog")} onPress={()=>handlePet("dog")}><Text>Dog</Text></Pressable>
                        <Pressable style={handleSelected("cat")} onPress={()=>handlePet("cat")}><Text>Cat</Text></Pressable>
                        <Pressable style={handleSelected("bird")} onPress={()=>handlePet("bird")}><Text>Bird</Text></Pressable>
                        <Pressable style={handleSelected("fish")} onPress={()=>handlePet("fish")}><Text>Fish</Text></Pressable>
                        <Pressable style={handleSelected("turtle")} onPress={()=>handlePet("turtle")}><Text>Turtle</Text></Pressable>
                        <Pressable style={handleSelected("hamster")} onPress={()=>handlePet("hamster")}><Text>Hamster</Text></Pressable>
                        <Pressable style={handleSelected("rabbit")} onPress={()=>handlePet("rabbit")}><Text>Rabbit</Text></Pressable>
                        <Pressable style={handleSelected("other")} onPress={()=>handlePet("other")}><Text>Other</Text></Pressable>
                    </View>
                    
                    <Text style={styles.label}>About</Text>
                    <TextInput multiline style={styles.textBox} value={about} onChangeText={setAbout} placeholder='About Yourself'  autoCapitalize='none'/>
                </View>
                <Pressable style={styles.submitButton} onPress={handleSubmit}><Text style={styles.submitButtonText}>Become A Host</Text></Pressable>
            </ScrollView>
            <Navi></Navi>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#F2F2F2",
        marginTop: Platform.OS === 'android' ? 25 : 0,
    },
    pageTitleContainer:{
        flexDirection:"row",
        alignItems:"center"
    },
    pageTitle:{
        fontFamily:"Roboto_700Bold",
        fontSize:25,
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
    }
})