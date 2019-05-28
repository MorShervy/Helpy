import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity
} from "react-native";

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
                    <View style={styles.content}>
                        <View style={{
                            borderColor: 'black',
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
                                //image={require('../assets/icon.png')}
                                />
                            </MapView>
                        </View>
                    </View>
                    <View style={styles.btnView}>
                        <TouchableOpacity
                            style={styles.btnTouchOpacity}
                            onPress={this.getHomeLocation}
                        >
                            <Text style={styles.txtSubmit2}>Show Home</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.btnView}>
                        <TouchableOpacity
                            style={styles.btnTouchOpacity}
                            onPress={this.getCurrentLocation}
                        >
                            <Text style={styles.txtSubmit2}>Show Location</Text>
                        </TouchableOpacity>
                    </View>
                </LinearGradient>
            </View>
        );
    }
}
export default MainApp;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 70,
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
});