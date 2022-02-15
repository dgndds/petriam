import React from 'react';
import { SafeAreaView, StyleSheet, View, Text, Image, FlatList } from 'react-native';
import SearchBox from '../../components/searchBox/searchBox';
import SelectDropdown from 'react-native-select-dropdown'
import { Icon } from 'react-native-elements';
import Navi from '../../components/general/navi';
import AppLoading from 'expo-app-loading';
import {useFonts,Roboto_700Bold, Roboto_400Regular } from "@expo-google-fonts/roboto"
import {PlayfairDisplay_400Regular,PlayfairDisplay_700Bold} from "@expo-google-fonts/playfair-display"
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getHostsFiltered } from '../../api/RestApiFunctions';

interface HostProperties {
    id: string;
    name: string;
    imgUrl: number;
    address: string;
    animal: string;
    price: number;
  }

export default function ListHost({navigation}) {
    const [hosts, setHosts] = useState([]);
    const state = useSelector(state => state);
    //const [resultsData, setResultsData] = useState<HostProperties[]>([]);

    useEffect(() => {
        const getHosts = async () => {
            let result = await getHostsFiltered(32, 39, 100000, state.token.token);
            setHosts(Array.from(result));
        }
        getHosts();
    }, []);
    
/*
TODO: resultsData need to handled as a state
    useEffect(() => {
        var data = [];
        hosts.map(item => {
            let listedHost: HostProperties = {
                id: item._id,
                name: item.email.split(/@(.+)/)[0],
                imgUrl: require("../../../assets/icons/avatarWoman.png"),
                address: "Bilkent University Cankaya / Ankara",
                animal: "dog",
                price: item.host.price
            };
            setResultsData([...resultsData, listedHost]);
        });

    }, [resultsData]);
*/
    var resultsData = [];

    hosts.map(item => {
        let listedHost: HostProperties = {
            id: item._id,
            name: item.email.split(/@(.+)/)[0],
            imgUrl: require("../../../assets/icons/avatarWoman.png"),
            address: "Bilkent University Cankaya / Ankara",
            animal: "dog",
            price: item.host.price
        };
        resultsData.push(listedHost);
    });
    
    console.log(resultsData);

    const petIcons = [
        (
            <Text>Pet</Text>
        ),
        (
            <Image
                style={{ width: 20, height: 20 }}
                type="dove"
                source={require('../../../assets/icons/dove.png')} />
        ),
        (
            <Image
                style={{ width: 20, height: 20 }}
                type="cat"
                source={require('../../../assets/icons/cat.png')} />
        ),
        (
            <Image
                style={{ width: 20, height: 20 }}
                type="turtle"
                source={require('../../../assets/icons/turtle.png')} />
        ),
        (
            <Image
                style={{ width: 20, height: 20 }}
                type="dog"
                source={require('../../../assets/icons/pet.png')} />
        ),
    ]

    const cities = [
        "City",
        "Ankara",
        "Istanbul",
        "Eskişehir"
    ]

    const chevronDownIcon = (
        <Icon
            name='caret-down'
            type="font-awesome-5"
            size={20}
            color='black'
        />
    );

    let [fontsLoaded,err] = useFonts({
        Roboto_700Bold,
        Roboto_400Regular,
        PlayfairDisplay_400Regular,
        PlayfairDisplay_700Bold
    })

    if(!fontsLoaded){
        return <AppLoading/>
    }

    function updatePetImage(animal:string){
        switch(animal){
            case "dog":{
                return require('../../../assets/icons/pet.png')
            }
            case "cat":{
                return require('../../../assets/icons/cat.png')
            }
            case "dove":{
                return require('../../../assets/icons/dove.png')
            }
            case "turtle":{
                return require('../../../assets/icons/turtle.png')
            }
            default:{
                return require('../../../assets/icons/cat.png')
            }
        }
        
    }

    return (
        <View style={styles.container}>
            <View style={styles.filters}>
                <SearchBox text="SEARCH HOSTS" />
                <View style={styles.parameters}>
                    <View>
                        <SelectDropdown
                            rowStyle={{ width: 100 }}
                            data={petIcons}
                            onSelect={(selectedItem, index) => {
                                console.log(selectedItem.props.type)
                                //setResultsData(resultsData.filter(item => item.animal === selectedItem.props.type));
                            }}
                            buttonTextAfterSelection={(selectedItem, index) => {
                                // text represented after item is selected
                                // if data array is an array of objects then return selectedItem.property to render after item is selected
                                return selectedItem
                            }}
                            rowTextForSelection={(item, index) => {
                                // text represented for each item in dropdown
                                // if data array is an array of objects then return item.property to represent item in dropdown
                                return item
                            }}
                            renderDropdownIcon={() => chevronDownIcon}
                            dropdownIconPosition='right'
                            buttonStyle={{ width: 75, justifyContent: 'center', alignSelf: 'center', borderRadius: 10 , borderWidth:1,borderColor:"black"}}
                            defaultValue={petIcons[0]}
                        />
                    </View>
                    <View>
                        <SelectDropdown
                            data={cities}
                            onSelect={(selectedItem, index) => {
                                console.log(selectedItem, index)
                            }}
                            buttonTextAfterSelection={(selectedItem, index) => {
                                // text represented after item is selected
                                // if data array is an array of objects then return selectedItem.property to render after item is selected
                                return selectedItem
                            }}
                            rowTextForSelection={(item, index) => {
                                // text represented for each item in dropdown
                                // if data array is an array of objects then return item.property to represent item in dropdown
                                return item
                            }}
                            renderDropdownIcon={() => chevronDownIcon}
                            dropdownIconPosition='right'
                            buttonStyle={{ width: 150, borderRadius: 10, borderWidth:1, borderColor:"black"}}
                            buttonTextStyle={{fontFamily: "Roboto_400Regular", fontSize:25}}
                            defaultValue={cities[0]}
                        />
                    </View>
                    <View>
                        <SelectDropdown
                            data={[]}
                            onSelect={(selectedItem, index) => {
                                console.log(selectedItem, index)
                            }}
                            buttonTextAfterSelection={(selectedItem, index) => {
                                // text represented after item is selected
                                // if data array is an array of objects then return selectedItem.property to render after item is selected
                                return selectedItem
                            }}
                            rowTextForSelection={(item, index) => {
                                // text represented for each item in dropdown
                                // if data array is an array of objects then return item.property to represent item in dropdown
                                return item
                            }}
                            dropdownIconPosition='right'
                            buttonStyle={{ width: 100, borderRadius: 10, borderWidth:1,borderColor:"black" }}
                            buttonTextStyle={{fontFamily: "Roboto_400Regular", fontSize:25}}
                            defaultButtonText="More"
                            disabled
                        />
                    </View>
                </View>
            </View>
            <View style={styles.results}>
                <FlatList
                    data={resultsData}
                    renderItem={({ item }) => (
                        <View style={styles.result}>
                            <View style={styles.profilePicture}>
                                <Image
                                    style={styles.profilePictureImage}
                                    source={item.imgUrl} />
                            </View>
                            <View style={styles.info}>
                                <Text style={{ fontFamily:"Roboto_700Bold", fontSize:20, marginLeft: 10 }}>{item.name}</Text>
                                <Text style={{ fontFamily:"PlayfairDisplay_400Regular",fontSize:15,color:"#707070",marginLeft: 10 }}>{item.address}</Text>
                            </View>
                            <View style={styles.price}>
                                <Text style={{ fontFamily:"PlayfairDisplay_700Bold", fontSize:20 }}>{item.price}<Text style={{ fontSize: 20 }}>₺</Text><Text>  <Text style={{fontFamily:"PlayfairDisplay_400Regular", fontSize:10 }}>per night</Text></Text></Text>

                                <View style={{ flexDirection: 'row', marginTop: 7 }}>
                                    <Image
                                        style={{ width: 22, height: 22 }}
                                        source={updatePetImage(item.animal) }
                                    />
                                    <Text style={{ fontFamily: "Roboto_400Regular", fontSize:15,marginLeft: 10 }}>{item.animal[0].toUpperCase() + item.animal.slice(1)} Host</Text>
                                </View>
                            </View>
                        </View>
                    )}
                    keyExtractor={(item)=>item.id}
                />
            </View>
            <Navi nextPage={() => navigation.pop()}></Navi>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F2F2',
    },
    filters: {
        minHeight:120,
        // backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 40
    },
    parameters: {
        flexDirection: 'row',
        justifyContent:"space-around",
        width:"100%",
    },
    results: {
        flex:1,
        // backgroundColor: 'green',
    },
    result: {
        flex: 1,
        flexDirection: 'row',
        minHeight:100
    },
    profilePicture: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    profilePictureImage: {
        width: 75,
        height: 75,
        overflow: 'hidden',
        borderRadius: 75,
        borderWidth: 1,
        borderColor: "black"
    },
    info: {
        flex: 3,
        justifyContent: 'center',
    },
    price: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center'
    },
    navbar: {
        flex: 1,
    },
    line: {
        borderBottomColor: 'black',
        borderBottomWidth: 1,
    },
});