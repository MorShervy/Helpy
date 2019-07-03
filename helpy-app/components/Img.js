import React from 'react';
import { View, Image } from "react-native";

export default function Img(props) {

    switch (props.report.TypeID) {
        case 1:
            return (
                <View>
                    <Image
                        style={{ height: 37, width: 33 }}
                        source={require('../assets/images/kidnapped.png')}
                    />
                </View>
            )

        case 2:
            return (
                <View>
                    <Image
                        style={{ height: 37, width: 33 }}
                        source={require('../assets/images/car-crash.png')}
                    />
                </View>
            )

        case 3:
            return (
                <View>
                    <Image
                        style={{ height: 37, width: 33 }}
                        source={require('../assets/images/fire.png')}
                    />
                </View>
            )

        case 4:
            return (
                <View>
                    <Image
                        style={{ height: 37, width: 33 }}
                        source={require('../assets/images/heart.png')}
                    />
                </View>
            )

        case 5:
            return (
                <View>
                    <Image
                        style={{ height: 37, width: 33 }}
                        source={require('../assets/images/hitting.png')}
                    />
                </View>
            )

        case 6:
            return (
                <View>
                    <Image
                        style={{ height: 37, width: 33 }}
                        source={require('../assets/images/buglery.png')}
                    />
                </View>
            )

        default:
            <Image
                style={{ height: 37, width: 33 }}
                source={require('../assets/images/man.png')}
            />
    }
}