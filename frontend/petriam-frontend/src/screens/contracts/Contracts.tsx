import React from 'react';
import { StyleSheet, Platform, SafeAreaView,Text, View, Image} from 'react-native';
import {useFonts, Roboto_700Bold,Roboto_700Bold_Italic  } from "@expo-google-fonts/roboto"
import { ScrollView } from 'react-native-gesture-handler';
import ContractUnit from "../../components/ContractUnit/ContractUnit"
import Navi from '../../components/general/navi';

export default function Contracts() {
    let [fontsLoaded, err] = useFonts({
        Roboto_700Bold,
      })

    return (
        <SafeAreaView style={styles.container}> 
            <ScrollView contentContainerStyle={{
                paddingBottom:80
            }}>
                <View>
                    <Text style={styles.contractTitle}>Contracts</Text>
                    <View
                    style={{
                        borderBottomColor: 'black',
                        borderBottomWidth: 1,
                        marginBottom:15
                    }}
                    />
                </View>
                <View>
                    <ContractUnit></ContractUnit>
                    <ContractUnit></ContractUnit>
                    <ContractUnit></ContractUnit>
                    <ContractUnit></ContractUnit>
                    <ContractUnit></ContractUnit>
                    <ContractUnit></ContractUnit>
                    <ContractUnit></ContractUnit>
                    <ContractUnit></ContractUnit>
                    <ContractUnit></ContractUnit>
                    <ContractUnit></ContractUnit>
                    <ContractUnit></ContractUnit>
                    <ContractUnit></ContractUnit>
                    <ContractUnit></ContractUnit>
                    <ContractUnit></ContractUnit>
                    <ContractUnit></ContractUnit>
                    <ContractUnit></ContractUnit>
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
        paddingLeft:10,
        paddingRight:10
    },
    contractTitle:{
        fontFamily:"Roboto_700Bold",
        fontSize:30
    },
    navbar:{
        position:"absolute",
        bottom:0,
        width:"100%"
    }
})