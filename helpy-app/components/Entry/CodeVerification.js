import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ActivityIndicator } from "react-native";
import { LinearGradient, Font } from 'expo';

import LogoApp from '../General/LogoApp';

export default class CodeVerification extends Component {
    constructor(props) {
        super(props);
        let user = this.props.navigation.state.params;

        this.state = {
            flag: false,
            loading: false,
        }
    }


    componentDidMount = async () => {

        //let user = this.props.navigation.state.params;
        // let per = {
        //     to: user.token,
        //     title: user.phone,
        //     body: `קוד זיהוי:  ${user.code}`,
        //     badge: 3,
        //     data: { token: user.token, phone: user.phone, code: user.code }
        // };

        //POST adds a random id to the object sent
        // fetch('https://exp.host/--/api/v2/push/send', {
        //     method: 'POST',
        //     body: JSON.stringify(per),
        //     headers: {
        //         "Content-type": "application/json; charset=UTF-8"
        //     }
        // })
        //     .then(response => response.json())
        //     .then(json => {
        //         if (json != null) {
        //             console.log(`
        //             returned from server\n
        //             json.data= ${JSON.stringify(json.data)}`);

        //         } else {
        //             console.log('err json');
        //         }
        //     });
    }

    handleCodeChange = (value) => {
        let c = value.replace(".", "");
        let code = c.replace("-", "");


        if (c.length <= 4) {
            this.setState({ code })
            if (c.length == 4) {
                this.setState({ flag: true })
            }
        }
    }

    btnVerificationPhone = async () => {
        let user = this.props.navigation.state.params;
        let uData = {
            phone: user.phone,
            code: user.code,
            UToken: user.token,
            createdDate: new Date().toString()
        }

        await fetch('http://ruppinmobile.tempdomain.co.il/site08/WSHelpyM.asmx/InsertUser', {
            method: 'post',
            headers: new Headers({
                'Content-Type': 'application/json;',
            }),
            body: JSON.stringify(uData)
        })
            .then(res => {
                console.log('res=', res);
                return res.json()
            })
            .then(
                (result) => {
                    console.log("fetch POST= ", result);
                    console.log("fetch POST.d= ", result.d);
                    let u = JSON.parse(result.d);
                    if (u != null) {
                        console.log('u=', u)
                        alert('yep');
                    } else {
                        alert('no such user!');
                    }

                },
                (error) => {
                    console.log("err post=", error);
                });
        this.props.navigation.navigate('Regulations');
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
                                onChangeText={this.handleCodeChange}
                                value={this.state.code}
                            >
                            </TextInput>
                        </View>

                        {/* submit button view */}
                        <View style={styles.buttonView}>
                            <TouchableOpacity
                                style={styles.buttonOpacity}
                                onPress={this.btnVerificationPhone}
                                disabled={this.state.flag ? false : true}
                            >
                                <Text style={styles.buttonText1}>המשך</Text>
                            </TouchableOpacity >
                        </View>

                        {/* get code again button view */}
                        <View style={styles.btnView}>
                            <TouchableOpacity
                                style={styles.btnCodeTH}
                                onPress={() => { this.props.navigation.navigate('Loading'); }}>
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