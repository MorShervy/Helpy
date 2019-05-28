import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Picker, TextInput, ActivityIndicator } from "react-native";
import { LinearGradient } from 'expo';
import LogoApp from './LogoApp'


export default class PhonePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            areaCode: "054",
            phone: "",
            isLoading: true,
            dataSource: null,
        }
    }

    HandlePhoneChange = (value) => {
        let p = value.replace(".", "");
        let phone = p.replace("-", "");

        if (p.length <= 7) {
            this.setState({ phone });
        }
    }

    btnCreatNewUserToDB = async () => {
        console.log('states=', this.state.areaCode + this.state.phone);
        const data = {
            phone: this.state.areaCode + this.state.phone
        }
        console.log("data=", data)
        console.log("data.phone=", data.phone)

        /*      fetch from data base on local host - not working */

        // fetch("", {
        //     method: "post",
        //     headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        //     body: JSON.stringify(data.phone)
        // }).
        //     then((res) => {
        //         console.log('Done', res)
        //         return res.json()
        //     }).
        //     then((result) => {
        //         console.log("result=", result)
        //         console.log("result.d=", result.d)
        //         let u = JSON.parse(result.d)
        //         console.log("u.ID=", u.ID)
        //         console.log("u.Phone=", u.Phone)
        //     }).catch((err) => {
        //         console.log("error-post=", err)
        //     })


        this.props.navigation.navigate('CodeVerification');
    }

    render() {
        {/*
        if (this.state.isLoading) {

            return (
                <View>
                    <ActivityIndicator />
                </View>
            )
        } else {

            let movies = this.state.dataSource.map((val, key) => {
                return <View key={key} style={styles.movie}><Text>{val.title}</Text></View>
            });

            return (
                <View>
                    {movies}
                </View>
            ) */}
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
                            <View style={styles.phoneInputView}>
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
                                onPress={this.btnCreatNewUserToDB}>
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
        fontFamily: 'open-sans-light-italic',
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
        fontFamily: 'open-sans-light-italic',
        textAlign: 'center',
    },
});