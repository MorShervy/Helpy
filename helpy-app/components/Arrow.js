import React from "react";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";

export default function Arrow(props) {

    return (
        <View style={styles.arrowView}>
            <TouchableOpacity
                onPress={props.handlePress}
            >
                <Image style={{ height: 37, width: 33 }} source={require('../assets/images/arrow.png')} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    arrowView: {
        width: 120,
        zIndex: 9,
        position: 'absolute',
        top: 55,
        left: 20,
    },
});
