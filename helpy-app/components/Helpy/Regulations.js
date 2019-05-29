import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from 'expo';

class Regulations extends Component {
    render() {
        return (
            <View style={{ flex: 1 }}>
                <LinearGradient
                    colors={['#358FE2', '#2C0A8C']}
                    start={[0.1, 0.1]}
                    style={{
                        flex: 1,
                        left: 0,
                        right: 0,
                        top: 0,
                    }}
                >
                    <Text>Regulations</Text>
                </LinearGradient>
            </View>
        );
    }
}
export default Regulations;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});