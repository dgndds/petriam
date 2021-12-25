import React from 'react';
import { SafeAreaView, StyleSheet, View, Image } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE, MAP_TYPES } from "react-native-maps";
import Navi from '../../components/general/navi';


export default function Main() {
    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: -3.722,
                    longitude: -38.515,
                    latitudeDelta: 0.09,
                    longitudeDelta: 0.04
                }}
            >
                <Marker
                    description='host 1'
                    coordinate={{
                        latitude: -3.723,
                        longitude: -38.515,
                    }}
                >
                    <Image
                        style={styles.hostMarker}
                        source={require('../../../assets/icons/pet.png')}
                    />
                </Marker>
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