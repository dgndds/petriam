import React from 'react';
import { StyleSheet, Text, View, Image, TextInput } from 'react-native';
import { Icon } from 'react-native-elements'


export default function SearchBox(props) {
    return (
        <View style={styles.search}>
            <View style={styles.searchContainer}>
                <View style={styles.searchIcon}>
                    <Image
                        style={styles.icon}
                        source={require('../../../assets/icons/search.png')} />
                </View>
                <TextInput
                    placeholder={props.text}
                    style={styles.textInput}
                />
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    search: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textInput: {
        flex: 1,
        
    },
    searchIcon: {
        flex: 0.2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        height: 27, width: 27
    },
    searchContainer: {
        backgroundColor: 'white',
        width: '90%',
        height: 40,
        flexDirection: 'row',
        borderRadius: 30
    },
});