import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View, Image } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE, MAP_TYPES } from "react-native-maps";
import { useSelector } from 'react-redux';
import { getHostsFiltered } from '../../api/RestApiFunctions';
import Navi from '../../components/general/navi';


export default function Main() {
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
            <Navi />
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F2F2',
    },
    map: {
        flex: 1
    },
    hostMarker: {
        width: 35,
        height: 35
    }
});