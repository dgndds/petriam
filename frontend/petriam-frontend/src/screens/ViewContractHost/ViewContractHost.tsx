import React, { useState } from 'react';
import {StyleSheet,SafeAreaView,Text,Platform, View, Image,ScrollView, Pressable } from 'react-native';
import { Icon } from 'react-native-elements';
import {useFonts,Roboto_700Bold } from "@expo-google-fonts/roboto"
import {PlayfairDisplay_700Bold, PlayfairDisplay_400Regular} from "@expo-google-fonts/playfair-display"
import AppLoading from 'expo-app-loading';
import Navi from '../../components/general/navi';

export default function ViewContractHost(){
    const [isHost,setIsHost] = useState(true);

    let [fontsLoaded, err] = useFonts({
        PlayfairDisplay_700Bold,
        PlayfairDisplay_400Regular,
        Roboto_700Bold
      })

      if (!fontsLoaded) {
        return <AppLoading />;
      }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView nestedScrollEnabled contentContainerStyle={{
                paddingLeft:15,
                paddingRight:15,
                paddingBottom:25
            }}>
                <View>
                    <View style={styles.pageTitleContainer}>
                        <Icon 
                            name='chevron-left'
                            size={50}
                            color= '#707070'
                            style={{marginLeft:-15}}
                        />
                        <Text style={styles.pageTitle}>Contract - <Text style={styles.status}>Awaiting</Text></Text>
                    </View>
                    <View style={{borderBottomColor:"black", borderBottomWidth:1}}></View>
                </View>
                <View>
                    <Text style={styles.hostTitle}>Host</Text>
                    <View style={styles.hostInfoContainer}>
                        <Image
                        style={styles.profilePic}
                        source={require("../../../assets/icons/avatarWoman.png")}/>
                        <View style={styles.nameAndAddress}>
                            <View style={styles.nameTag}>
                                    <Text style={styles.profileName}>John Doe</Text> 
                                    <Icon
                                    name='check-circle'
                                    type="font-awesome"
                                    size={23}
                                    color='black'
                                    />
                                    <Icon 
                                    name='chevron-right'
                                    size={30}
                                    color= 'black'
                                    /> 
                            </View>
                            <Text style={styles.addressContainer}>Address: <Text style={styles.address}>Ankara / Turkey</Text></Text>
                        </View>
                    </View>
                    <View style={styles.priceAndRatingContainer}>
                        <View style={styles.priceContainer}>
                            <Text style={styles.priceTitle}>Price</Text>
                            <Text style={styles.priceLabel}><Text style={styles.price}>55</Text> TL</Text>
                            <Text style={styles.perdayTitle}>Per Day</Text>
                        </View>
                        <View>
                            <Icon
                                name='dog'
                                type="font-awesome-5"
                                size={40}
                                color='black'
                            />
                            <Text style={styles.petText}>Dog Owner</Text>
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
                </View>
                <View style={{borderBottomColor:"black", borderBottomWidth:1}}></View>
                <View>
                    <Text style={styles.hostTitle}>Owner</Text>
                    <View style={styles.hostInfoContainer}>
                        <Image
                        style={styles.profilePic}
                        source={require("../../../assets/icons/avatarWoman.png")}/>
                        <View style={styles.nameAndAddress}>
                            <View style={styles.nameTag}>
                                    <Text style={styles.profileName}>John Doe</Text> 
                                    <Icon
                                    name='check-circle'
                                    type="font-awesome"
                                    size={23}
                                    color='black'
                                    />
                                    <Icon 
                                    name='chevron-right'
                                    size={30}
                                    color= 'black'
                                    /> 
                            </View>
                            <Text style={styles.addressContainer}>Address: <Text style={styles.address}>Ankara / Turkey</Text></Text>
                        </View>
                    </View>
                    <View style={styles.commentContainer}>
                        <Text style={styles.commentTitle}>Comment</Text>
                        <ScrollView nestedScrollEnabled  style={styles.commentBox} 
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
                            egestas tellus dapibus non. Suspendisse potenti. Cras vitae libero lacus.Lorem ipsum dolor sit amet, consectetur adipiscing elit. In id 
                            fringilla metus, ut suscipit felis. Mauris mollis enim a orci sollicitudin,
                            et dapibus ipsum mat-tis. Maecenas faucibus et tortor vel laoreet. Nunc mattis 
                            lorem ex, nec interd-um justo vehicula at. Mauris sollicitudin metus mauris, ac 
                            egestas tellus dapibus non. Suspendisse potenti. Cras vitae libero lacus.
                            </Text>
                        </ScrollView>
                    </View>
                    <View style={{borderBottomColor:"black", borderBottomWidth:1}}></View>
                    <View style={styles.petContainer}>
                        <Image
                        style={styles.profilePic}
                        source={require("../../../assets/profilepicw.jpg")}
                        />
                        <Text style={styles.petName}>Pet Name</Text>
                        <View style={styles.info}>
                            <Text style={styles.infoText}>Age: <Text style={styles.infoData}>5</Text></Text>
                            <Text style={styles.infoText}>Kind: <Text style={styles.infoData}>Terrier</Text></Text>
                            <Text style={styles.infoText}>About: <Text style={styles.infoData}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing
                                elit. Proin neque mauris, fringilla ut scelerisque 
                                eget, auctor non nisl. Integer sed eros at odio vehicula 
                                pulvinar. Nulla vitae ante in risus faucibus mattis. 
                                Aenean leo diam, iaculis quis nunc vestibulum, accumsan 
                                tempus dui. Phasellus non dolor ultrices, eleifend augue 
                                ac, viverra metus. Aenean sed justo pellentesque, luctus 
                                eros sit amet, varius justo. Fusce tincidunt, metus et porttitor 
                                placerat, ips</Text>
                            </Text>
                        </View>
                    </View>
                    <View style={{borderBottomColor:"black", borderBottomWidth:1}}></View>
                    <View style={styles.buttonsContainer}>
                        <Icon
                            name='envelope'
                            type="font-awesome-5"
                            size={20}
                            color='black'
                            solid
                        />
                        {isHost&&(
                        <>
                        <Icon
                            name='times'
                            type="font-awesome-5"
                            size={20}
                            color='#FF0000'
                        />
                        <Icon
                            name='check'
                            type="font-awesome-5"
                            size={20}
                            color='#00FF19'
                        />
                        </>)}
                    </View>
                </View>
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
    status:{
        color:"#FFC107"
    },
    hostTitle:{
        fontFamily:"PlayfairDisplay_700Bold",
        fontSize:20,
        marginBottom:10
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
    addressContainer:{
        fontFamily:"PlayfairDisplay_700Bold",
        fontSize:15,
        color:"black"
    },
    address:{
        fontFamily:"PlayfairDisplay_400Regular",
        fontWeight:"400"
    },
    hostInfoContainer:{
        flexDirection:"row",
        alignItems:"center",
    },
    nameAndAddress:{
        flexDirection:"column",
        marginLeft:15
    },
    priceAndRatingContainer:{
        width:350,
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        alignSelf:"center"
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
    petText:{
        fontFamily:"Roboto_700Bold",
        fontSize:15,
        color:"black",
        marginRight:5
    },
    commentContainer:{
        marginTop:15,
        marginBottom:15
    },
    commentTitle:{
        fontFamily:"PlayfairDisplay_700Bold",
        fontSize:20,
        marginBottom:10
    },
    commentBox:{
        height:150,
        borderColor:"black",
        borderWidth:1,
        borderStyle:"solid",
        borderRadius:10
    },
    petContainer:{
        marginRight:10,
        borderStyle:"solid",
        alignItems:"center",
        marginBottom:15,
        marginTop:15
    },
    petName:{
        fontFamily:"PlayfairDisplay_700Bold_Italic",
        fontSize:15,
        marginBottom:3,
        marginTop:2
    },
    info:{
        alignSelf:"baseline",
        // width:120,
    },
    infoText:{
        fontSize:15,
        fontWeight:"700"
    },
    infoData:{
        fontWeight:"400"
    },
    buttonsContainer:{
        marginTop:10,
        marginBottom:10,
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-around"
    }
})