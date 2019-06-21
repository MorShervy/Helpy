import React, { Component } from "react";
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, ScrollView, Image } from "react-native";
import MenuButton from '../General/MenuButton';
import ExistingReport from '../Reports/ExistingReprot';
import LogoApp from '../General/LogoApp';

import { LinearGradient, MapView } from 'expo';
const { Marker } = MapView;


class MainApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            latitude: 0.0,
            longitude: 0.0,
        }
    }

    componentDidMount = async () => {
        await navigator.geolocation.getCurrentPosition(
            (position) => {
                const output =
                    'latitude=' + position.coords.latitude +
                    '\nlongitude=' + position.coords.longitude +
                    '\naltitude=' + position.coords.altitude +
                    //alert(output);
                    this.setState(
                        {
                            latitude: position.coords.latitude,// +  Math.random()/1000,
                            longitude: position.coords.longitude
                        });
            },
            (error) => alert(error.message),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );
    }

    getHomeLocation = async () => {
        // let { status } = await Permissions.askAsync(Permissions.LOCATION);
        // if (status !== 'granted') {
        //     alert('Permission to access location was denied');
        // }
        // await Location.geocodeAsync((address) => {
        //     const output =
        //         'latitude=' + address.coords.latitude +
        //         '\nlongitude=' + address.coords.longitude

        //     console.log('Address.somthing', address)
        // })
        this.setState({
            latitude: 32.332671,
            longitude: 35.014287,
        })
    }

    getCurrentLocation = async () => {
        await navigator.geolocation.getCurrentPosition(
            (position) => {
                const output =
                    'latitude=' + position.coords.latitude +
                    '\nlongitude=' + position.coords.longitude +
                    '\naltitude=' + position.coords.altitude +
                    //alert(output);
                    this.setState(
                        {
                            latitude: position.coords.latitude,// +  Math.random()/1000,
                            longitude: position.coords.longitude
                        });
            },
            (error) => alert(error.message),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );
    }

    render() {
        return (
            <View style={{ flex: 1 }}>

                <LinearGradient
                    colors={['#358FE2', '#2C0A8C']}
                    start={[0.1, 0.1]}
                    style={{
                        flex: 1,
                        left: 0,
                        right: 0,
                        top: 0,
                    }}
                >
                    <ScrollView>
                        <MenuButton />
                        <LogoApp styles={[styles.logo, styles.image]} />
                        <View style={styles.btnStatus}>
                            <TouchableOpacity
                                style={styles.btnSubmitTH2}
                                onPress={() => { console.log('clicked') }}

                            >

                                <Text style={styles.txtSubmit3}>מצב דיווח</Text>
                            </TouchableOpacity >
                        </View>
                        <View style={styles.content}>
                            <View style={{
                                borderColor: '#fff',
                                borderWidth: 2,
                                height: 300,
                            }}>
                                <MapView
                                    style={{
                                        flex: 2,
                                        width: Dimensions.get('window').width - 30,
                                        height: 300,
                                    }}
                                    region={{
                                        latitude: this.state.latitude,
                                        longitude: this.state.longitude,
                                        latitudeDelta: 0.0322,
                                        longitudeDelta: 0.0321,
                                    }}
                                >

                                    <Marker
                                        coordinate={{
                                            latitude: this.state.latitude,
                                            longitude: this.state.longitude
                                        }}
                                        title='my place:)'
                                        description='here i am'
                                    >
                                        {/* <Image
                                            style={{ height: 40, width: 40 }}
                                            source={require('../../assets/images/buglery.png')} /> */}
                                    </Marker>
                                </MapView>
                            </View>
                        </View>

                        <View style={styles.container}>
                            <Text style={styles.headerReport}>דיווחים קיימים</Text>

                            <ExistingReport imgName="buglery.png" />
                            <ExistingReport imgName="fire.png" />

                            <View style={styles.btnSubmitView}>
                                <TouchableOpacity
                                    style={styles.btnSubmitTH}
                                    onPress={() => { this.props.navigation.navigate('ReportType') }}
                                >
                                    <Text style={styles.txtSubmit2}>הוסף דיווח</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>
                </LinearGradient>
            </View>
        );
    }
}
export default MainApp;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    content: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 50,
        marginBottom: 30,
    },
    btnTouchOpacity: {
        padding: 14,
        paddingTop: 10,
        paddingHorizontal: 8,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'white',
    },
    btnView: {
        margin: 0,
        paddingTop: 20,
        alignItems: 'center',
    },
    txtSubmit2: {
        fontSize: 16,
        color: 'white',
        textAlign: 'center',
    },
    logo: {
        alignItems: 'center',
        paddingTop: 50,
    },
    image: {
        width: 55,
        height: 55,
    },
    btnSubmitView: {
        width: 120,
        paddingTop: 25,
        paddingBottom: 50,
        alignItems: 'center',
    },
    btnSubmitTH: {
        width: 120,
        padding: 14,
        paddingBottom: 5,
        paddingTop: 5,
        backgroundColor: '#FA0000',
        borderRadius: 20,
    },
    txtSubmit2: {
        fontSize: 12,
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    btnStatus: {
        width: 120,
        zIndex: 9,
        position: 'absolute',
        top: 55,
        left: 20,
    },
    btnSubmitTH2: {
        width: 120,
        padding: 14,
        paddingBottom: 5,
        paddingTop: 5,
        backgroundColor: '#fff',
        borderRadius: 20,
    },
    txtSubmit3: {
        fontSize: 12,
        color: 'black',
        textAlign: 'center',
    },
    headerReport: {
        color: '#F6E8E8',
        fontSize: 24,
        textAlign: 'center',

    },
    contentContainer: {
        flex: 1,
        paddingVertical: 20
    }
});

