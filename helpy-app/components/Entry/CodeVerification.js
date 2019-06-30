import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ActivityIndicator } from "react-native";
import { LinearGradient } from 'expo';
import { NavigationActions } from 'react-navigation';
import PushNotification from '../../Handlers/PushNotification';
import SQL from '../../Handlers/SQL';
import LogoApp from '../General/LogoApp';

const CODE = '1111';
const regexNum = /^[0-9]*$/;
export default class CodeVerification extends Component {
    constructor(props) {
        super(props);
        //console.log('data=', this.props.navigation.state.params);
        alert('Check Push For Code');
        this.state = {
            flag: false,
            loading: false,
        }
    }

    _handleCodeChange = (value) => {
        this.setState({ code: value }, () => {
            if (this.state.code.length > 3) {
                this._regexNumTest(this.state.code);
            } else if (this.state.flag) {
                this.setState({ flag: false });
            }
        })
    }

    _regexNumTest = (code) => {
        // phone number validation test
        if (!((regexNum.test(code) && (code != "")))) {
            //console.log('please enter a valid phone number');
            //alert('please enter a valid phone number');
            return;
        }
        //console.log('valid phone');
        this.setState({ flag: true });
    }


    _btnVerificationPhone = async () => {
        const user = this.props.navigation.state.params;
        console.log('user=', user)
        const code = this.state.code;
        try {
            this.setState({ loading: true });
            const u = await SQL.Login(user.id, code);
            console.log('u=', u);
            const res = JSON.parse(u);
            if (res.UserID !== undefined) {
                if (user.isExist) {
                    //console.log('main page')
                    const navigateAction1 = NavigationActions.navigate({
                        routeName: 'MainApp',
                        params: res.UserID,
                    });
                    this.props.navigation.dispatch(navigateAction1);
                } else {
                    //console.log('regulation page')
                    const navigateAction2 = NavigationActions.navigate({
                        routeName: 'Regulations',
                        params: res.UserID,
                    });
                    this.props.navigation.dispatch(navigateAction2);
                }
            } else {
                // invalid code needs to show messege to user
                //console.log('wrong code')
                alert('Wrong Code! Try Again...')
            }

        } catch (error) {
            this.setState({ loading: false })
            console.log(error);
        }
        this.setState({ loading: false })

    }

    _btnGetCodeByPushAgain = async () => {
        const user = this.props.navigation.state.params;
        await PushNotification.SendCodeByPushNotification(user.token, CODE);
        alert('The Code Has Been Sent');
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
                        <Text style={styles.header}>הזן קוד</Text>

                        <View style={this.state.flag ? styles.validInputView : styles.InvalidInputView}>
                            <TextInput
                                maxLength={4}
                                keyboardType="numeric"
                                style={styles.textInput}
                                onChangeText={this._handleCodeChange}
                                value={this.state.code}
                            >
                            </TextInput>
                        </View>

                        {/* submit button view */}
                        {this.state.loading ? <ActivityIndicator style={{ flex: 1, paddingTop: 70 }} size="large" color="#ff0000" /> :
                            <View style={styles.buttonView}>
                                <TouchableOpacity
                                    style={styles.buttonOpacity}
                                    onPress={this._btnVerificationPhone}
                                    disabled={this.state.flag ? false : true}
                                >
                                    <Text style={styles.buttonText1}>המשך</Text>
                                </TouchableOpacity >
                            </View>
                        }

                        {/* get code again button view  needs to send push code again*/}
                        <View style={styles.btnView}>
                            <TouchableOpacity
                                style={styles.btnCodeTH}
                                onPress={this._btnGetCodeByPushAgain}>
                                <Text style={styles.buttonText2}>שלח שנית</Text>
                            </TouchableOpacity >
                        </View>

                        {/* get code via call button view */}
                        <View style={styles.btnView}>
                            <TouchableOpacity
                                style={styles.btnCallTH}
                                onPress={() => { this.props.navigation.navigate('Loading'); }}>
                                <Text style={styles.buttonText2}>התקשרו כדי לקבל קוד בשיחה</Text>
                            </TouchableOpacity >
                        </View>
                    </View>
                </LinearGradient>
            </View>
        );
    }
}

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
        paddingHorizontal: 67,
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
    buttonText1: {
        fontSize: 16,
        color: 'black',
        textAlign: 'center',
    },
    btnView: {
        margin: 0,
        paddingTop: 20,
        alignItems: 'center',
    },
    btnCodeTH: {
        padding: 14,
        paddingTop: 10,
        paddingHorizontal: 8,
        borderRadius: 20,
    },
    btnCallTH: {
        padding: 14,
        paddingTop: 10,
        paddingHorizontal: 8,
        borderRadius: 20,
    },
    buttonText2: {
        fontSize: 16,
        color: '#FFFEFE',
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