import React from 'react';
import { StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function MenuButton() {

    return (
        <Ionicons
            name='md-menu'
            color="#000000"
            size={50}
            style={styles.menuIcon}
            onPress={() => { }}
        />
    );

}

const styles = StyleSheet.create({
    menuIcon: {
        zIndex: 9,
        position: 'absolute',
        top: 50,
        right: 40,
    },
})