import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Image, TextInput, Pressable } from 'react-native';
import { Icon } from 'react-native-elements'
import { StackNavigator } from 'react-navigation';


export default function SearchBox(props, {navigation}) {
    return (
        <View style={styles.search}>
            <Pressable style={styles.searchContainer} onPress={() => props.nextPage()}>
                <View style={styles.searchIcon}>
                    <Image
                        style={styles.icon}
                        source={require('../../../assets/icons/search.png')} />
                </View>
                <TextInput
                    placeholder={props.text}
                    style={styles.textInput}
                />
            </Pressable>
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