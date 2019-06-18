import React from 'react';
import { View, Text, StyleSheet, Image } from "react-native";

export default function ExistingReport(props) {
    //console.log('props=', props.imgName);
    let sourceImg = `../../assets/images/${props.imgName}`;
    console.log('sourceimg=', sourceImg);

    return (
        <View style={styles.form}>

            <View style={styles.forms}>
                <View style={styles.txtform}>
                    <Text style={styles.txtRight}>
                        בחדרה ברחוב הנשיא בוצע שוד בבית עסק{"\n"}
                        20:00
                </Text>
                </View>
                <View style={styles.picform}>
                    <Image source={require('../../assets/images/buglery.png')} style={styles.img}></Image>
                </View>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    form: {
        justifyContent: 'space-between',

    },
    forms: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingBottom: 25,

    },
    picform: {
        backgroundColor: '#FFFEFE',
        borderRadius: 8,
        width: 73,
        height: 48,
        marginRight: 5,
        justifyContent: 'center',
        alignItems: 'center',

    },
    txtform: {
        backgroundColor: '#FFFEFE',
        borderRadius: 8,
        marginRight: 10,

        textAlign: 'center',
    },
    txtRight: {
        fontSize: 10,
        textAlign: 'right',
        paddingHorizontal: 8,
    },
    img: {
        width: 40,
        height: 37,

    },
})