import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Picker, TextInput, ActivityIndicator } from "react-native";
import { LinearGradient, Notifications } from 'expo';
import { NavigationActions } from 'react-navigation';

import registerForPushNotificationsAsync from '../UserToken/registerForPushNotificationsAsync';

import LogoApp from './LogoApp'



export default class PhonePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            areaCode: "054",
            phone: "",
            fontLoaded: false,
            isValidInput: false,
        }
    }

    componentDidMount = () => {
        registerForPushNotificationsAsync()
            .then(tok => {
                this.setState({ token: tok });
                console.log(tok);
            });
        this._notificationSubscription = Notifications.addListener(this._handleNotification);
        this.setState({ fontLoaded: true })
    }

    _handleNotification = (notification) => {
        this.setState({ notification: notification });
        let res = notification.data;

        alert(`${res.phone} -- ${res.code}`);
    };

    HandlePhoneChange = (value) => {
        let p = value.replace(".", "");
        let phone = p.replace("-", "");


        if (p.length <= 7) {
            this.setState({ phone });
        }
        if (p.length === 7) {
            this.setState({ isValidInput: true })
        }
        else {
            this.setState({ isValidInput: false })
        }

    }

    btnOnSubmitPhone = async () => {
        const data = {
            token: this.state.token,
            phone: this.state.areaCode + this.state.phone,
            code: 1111,
        }

        const navigateAction = NavigationActions.navigate({
            routeName: 'CodeVerification',
            params: data,
            action: NavigationActions.navigate({ routeName: 'PhonePage' }),
        });

        this.props.navigation.dispatch(navigateAction);

    }

    render() {
        if (!this.state.fontLoaded) {
            return (
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <LinearGradient
                        colors={["#358FE2", "#2C0A8C"]}
                        start={[0.1, 0.1]}
                        style={{
                            flex: 1,
                            left: 0,
                            right: 0,
                            top: 0,
                        }}>

                        <ActivityIndicator style={{ flex: 1 }} size="large" color="#ff0000" />

                    </LinearGradient>
                </View>
            );
        }

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
                    <View style={styles.container}>
                        <LogoApp />
                        <Text style={styles.headerText}>הזן מספר טלפון</Text>

                        <View style={styles.form}>

                            <View style={styles.pickerView}>
                                <Picker
                                    selectedValue={this.state.areaCode}
                                    mode='dropdown'
                                    style={styles.picker}
                                    itemStyle={styles.itemPicker}
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
                            <View style={this.state.isValidInput ? styles.phoneInputView : styles.phoneInvalidInputView}>
                                <TextInput
                                    maxLength={7}
                                    keyboardType="numeric"
                                    style={styles.textInput}
                                    onChangeText={this.HandlePhoneChange}
                                    value={this.state.phone}
                                >
                                </TextInput>

                            </View>

                        </View>
                        <View style={styles.btnSubmitView}>
                            <TouchableOpacity
                                style={styles.btnTH}
                                disabled={this.state.isValidInput ? false : true}
                                onPress={this.btnOnSubmitPhone}>
                                <Text style={styles.submitText}>המשך</Text>
                            </TouchableOpacity >
                        </View>
                    </View>
                </LinearGradient>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        marginBottom: 0,
        direction: 'rtl',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerText: {
        paddingBottom: 20,
        paddingTop: 50,
        color: '#FFFEFE',
        fontSize: 18,
        fontFamily: 'open-sans-light',
    },
    form: {
        margin: 0,
        padding: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 50,
    },
    pickerView: {
        paddingTop: 3,
        borderColor: '#FFFEFE',
        borderRadius: 20,
        borderWidth: 1,
        paddingHorizontal: 10,
        height: 40,
        width: 112,
    },
    picker: {
        color: '#FFFEFE',
        height: 25,
        width: 100,
    },
    itemPicker: {
        textAlign: 'center',
    },
    phoneInputView: {
        borderColor: '#FFFEFE',
        borderRadius: 20,
        borderWidth: 1,
        width: 182,
        height: 40,
    },
    phoneInvalidInputView: {
        borderColor: '#FF0000',
        borderRadius: 20,
        borderWidth: 1,
        width: 182,
        height: 40,
    },
    textInput: {
        paddingTop: 2,
        color: '#FFFEFE',
        width: 182,
        height: 40,
        fontSize: 16,
        paddingHorizontal: 45,
    },
    btnSubmitView: {
        margin: 0,
        paddingTop: 50,
        paddingBottom: 50,
        alignItems: 'center',
        width: 120,
    },
    btnTH: {
        width: 120,
        padding: 14,
        paddingBottom: 5,
        paddingTop: 5,
        backgroundColor: '#FFFEFE',
        borderRadius: 20,
    },
    submitText: {
        fontSize: 16,
        color: 'black',
        fontFamily: 'open-sans-light',
        textAlign: 'center',
    },
});