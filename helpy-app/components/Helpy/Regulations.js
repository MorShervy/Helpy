import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from 'expo';
import { CheckBox } from 'react-native-elements'
import { Ionicons } from '@expo/vector-icons';



import MenuButton from './MenuButton';

import LogoApp from './LogoApp'

class Regulations extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: false,
        }
    }
    render() {

        var radio_props = [{ label: 'לאישור לחצו כאן', value: 0 }];

        return (
            <View style={{ flex: 1 }}>
                <LinearGradient
                    colors={['#358FE2', '#2C0A8C']}
                    start={[0.1, 0.1]}
                    style={{ flex: 1, left: 0, right: 0, top: 0 }}
                >
                    <MenuButton />
                    <LogoApp styles={[styles.logo, styles.image]} />
                    <View style={styles.container}>
                        <Text style={styles.txtHeader}>תקנון</Text>
                        <Text style={styles.txtContent}>
                            תקנון זה נועד לצורך זכויות יוצרים{"\n"}
                            והגנה על הפרת זכויות ברורות להלן{"\n"}
                            אפליקציה זו הינה אפליקצית חירום{"\n"}
                            שמיועדת למצבי חירום וקיצון{"\n"}
                            יש להשתמש באפליקציה זו{"\n"}
                            לצורך השימוש המיועד לה בלבד
                        </Text>
                        <View style={{ paddingTop: 50 }}>
                            <CheckBox
                                center
                                iconRight
                                textStyle={{ color: 'white' }}
                                title='לאישור לחצו כאן'
                                containerStyle={{ backgroundColor: 'blue' }}
                                checkedIcon='dot-circle-o'
                                uncheckedIcon='circle-o'
                                checked={this.state.checked}
                                onPress={() => this.setState({ checked: !this.state.checked })}
                            />
                        </View>

                    </View>

                </LinearGradient>
            </View>
        );
    }
}
export default Regulations;

const styles = StyleSheet.create({
    container: {
        marginBottom: 0,
        direction: 'rtl',
        justifyContent: 'center',
        alignItems: 'center',
    },
    txtHeader: {
        color: 'white',
        fontSize: 22,
        paddingTop: 150,
        fontWeight: '300',
        textDecorationLine: 'underline'
    },
    txtContent: {
        color: 'white',
        fontSize: 16,
        paddingTop: 10,
        textAlign: 'center'
    },
    logo: {
        alignItems: 'center',
        paddingTop: 50,
    },
    image: {
        width: 55,
        height: 55,
    },
});