import React from 'react';
import { SafeAreaView, StyleSheet, View, Text, Image, FlatList } from 'react-native';
import SearchBox from '../../components/searchBox/searchBox';
import SelectDropdown from 'react-native-select-dropdown'
import { Icon } from 'react-native-elements';

export default function ListHost() {

    const petIcons = [
        (
            <Image
                style={{ width: 30, height: 30 }}
                source={require('../../../assets/icons/dove.png')} />
        ),
        (
            <Image
                style={{ width: 30, height: 30 }}
                source={require('../../../assets/icons/cat.png')} />
        ),
        (
            <Image
                style={{ width: 30, height: 30 }}
                source={require('../../../assets/icons/turtle.png')} />
        ),
        (
            <Image
                style={{ width: 30, height: 30, justifyContent: 'center' }}
                source={require('../../../assets/icons/pet.png')} />
        ),
    ]

    const cities = [
        "Ankara",
        "Istanbul",
        "Eskişehir"
    ]

    const chevronDownIcon = (
        <Icon
            name='expand-more'
            size={50}
            color='#707070'
        />
    );

    const resultsData = [
        {
            name: "John Doe",
            imgUrl: "../../../assets/icons/avatarWoman.png",
            address: "Bilkent University Cankaya / Ankara",
            animal: "dog",
            price: 55
        }
    ]



    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.filters}>
                <SearchBox text="SEARCH HOSTS" />
                <View style={styles.parameters}>
                    <View style={styles.animal}>
                        <SelectDropdown
                            rowStyle={{ width: 100, paddingLeft: 24 }}
                            data={petIcons}
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
                            buttonStyle={{ width: 100, justifyContent: 'center', alignSelf: 'center', borderRadius: 20 }}
                            defaultValue={petIcons[0]}
                        />
                    </View>
                    <View style={styles.cities}>
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
                            buttonStyle={{ width: 140, borderRadius: 20 }}
                            defaultValue={cities[0]}
                        />
                    </View>
                    <View style={styles.more}>
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
                            buttonStyle={{ width: 75, borderRadius: 20 }}
                            defaultButtonText="More"
                            disabled
                        />
                    </View>
                </View>
            </View>
            <View style={styles.results}>
                <FlatList
                style={{marginTop: 100}}
                    data={resultsData}
                    renderItem={({ item }) => (
                        <View style={styles.result}>
                            <View style={styles.profilePicture}>
                                <Image
                                    style={styles.profilePictureImage}
                                    source={item.imgUrl} />
                            </View>
                            <View style={styles.info}>
                                <Text style={{ fontWeight: 'bold', marginLeft: 10 }}>{item.name}</Text>
                                <Text style={{ marginLeft: 10 }}>{item.address}</Text>
                            </View>
                            <View style={styles.price}>
                                <Text style={{ fontWeight: 'bold' }}>{item.price}<Text style={{ fontSize: 20 }}>₺</Text><Text>  <Text style={{ fontWeight: 'normal' }}>per night</Text></Text></Text>

                                <View style={{ flexDirection: 'row', marginTop: 7 }}>
                                    <Image
                                        style={{ width: 22, height: 22 }}
                                        source={require('../../../assets/icons/cat.png')} />
                                    <Text style={{ marginLeft: 10 }}>{item.animal} Host</Text>
                                </View>
                            </View>
                        </View>
                    )}
                />
            </View>
            <View style={styles.navbar}>

            </View>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F2F2',
    },
    filters: {
        flex: 1,
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center'
    },
    parameters: {
        flex: 1,
        flexDirection: 'row'
    },
    animal: {
        flex: 1
    },
    cities: {
        flex: 1,
    },
    more: {
        flex: 1,
        position: 'relative',
        right: -33
    },
    results: {
        flex: 3,
        backgroundColor: 'green',
        paddingHorizontal: 20
    },
    result: {
        flex: 1,
        flexDirection: 'row',
        height: 30
    },
    profilePicture: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    profilePictureImage: {
        width: 50,
        height: 50,
        overflow: 'hidden',
        borderRadius: 50,
        borderWidth: 3,
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