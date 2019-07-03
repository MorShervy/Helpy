import React from 'react';
import { View, Text, StyleSheet, Dimensions } from "react-native";
import Img from './Img';

const { width, height } = Dimensions.get("window");

export default function ExistingReport(props) {
    console.log('props=', props.report);

    return (

        <View style={styles.form}>

            <View style={styles.forms}>
                <View style={styles.txtform}>
                    <Text style={styles.txtRight}>
                        {props.report.Info}{"\n"}
                        {`${props.report.Time.substring(0, 5)} ${props.report.Date.substring(0, 10)}`}
                    </Text>
                </View>
                <View style={styles.picform}>
                    <Img report={props.report} />
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
        width: width - 30,
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
        width: 290,
        textAlign: 'center',
    },
    txtRight: {
        fontSize: 12,
        fontWeight: 'bold',
        textAlign: 'right',
        paddingTop: 5,
        paddingHorizontal: 8,
    },

})