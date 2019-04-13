import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableHighlight, Picker, TextInput } from "react-native";
import LogoApp from './LogoApp'

export default class PhonePage extends Component {
    constructor() {
        super();
        this.state = {
            areaCode: "054",
            phone: ""
        }
    }

    HandlePhoneChange = (phone) => {
        this.setState({ phone });
    }

    render() {
        return (
            <View style={styles.container}>

                <LogoApp />

                <Text style={styles.text}>הזן מספר טלפון</Text>

                <View style={styles.form}>
                    <View style={styles.picker}>
                        <Picker
                            selectedValue={this.state.areaCode}

                            mode='dropdown'
                            style={{ height: 50, width: 100 }}
                            onValueChange={(itemValue) =>
                                this.setState({ areaCode: itemValue })
                            }>
                            <Picker.Item label="054" value="054" />
                            <Picker.Item label="058" value="058" />
                            <Picker.Item label="055" value="055" />
                            <Picker.Item label="053" value="053" />
                            <Picker.Item label="052" value="052" />
                            <Picker.Item label="050" value="050" />
                            <Picker.Item label="057" value="057" />

                        </Picker>
                    </View>
                    <TextInput
                        style={styles.input}
                        onChangeText={this.HandlePhoneChange}
                        value={this.state.phone}

                        multiline={true}
                        dataDetectorTypes='phoneNumber'
                    ></TextInput>
                </View>
                <View style={styles.con}>

                    <TouchableHighlight
                        style={styles.button}
                        onPress={this.onPressStart}>
                        <Text style={{ color: 'white' }}>המשך</Text>
                    </TouchableHighlight>

                </View>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 0,
        direction: 'rtl',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        paddingBottom: 20,
        paddingTop: 50,
        color: '#000000',
        fontSize: 18,
    },
    form: {
        flex: 1,
        flexDirection: 'row',
    },
    picker: {
        borderRadius: 20,
        borderWidth: 2,
        width: 100,
        height: 50,
    },
    input: {
        borderRadius: 20,
        borderWidth: 2,
        width: 250,
        height: 50,
        paddingTop: 2,
        paddingBottom: 2,
    },
    con: {
        flex: 1,
        margin: 0,
        paddingTop: 50,
        alignItems: 'center',
    },
    button: {
        padding: 14,
        paddingTop: 10,
        paddingRight: 30,
        backgroundColor: '#000000',
        borderRadius: 20,
    },
    submitText: {
        textAlign: 'center',
        fontSize: 18,
        color: 'white',
    }
}
);