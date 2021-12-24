import React from 'react';
import { SafeAreaView, StyleSheet, View, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import NavigationBar from '../../components/navigationBar/navigationBar';
import SearchBox from '../../components/searchBox/searchBox';


export default function Main() {
    return (
        <SafeAreaView style={styles.container}>
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
                        source={require('../../../assets/icons/cat.png')}
                    />
                </Marker>
            </MapView>
        </SafeAreaView>
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