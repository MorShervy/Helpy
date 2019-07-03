import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

export default function StatusBtn(props) {

    return (
        <View style={styles.StatusView}>
            <TouchableOpacity
                style={styles.btnStatus}
                onPress={() => { console.log('clicked') }}
            >
                <Text style={styles.txtStatusReport}>מצב דיווח</Text>
            </TouchableOpacity >
        </View>
    )
}

const styles = StyleSheet.create({
    StatusView: {
        width: 120,
        zIndex: 9,
        position: 'absolute',
        top: 55,
        left: 20,
    },
    btnStatus: {
        width: 120,
        padding: 14,
        paddingBottom: 5,
        paddingTop: 5,
        backgroundColor: '#fff',
        borderRadius: 20,
    },
    txtStatusReport: {
        fontSize: 12,
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'center',
    }
})