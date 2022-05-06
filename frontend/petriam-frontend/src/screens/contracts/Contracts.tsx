import React, { useEffect, useState } from 'react';
import { StyleSheet, Platform, SafeAreaView,Text, View, Image} from 'react-native';
import {useFonts, Roboto_700Bold, Roboto_700Bold_Italic  } from "@expo-google-fonts/roboto"
import { ScrollView } from 'react-native-gesture-handler';
import ContractUnit from "../../components/ContractUnit/ContractUnit"
import Navi from '../../components/general/navi';
import AppLoading from 'expo-app-loading';
import { Icon } from 'react-native-elements';
import { useSelector } from 'react-redux';
import { getContracts } from '../../api/RestApiFunctions';

export default function Contracts({navigation}) {
    const [contracts, setContracts] = useState([]);
    const state = useSelector(state => state);
    let [fontsLoaded, err] = useFonts({
        Roboto_700Bold,
    })

    useEffect(async () => {
        setContracts(
            await getContracts(state.token.token)
        )
    }, [])

    if(!fontsLoaded){
        return <AppLoading/>
    }

    return (
        <SafeAreaView style={styles.container}> 
            <ScrollView contentContainerStyle={{
                paddingBottom:80
            }}>
                <View>
                    <View style={styles.pageTitleContainer}>
                        <Icon 
                            name='chevron-left'
                            size={50}
                            color= '#707070'
                            style={{marginLeft:-15}}
                            onPress={() => navigation.pop()}
                        />
                        <Text style={styles.pageTitle}>Contracts</Text>
                    </View>

                    <View
                    style={{
                        borderBottomColor: 'black',
                        borderBottomWidth: 1,
                        marginBottom:15
                    }}
                    />
                </View>
                <View style={styles.contractList}>
                    {
                        contracts.map(contract => {
                            return (
                                <ContractUnit 
                                    key={contract._id} 
                                    contract={contract}
                                    navigation={navigation}
                                />
                                )
                            }
                        )
                    }
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
        flex: 1,
        backgroundColor:"#F2F2F2",
        marginTop: Platform.OS === 'android' ? 25 : 0,
    },
    contractTitle:{
        fontFamily:"Roboto_700Bold",
        fontSize:30
    },
    navbar:{
        position:"absolute",
        bottom:0,
        width:"100%"
    },
    pageTitleContainer:{
        flexDirection:"row",
        alignItems: "flex-start",
        padding: 10
    },
    pageTitle:{
        fontFamily:"Roboto_700Bold",
        fontSize:25,
        marginTop: 10
    },
    contractList: {
        padding: 5
    }
})