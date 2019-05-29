import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ActivityIndicator } from "react-native";
import { LinearGradient, Font } from 'expo';

import LogoApp from './LogoApp'

export default class CodeVerification extends Component {
    constructor(props) {
        super(props);
        let user = this.props.navigation.state.params;
        console.log('user=', user)
        this.state = {
            fontLoaded: false,
            isCodeValid: false,
            areaCode: "054",
            phone: "",
        }
    }

    async componentWillMount() {
        await Font.loadAsync({
            'open-sans-light': require('../../assets/fonts/OpenSans-Light.ttf'),
        });
        this.setState({ fontLoaded: true })
    }

    componentDidMount = async () => {
        let user = this.props.navigation.state.params;
        let per = {
            to: user.token,
            title: user.phone,
            body: `קוד זיהוי:  ${user.code}`,
            badge: 3,
            data: { token: user.token, phone: user.phone, code: user.code }
        };

        // POST adds a random id to the object sent
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
        }

        if (c.length === 4) {
            this.setState({ isCodeValid: true })
        }
        else {
            this.setState({ isCodeValid: false })
        }
    }

    btnVerificationPhone = () => {
        this.props.navigation.navigate('Regulations');
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
        else {
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
                            <Text style={styles.headerText}>הזן קוד</Text>

                            <View style={this.state.fontLoaded ? styles.headerText : styles.headerText2}>
                                <TextInput
                                    maxLength={4}
                                    keyboardType="numeric"
                                    style={[styles.textInput, this.state.isCodeValid ? styles.txtInputView : styles.codeInvalidInputView]}
                                    onChangeText={this.handleCodeChange}
                                    value={this.state.code}
                                >
                                </TextInput>
                            </View>

                            {/* submit button view */}
                            <View style={styles.btnSubmitView}>
                                <TouchableOpacity
                                    style={styles.btnSubmitTH}
                                    onPress={this.btnVerificationPhone}
                                    disabled={this.state.isCodeValid ? false : true}
                                >

                                    <Text style={this.state.fontLoaded ? styles.txtSubmit : styles.txtSubmit2}>המשך</Text>
                                </TouchableOpacity >
                            </View>

                            {/* get code again button view */}
                            <View style={styles.btnView}>
                                <TouchableOpacity
                                    style={styles.btnCodeTH}
                                    onPress={() => { this.props.navigation.navigate('Loading'); }}>
                                    <Text style={this.state.fontLoaded ? styles.textButton : styles.textButton2}>שלח שנית</Text>
                                </TouchableOpacity >
                            </View>

                            {/* get code via call button view */}
                            <View style={styles.btnView}>
                                <TouchableOpacity
                                    style={styles.btnCallTH}
                                    onPress={() => { this.props.navigation.navigate('Loading'); }}>
                                    <Text style={this.state.fontLoaded ? styles.textButton : styles.textButton2}>התקשרו כדי לקבל קוד בשיחה</Text>
                                </TouchableOpacity >
                            </View>
                        </View>
                    </LinearGradient>
                </View>
            );
        }
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
        paddingTop: 20,
        color: '#FFFEFE',
        fontSize: 18,
        fontFamily: 'open-sans-light',
        textAlign: 'center',
    },
    headerText2: {
        paddingTop: 20,
        color: '#FFFEFE',
        fontSize: 18,
        textAlign: 'center',
    },
    txtInputView: {
        borderColor: '#FFFEFE',
        borderRadius: 20,
        borderWidth: 1,
        width: 182,
        height: 40,
    },
    codeInvalidInputView: {
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
    txtSubmit: {
        fontSize: 16,
        color: 'black',
        fontFamily: 'open-sans-light',
        textAlign: 'center',
    },
    txtSubmit2: {
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
    textButton: {
        fontSize: 16,
        color: '#FFFEFE',
        fontFamily: 'open-sans-light',
        textAlign: 'center',
    },
    textButton2: {
        fontSize: 16,
        color: '#FFFEFE',
        textAlign: 'center',
    },
});