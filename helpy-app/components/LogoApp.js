import React from "react";
import { View, Image } from "react-native";

export default function LogoApp(props) {
    //console.log('props=', props)
    return (
        <View style={props.styles[0]}>
            <Image style={props.styles[1]} source={require("../assets/icon.png")} />
        </View>
    )
}