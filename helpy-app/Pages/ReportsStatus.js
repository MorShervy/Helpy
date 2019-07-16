import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Picker, TextInput, ActivityIndicator, Image } from "react-native";
import { LinearGradient, Notifications } from 'expo';

import { NavigationActions } from 'react-navigation';
import ExistingReport from '../components/ExistingReprot';
import MenuButton from '../components/MenuButton';
import LogoApp from '../components/LogoApp';

import ScrollableTabView, { DefaultTabBar, ScrollableTabBar } from 'react-native-scrollable-tab-view-forked';





export default class ReportsStatus extends Component {

    constructor(props) {
        super(props);


        this.state = {

            reports: this.props.navigation.state.params,


        }
    }


    render() {
        var dataForTab1 = this.state.reports.filter(function (item) {
            return item.ReportStatus == '1';
        }).map(function (obj) {
            return obj.Time + '-' + obj.Info + '\n';
        });
        console.log("datttta1=", dataForTab1);


        var dataForTab2 = this.state.reports.filter(function (item) {
            return item.ReportStatus == '2';
        }).map(function (obj) {
            return obj.Time + '-' + obj.Info + '\n';
        });
        console.log("datttta2=", dataForTab2);

        var dataForTab3 = this.state.reports.filter(function (item) {
            return item.ReportStatus == '3';
        }).map(function (obj) {
            return obj.Time + '-' + obj.Info + '\n';
        });
        console.log("datttta3=", dataForTab3);
        { if (dataForTab1 == 0) { dataForTab1 = "אין דיווחים" } }
        { if (dataForTab2 == 0) { dataForTab2 = "אין דיווחים" } }
        { if (dataForTab3 == 0) { dataForTab3 = "אין דיווחים" } }


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
                        <Text style={styles.headerText}  >מצב הדיווח</Text>


                    </View>

                    <View style={{ height: 200 }}>
                        <ScrollableTabView
                            style={styles.scrollStyle}
                            initialPage={0}
                            renderTabBar={() => <ScrollableTabBar />}
                        >

                            <Text tabLabel='התקבל' style={styles.reportsResivedStyle}>{dataForTab1}</Text>
                            <Text tabLabel='בטיפול' style={styles.reportsInCareStyle}>{dataForTab2}</Text>
                            <Text tabLabel='טופל' style={styles.reportsOldStyle}>{dataForTab3}</Text>

                        </ScrollableTabView>

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
    reportsInCareStyle: {
        textAlign: "right",

    },
    reportsResivedStyle: {


    },
    reportsOldStyle: {
        textAlign: "right",

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
        backgroundColor: '#000000',
        borderRadius: 20,
    },
    submitText: {
        fontSize: 16,
        color: '#FFFEFE',

        textAlign: 'center',
    },

    ImageIconStyle: {
        padding: 10,
        margin: 5,
        height: 100,
        width: 100,
        justifyContent: 'center',

    },


    logo: {
        alignItems: 'center',
        paddingTop: 50,
    },
    image: {
        width: 55,
        height: 55,
    },


    tabStyle: {

    },
    scrollStyle: {

        backgroundColor: 'white',
        borderRadius: 3,
        justifyContent: 'center',

    },
    tabBarTextStyle: {
        fontSize: 15,
        fontWeight: 'normal',
    },
    underlineStyle: {
        height: 3,
        backgroundColor: 'red',
        borderRadius: 3,
        width: 15,
    },


})