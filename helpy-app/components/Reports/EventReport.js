import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ActivityIndicator, Image } from "react-native";
import { LinearGradient, Location, Permissions } from 'expo';
import { Button } from 'react-native-elements';
import { NavigationActions } from 'react-navigation';

import MenuButton from '../General/MenuButton';
import LogoApp from '../General/LogoApp';


export default class EventReports extends Component {

    constructor(props) {
        super(props);
        this.state = {
            location: null,
            reportInfo: ''
        }
    }

    componentDidMount = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            console.log('Permission to access location was denied')
        }

        const location = await Location.getCurrentPositionAsync({});
        //console.log(location);
        this.setState({ location });
    }

    _handleInsertReport = () => {
        // insert report
        console.log('param=', this.props.navigation.state.params)
        console.log('locatiot=', this.state.location.coords)
        console.log('reportInfo=', this.state.reportInfo)
    }


    render() {


        return (

            <View style={{ flex: 1 }}>
                <LinearGradient
                    colors={["#358FE2", "#2C0A8C"]}
                    start={[0.1, 0.1]}
                    style={{
                        flex: 1,
                        left: 0,
                        right: 0,
                        top: 0,
                    }}>



                    <View style={styles.container}>

                        <MenuButton />

                        <LogoApp styles={[styles.logo, styles.image]} />
                        <Text style={styles.headerText}  >האירוע</Text>
                        <View style={styles.textInput}>
                            <TextInput
                                multiline={true}
                                maxLength={1000}
                                placeholder='דווח כאן'
                                textAlign='right'
                                style={{ color: '#fff', paddingHorizontal: 10, fontSize: 22 }}
                                underlineColorAndroid='transparent'
                                onChangeText={(reportInfo) => this.setState({ reportInfo })}
                                value={this.state.text}
                            >
                            </TextInput>

                        </View>

                        <View style={{ display: "flex", flexDirection: 'row', justifyContent: 'space-between', paddingTop: 50, marginLeft: 62, marginRight: 62 }}>
                            <View style={{ padding: 10 }}>
                                <TouchableOpacity
                                    style={styles.button}
                                    onPress={() => { console.log('mic clicked') }}>

                                    <Image
                                        source={require('../../assets/images/mic.png')}
                                        style={styles.ImageIconStyle}

                                    />

                                </TouchableOpacity>
                            </View>
                            <View style={{ padding: 10 }}>
                                <TouchableOpacity
                                    style={styles.button}
                                    onPress={() => { console.log('image clicked') }}>

                                    <Image
                                        source={require('../../assets/images/image.png')}
                                        style={styles.ImageIconStyle}

                                    />

                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.btnSubmitView}>
                            <TouchableOpacity
                                style={styles.btnTH}
                                onPress={this._handleInsertReport}
                            >
                                <Text style={styles.submitText}>שלח דיווח!</Text>
                            </TouchableOpacity >
                        </View>
                    </View>
                </LinearGradient>
            </View >
        )
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerText: {
        paddingBottom: 10,
        paddingTop: 10,
        fontSize: 50,

    },
    button: {
        width: 145,
        height: 113,
        backgroundColor: '#FFFEFE',
        alignItems: 'center',
        borderRadius: 20,

    },
    btnSubmitView: {
        margin: 0,
        paddingTop: 50,
        paddingBottom: 50,
        alignItems: 'center',
        width: 120,
    },
    btnTH: {
        width: 120,
        padding: 14,
        paddingBottom: 5,
        paddingTop: 5,
        backgroundColor: '#FA0000',
        borderRadius: 20,
    },
    submitText: {
        fontSize: 16,
        color: '#fff',
        textAlign: 'center',
    },

    ImageIconStyle: {
        padding: 10,
        margin: 5,
        height: 100,
        width: 100,
        justifyContent: 'center',

    },

    textInput: {

        paddingTop: 2,
        paddingBottom: 5,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 20,
        color: '#FFFEFE',
        width: 300,
        height: 150,
        fontSize: 30,


    },
    logo: {
        alignItems: 'center',
        paddingTop: 50,
    },
    image: {
        width: 55,
        height: 55,
    },
})