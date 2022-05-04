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
        const getHosts = async () => {
            let result = await getHostsFiltered(32, 39, 100000, state.token.token);
            setHosts(Array.from(result));
        }


        getHosts();
        console.log("Hryyo", hosts);

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
                <Marker
                    coordinate={{ latitude : 39.925533 , longitude : 32.866287 }}
                    title={"Mark"}
                    description={"I am desc"}
                >
                    <Image 
                        style={styles.marker}
                        source={require('../../../assets/icons/cat.png')} 
                    />
                </Marker>

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