import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { LinearGradient } from 'expo';
import { CheckBox } from 'react-native-elements'


import MenuButton from '../General/MenuButton';
import LogoApp from '../General/LogoApp';

class Regulations extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: false,
        }
    }
    render() {

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
                        <View style={{ height: 150 }}>
                            <Text style={styles.txtContent}>
                                תקנון זה נועד לצורך זכויות יוצרים{"\n"}
                                והגנה על הפרת זכויות ברורות להלן{"\n"}
                                אפליקציה זו הינה אפליקצית חירום{"\n"}
                                שמיועדת למצבי חירום וקיצון{"\n"}
                                יש להשתמש באפליקציה זו{"\n"}
                                לצורך השימוש המיועד לה בלבד{"\n"}
                                {"\n"}{"\n"}
                            </Text>
                        </View>
                        <View style={{ paddingTop: 50 }}>
                            <CheckBox
                                center
                                iconRight
                                textStyle={{ color: 'white' }}
                                title='קראתי ואני מאשר/ת את התקנון'
                                containerStyle={{ backgroundColor: '#358FE2', borderColor: '#358FE2' }}
                                checkedIcon='dot-circle-o'
                                uncheckedIcon='circle-o'
                                checkedColor='red'
                                checked={this.state.checked}
                                onPress={() => this.setState({ checked: !this.state.checked })}
                            />
                        </View>
                        <View style={styles.btnSubmitView}>
                            <TouchableOpacity
                                style={styles.btnSubmitTH}
                                onPress={() => { this.props.navigation.navigate('MainApp'); }}
                                disabled={this.state.checked ? false : true}
                            >

                                <Text style={styles.txtSubmit2}>המשך</Text>
                            </TouchableOpacity >
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
        paddingTop: 100,
        fontWeight: '300',
        textDecorationLine: 'underline'
    },
    txtContent: {
        color: 'white',
        fontSize: 16,
        paddingTop: 10,
        paddingBottom: 0,
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
    btnSubmitView: {
        width: 120,
        paddingTop: 50,
        alignItems: 'center',
    },
    btnSubmitTH: {
        width: 120,
        padding: 14,
        paddingBottom: 5,
        paddingTop: 5,
        backgroundColor: '#FFFEFE',
        borderRadius: 20,
    },
    txtSubmit2: {
        fontSize: 16,
        color: 'black',
        textAlign: 'center',
    },
});