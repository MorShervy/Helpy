import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import Img from './Img';
import { MapView } from 'expo';
const { Marker } = MapView;

export default function ExistingReprotOnMap(props) {
    console.log(props.report.TypeID)


    return (
        <View>
            <Marker
                coordinate={{
                    latitude: props.report.Latitude,
                    longitude: props.report.Longitude
                }}
                title={props.report.TypeName}

            >
                <Img report={props.report} />
            </Marker>
        </View>
    )
}


