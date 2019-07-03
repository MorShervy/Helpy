import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Picker, TextInput, ActivityIndicator } from "react-native";
import { LinearGradient } from 'expo';
import { NavigationActions } from 'react-navigation';
import SQL from '../Handlers/SQL';
import PushNotification from '../Handlers/PushNotification';
import LogoApp from '../components/LogoApp';

const CODE = '1111';
const regexNum = /^[0-9]*$/;
export default class PhonePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            areaCode: "054",
            phone: "",
            laoding: false,
            flag: false,
        }
    }

    _handleChange = (value) => {
        this.setState({ phone: value },
            () => {
                if (this.state.phone.length > 6) {
                    // valid phone length
                    const phone = this.state.areaCode + this.state.phone;
                    this._regexNumTest(phone);

                }
                else if (this.state.flag) {
                    //console.log('valid phone has changed to invalid phone')
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
            const phone = await this.state.areaCode + this.state.phone;
            const userDetails = await SQL.UserExist(phone) //not an object yet
            //console.log('userDetails=', JSON.parse(userDetails));
            const user = JSON.parse(userDetails); //return object now we can use user.
            console.log('user=', user)
            //await this.props.onLogin(userDetails);
            if (user.UserID !== undefined) {
                //console.log('user exist');

                // update token in case it was changed from last time asyncToken
                const token = await PushNotification.UpdatePushNotificationToken(user.Phone, user.Token)
                this.setState({
                    token: token,
                    userId: user.UserID,
                    isUserExist: true
                });
            }
            else {
                //console.log('user not exist');
                // insert user 
                const token = await PushNotification.Register();
                //console.log('token=', token)

                const newUser = await SQL.Register(phone, CODE, token, new Date().toString());
                console.log('newUser=', newUser);
                const u = JSON.parse(newUser);
                console.log('u=', u)
                this.setState({
                    token: token,
                    userId: u.UserID,
                    isUserExist: false
                });
            }

            await PushNotification.SendCodeByPushNotification(this.state.token, CODE)

            // pass data to next page
            const data = {
                id: this.state.userId,
                token: this.state.token,
                isExist: this.state.isUserExist
            }

            // navigation action
            const navigateAction = NavigationActions.navigate({
                routeName: 'CodeVerification',
                params: data,
                action: NavigationActions.navigate({ routeName: 'PhonePage' }),
            });

            this.setState({ loading: false })
            this.props.navigation.dispatch(navigateAction);
        }
        catch (error) {
            this.setState({ loading: false })
            console.log(error);
        }

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
                        <Text style={styles.txtHeader}>הזן מספר טלפון</Text>

                        <View style={styles.form}>

                            <View style={styles.pickerView}>
                                <Picker
                                    selectedValue={this.state.areaCode}
                                    mode='dropdown'
                                    style={styles.picker}
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

                        {this.state.loading ? <ActivityIndicator style={{ flex: 1, paddingTop: 70 }} size="large" color="#ff0000" /> :
                            <View style={styles.btnView}>
                                <TouchableOpacity
                                    style={styles.btnSubmit}
                                    disabled={this.state.flag ? false : true}
                                    onPress={this._handleRegisterAndLogin}>
                                    <Text style={styles.txtSubmit}>המשך</Text>
                                </TouchableOpacity >
                            </View>
                        }
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
    txtHeader: {
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
    btnView: {
        margin: 0,
        paddingTop: 50,
        paddingBottom: 50,
        alignItems: 'center',
        width: 120,
    },
    btnSubmit: {
        width: 120,
        padding: 14,
        paddingBottom: 5,
        paddingTop: 5,
        backgroundColor: '#FFFEFE',
        borderRadius: 20,
    },
    txtSubmit: {
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