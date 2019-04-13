import React, { Component } from "react";
import { LinearGradient } from 'expo';
import { View } from "react-native";
import LoadPage from "./LaodPage";
import PhonePage from './PhonePage';

export default class BgImageColor extends Component {

    render() {
        return (
            <View style={{ flex: 1 }}>
                <LinearGradient
                    colors={['#A0D9D9', '#68A6F0']}
                    start={[0.1, 0.1]}
                    style={{
                        flex: 1,
                        left: 0,
                        right: 0,
                        top: 0,
                    }}
                >
                    {/* 
                    For now check here different pages (one by one) +
                        Enable/Disable import */}

                    <LoadPage />
                    {/* <PhonePage /> */}
                </LinearGradient>
            </View>
        )
    }
}
