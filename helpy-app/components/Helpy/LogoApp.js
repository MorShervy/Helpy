import React, { Component } from "react";
import { StyleSheet, View, Image } from "react-native";

export default class LogoApp extends Component {
    render() {
        return (
            <View style={styles.logo}>
                <Image style={styles.image} source={require("../../assets/logo.png")} />
            </View>
        )
    }
}


const styles = StyleSheet.create({
    image: {
        width: 129,
        height: 129,
    },
    logo: {
        alignItems: 'center',
        paddingTop: 150,
    },
})