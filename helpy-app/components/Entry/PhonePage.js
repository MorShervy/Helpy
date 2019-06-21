import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Picker, TextInput, ActivityIndicator } from "react-native";
import { LinearGradient, Notifications } from 'expo';
import { NavigationActions } from 'react-navigation';
import SQL from '../../Handlers/SQL';
import { onLogin } from '../../actions/userAction';
import { connect } from 'react-redux';
import registerForPushNotificationsAsync from '../../Handlers/registerForPushNotificationsAsync';

import LogoApp from '../General/LogoApp';


const regexNum = /^[0-9]*$/;
class PhonePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            areaCode: "054",
            phone: "",
            laoding: false,
            flag: false,
        }
    }

    // componentDidMount = async () => {
    //     await registerForPushNotificationsAsync()
    //         .then(tok => {
    //             this.setState({ token: tok });
    //             console.log(tok);
    //         });
    //     this._notificationSubscription = Notifications.addListener(this._handleNotification);
    //     this.setState({ fontLoaded: true })
    // }

    _handleNotification = (notification) => {
        this.setState({ notification: notification });
        let res = notification.data;

        //alert(`${res.phone} -- ${res.code}`);
    };

    _handleChange = (value) => {
        this.setState({ phone: value },
            () => {
                if (this.state.phone.length > 6) {
                    // valid phone length
                    const phone = this.state.areaCode + this.state.phone;
                    this._regexNumTest(phone);

                }
                else if (this.state.flag) {
                    //console.log('invalid phone has changed from valid phone')
                    this.setState({ flag: false })
                }
            });
    }

    _regexNumTest = (phone) => {
        // phone number validation test
        if (!((regexNum.test(phone) && (phone != "")))) {
            //console.log('please enter a valid phone number');
            //alert('please enter a valid phone number');
            return;
        }
        //console.log('valid phone');
        this.setState({ flag: true });
    }

    _handleRegisterAndLogin = async () => {

        try {
            this.setState({ loading: true });
            const phone = this.state.areaCode + this.state.phone;
            const userDetails = await SQL.UserExist(phone)
            console.log(userDetails);
            debugger;
            this.props.onLogin(userDetails);
        }
        catch (error) {
            this.setState({ loading: false })
            console.log(error);
        }

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

        this.setState({ loading: false })
        this.props.navigation.dispatch(navigateAction);

    }

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
                    <View style={styles.container}>
                        <LogoApp styles={[styles.logo, styles.image]} />
                        <Text style={styles.header}>הזן מספר טלפון</Text>

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
                            <View style={this.state.flag ? styles.validInputView : styles.InvalidInputView}>
                                <TextInput
                                    maxLength={7}
                                    keyboardType="numeric"
                                    style={styles.textInput}
                                    onChangeText={this._handleChange}
                                    value={this.state.phone}
                                >
                                </TextInput>

                            </View>

                        </View>

                        {this.state.loading ? <ActivityIndicator style={{ flex: 1 }} size="large" color="#ff0000" /> :
                            <View style={styles.buttonView}>
                                <TouchableOpacity
                                    style={styles.buttonOpacity}
                                    disabled={this.state.flag ? false : true}
                                    onPress={this._handleRegisterAndLogin}>
                                    <Text style={styles.buttonText}>המשך</Text>
                                </TouchableOpacity >
                            </View>
                        }
                    </View>
                </LinearGradient>
            </View>
        )
    }
}
const mapDispatchToProps = (dispatch) => ({
    onLogin: (userDetails) => dispatch(onLogin(userDetails))
})

export default connect(null, mapDispatchToProps)(PhonePage)

const styles = StyleSheet.create({
    container: {
        marginBottom: 0,
        direction: 'rtl',
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        paddingBottom: 20,
        paddingTop: 50,
        color: '#FFFEFE',
        fontSize: 18,
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
    validInputView: {
        borderColor: '#FFFEFE',
        borderRadius: 20,
        borderWidth: 1,
        width: 182,
        height: 40,
    },
    InvalidInputView: {
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
    buttonView: {
        margin: 0,
        paddingTop: 50,
        paddingBottom: 50,
        alignItems: 'center',
        width: 120,
    },
    buttonOpacity: {
        width: 120,
        padding: 14,
        paddingBottom: 5,
        paddingTop: 5,
        backgroundColor: '#FFFEFE',
        borderRadius: 20,
    },
    buttonText: {
        fontSize: 16,
        color: 'black',
        textAlign: 'center',
    },
    logo: {
        alignItems: 'center',
        paddingTop: 150,
    },
    image: {
        width: 129,
        height: 129,
    },
});