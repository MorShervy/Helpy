import React, { Component } from "react";
import { StyleSheet, Animated, Text, View, TouchableOpacity, TextInput } from "react-native";
import { LinearGradient, Font } from 'expo';
import LogoApp from './LogoApp'

export default class CodeVerification extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fontLoaded: false,
            areaCode: "054",
            phone: "",
            latitude: 0.0,
            longitude: 0.0,
        }
    }

    async componentWillMount() {
        await Font.loadAsync({
            'open-sans-light': require('../../assets/fonts/OpenSans-Light.ttf'),
            'open-sans-light-italic': require('../../assets/fonts/OpenSans-LightItalic.ttf'),
        });
        this.setState({ fontLoaded: true })
    }

    HandlePhoneChange = (value) => {
        let p = value.replace(".", "");
        let phone = p.replace("-", "");

        if (p.length <= 4) {
            this.setState({ phone });
        }
    }

    btnVerificationPhone = () => {
        this.props.navigation.navigate('MainApp');
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

                        <LogoApp />
                        <Text style={this.state.fontLoaded ? styles.headerText : styles.headerText2}>הזן קוד</Text>

                        <View style={styles.txtInputView}>
                            <TextInput
                                maxLength={4}
                                keyboardType="numeric"
                                style={styles.textInput}
                                onChangeText={this.HandlePhoneChange}
                                value={this.state.phone}
                            >
                            </TextInput>
                        </View>

                        {/* submit button view */}
                        <View style={styles.btnSubmitView}>
                            <TouchableOpacity
                                style={styles.btnSubmitTH}
                                onPress={this.btnVerificationPhone}>
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
        fontFamily: 'open-sans-light-italic',
        textAlign: 'center',
    },
    headerText2: {
        paddingBottom: 20,
        paddingTop: 50,
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
        fontFamily: 'open-sans-light-italic',
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
        fontFamily: 'open-sans-light-italic',
        textAlign: 'center',
    },
    textButton2: {
        fontSize: 16,
        color: '#FFFEFE',
        textAlign: 'center',
    },
});