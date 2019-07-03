import React, { Component } from "react";
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, ScrollView, Image, ActivityIndicator } from "react-native";
import { NavigationActions } from 'react-navigation';
import MenuButton from '../components/MenuButton';
import ExistingReport from '../components/ExistingReprot';
import ExistingReprotOnMap from '../components/ExistingReprotOnMap';
import LogoApp from '../components/LogoApp';
import StatusBtn from '../components/StatusBtn';
import SQL from "../Handlers/SQL";

import { LinearGradient, MapView, Location, Permissions } from 'expo';
const { Marker } = MapView;

const { width, height } = Dimensions.get("window");

class MainApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: this.props.navigation.state.params,
            location: null,
            loading: true,
            report: null,
            update: true,
        }
    }


    componentWillMount = async () => {
        console.log('will mount')
        await this._getLocationAndUpdateMap();
    }

    // shouldComponentUpdate = () => {

    //     console.log('shouldUpdate?', this.state.update)

    //     return this.state.update;
    // }

    // componentDidUpdate = async () => {
    //     console.log('will update')
    //     await this._getLocationAndUpdateMap();
    // }

    _getLocationAndUpdateMap = async () => {
        console.log('userid=', this.state.userId)
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            console.log('Permission to access location was denied')
        }

        const location = await Location.getCurrentPositionAsync({});
        //console.log(location);
        this.setState({ location }, async () => {
            if (this.state.location) {
                //let reverseGC = await Location.reverseGeocodeAsync(this.state.location.coords);
                //console.log('reversGC=', reverseGC)
                //this.setState({ reverseGC: reverseGC });
            } else {
                alert('You must push the Location button first in order to get the location before you can get the reverse geocode for the latitude and longitude!');
            }
        });

        const Report = await SQL.GetDailyReportsByLocation(this.state.location.coords.latitude, this.state.location.coords.longitude);

        //console.log("report=", Report);
        const report = await JSON.parse(Report);
        console.log("report=", report);
        this.setState({
            report: report,
            loading: false,
            update: true,
        });
    }
    _handlePressAddReport = async () => {

        const navigateAction = NavigationActions.navigate({
            routeName: 'ReportType',
            params: this.state.userId,
        });
        this.props.navigation.dispatch(navigateAction)
    }

    render() {

        if (this.state.report == null || this.state.loading) {

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
                        <ActivityIndicator style={{ paddingTop: 150 }} size="large" color="#ff0000" />
                    </LinearGradient>
                </View>
            )
        }


        const existingReport = this.state.report.Error === undefined ? this.state.report.map((r, id) => {
            return (
                <ExistingReport key={id} report={r} />
            )
        }) : <Text style={{ fontWeight: 'bold', fontSize: 15 }}>{this.state.report.Error}</Text>;

        const existingReprotOnMap = this.state.report.Error === undefined ? this.state.report.map((r, id) => {
            return (
                <ExistingReprotOnMap key={id} report={r} />
            )
        }) : null;

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
                    <MenuButton />
                    <LogoApp styles={[styles.logo, styles.image]} />
                    <StatusBtn />


                    <View style={styles.view}>
                        <View style={{
                            borderColor: '#fff',
                            borderWidth: 2,
                            height: 350,
                        }}>
                            <MapView
                                style={{
                                    flex: 2,
                                    width: width - 30,
                                    height: 300,
                                }}
                                region={{
                                    latitude: this.state.location.coords.latitude,
                                    longitude: this.state.location.coords.longitude,
                                    latitudeDelta: 0.00822,
                                    longitudeDelta: 0.00821,
                                }}
                            >
                                <Marker
                                    coordinate={{
                                        latitude: this.state.location.coords.latitude,
                                        longitude: this.state.location.coords.longitude
                                    }}
                                    title='me :)'
                                    description='here i am'
                                >
                                </Marker>
                                {existingReprotOnMap}
                            </MapView>
                        </View>
                    </View>

                    <View style={styles.view}>
                        <Text style={styles.txtExistingReport}>דיווחים קיימים</Text>

                        <ScrollView style={{ height: 170, paddingTop: 12 }}>
                            {existingReport}
                        </ScrollView>
                    </View>

                    <View style={[styles.view, { paddingTop: 20 }]}>
                        <TouchableOpacity
                            style={styles.btnAddReport}
                            onPress={this._handlePressAddReport}
                        >
                            <Text style={styles.txtAddReport}>הוסף דיווח</Text>
                        </TouchableOpacity>
                    </View>
                </LinearGradient>
            </View>
        );
    }
}
export default MainApp;

const styles = StyleSheet.create({
    center: {
        alignItems: 'center',
        paddingTop: 15,
    },
    view: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 10,
    },
    logo: {
        alignItems: 'center',
        paddingTop: 50,
    },
    image: {
        width: 55,
        height: 55,
    },
    btnAddReport: {
        width: width - 30,
        height: 45,
        backgroundColor: '#fff',
        borderRadius: 20,
    },
    txtAddReport: {
        fontSize: 25,
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    txtExistingReport: {
        color: '#F6E8E8',
        fontSize: 24,
        textAlign: 'center',
    },
});

