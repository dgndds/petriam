import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View, Image, Pressable, Text } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE, MAP_TYPES } from "react-native-maps";
import { useSelector } from 'react-redux';
import { getHostsFiltered } from '../../api/RestApiFunctions';
import Navi from '../../components/general/navi';
import SearchBox from '../../components/searchBox/searchBox';
import { StackNavigator } from 'react-navigation';

export default function Main({navigation}) {
    const state = useSelector(state => state);
    const [hosts, setHosts] = useState([]);
    const [selectedMarker, setSelectedMarker] = useState("");

    useEffect(() => {
        console.log(state.token.token)
        const getHosts = async () => {
            setHosts(
                Array.from(
                    await getHostsFiltered(100,'Cat',39.925533, 32.866287, 100000000, state.token.token)
                )
            );
        }

        getHosts();
        console.log(hosts);

    }, [])
    
    const pressedOnMarker = (marker: string) => {
        if(marker === selectedMarker){
            navigation.navigate("HostPage"); //, {host: hosts[marker]}
        }else{
            setSelectedMarker(marker);
        }
    }

    const handleImage = (animal: string) => {
        
        switch (animal) {
            case "cat":
              return require('../../../assets/icons/cat.png')
          case "dog":
              return require('../../../assets/icons/dog.png')
          case "dove":
              return require('../../../assets/icons/dove.png')
          case "turtle":
              return require('../../../assets/icons/turtle.png')
          default:
              return require('../../../assets/icons/cat.png')
          }
    }

    return (
        <View style={styles.container}>
            <View style={styles.searchContainer}><SearchBox style={styles.searchBar} nextPage={() => navigation.navigate("ListHost")}></SearchBox></View>
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: 39.925533,
                    longitude: 32.866287,
                    latitudeDelta: 0.09,
                    longitudeDelta: 0.04
                }}
            >
                {
                    hosts.map(item => {
                        var icon = handleImage(item.host.acceptedPets[0].toLowerCase());
                        return (
                            <Marker
                                key={item.email}
                                title={item.name}
                                description={"Average Rating " + item.host.averageRating}
                                coordinate={{
                                    latitude: item.location.coordinates[0],
                                    longitude: item.location.coordinates[1],
                                }}
                            >
                                <Pressable onPress={() => pressedOnMarker(item._id)}>
                                    <Image 
                                        source={icon} 
                                        style={styles.marker} 
                                    />
                                </Pressable>
                            </Marker>
                        )
                    })
                }
            </MapView>
            <Navi 
                goToInbox={() => navigation.navigate("InboxScreen")}
                goToBecomeHost={() => navigation.navigate("BecomeHost")}
                goToProfile={() => navigation.navigate("ProfilePage")}
                goToContract={() => navigation.navigate("ContractsPage")}
            />
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F2F2',
    },
    searchContainer:{
        height:45,
        position:"absolute",
        zIndex:10,
        alignSelf:"center",
        marginTop:50
    },
    searchBar:{
        // alignItems:"flex-start",
        // height:5
    },
    map: {
        flex: 1,
        position:"relative"
    },
    marker: {
        width: 35,
        height: 35
    }
});