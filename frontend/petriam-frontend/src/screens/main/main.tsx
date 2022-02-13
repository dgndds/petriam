import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View, Image } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE, MAP_TYPES } from "react-native-maps";
import { useSelector } from 'react-redux';
import { getHostsFiltered } from '../../api/RestApiFunctions';
import Navi from '../../components/general/navi';
import SearchBox from '../../components/searchBox/searchBox';
import { StackNavigator } from 'react-navigation';



export default function Main({navigation}) {
    const state = useSelector(state => state);
    const [hosts, setHosts] = useState([]);

    useEffect(() => {
        const getHosts = async () => {
            let result = await getHostsFiltered(32, 39, 100000, state.token.token);
            setHosts(Array.from(result));
        }


        getHosts();

    }, [])


    hosts.map(item => {
        console.log(parseFloat(item.location.coordinates[1]));
        console.log(parseFloat(item.location.coordinates[0]));
        
    });


    //console.log("Bura", state.token.token);

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
                        return (
                            <Marker
                                key={item.email}
                                description={item.name + " " + item.host.averageRating}
                                coordinate={{
                                    latitude: item.location.coordinates[1],
                                    longitude: item.location.coordinates[0],
                                }}
                            >
                                <Image
                                    style={styles.hostMarker}
                                    source={require('../../../assets/icons/pet.png')}
                                />
                            </Marker>
                        )
                    })
                }
            </MapView>
            <Navi nextPage={() => navigation.navigate("InboxScreen")}/>
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
    hostMarker: {
        width: 35,
        height: 35
    }
});