import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image } from "react-native";
import { LinearGradient } from 'expo';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';

import MenuButton from '../General/MenuButton';
import LogoApp from '../General/LogoApp';

export default class ReportType extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            types1: [{ label: 'מקרה של אחר', value: 0 }, { label: 'מקרה שלי', value: 1 }],
            value1: 1,
            value1Index: 1,
            value1_1: 0,
            value1_1Index: 0,
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
                        <MenuButton />
                        <LogoApp styles={[styles.logo, styles.image]} />
                        <Text style={styles.headerText}>בחר מצב חירום לדיווח</Text>
                        <View style={styles.component}>
                            <RadioForm formHorizontal={true} animation={true} >
                                {this.state.types1.map((obj, i) => {
                                    var onPress = (value, index) => {
                                        this.setState({
                                            value1: value,
                                            value1Index: index
                                        })
                                    }
                                    return (
                                        <RadioButton style={{ paddingRight: 10 }} labelHorizontal={true} key={i} >
                                            {/*  You can set RadioButtonLabel before RadioButtonInput */}
                                            <RadioButtonLabel
                                                obj={obj}
                                                index={i}
                                                onPress={onPress}
                                                labelStyle={{ color: '#fff' }}
                                                labelWrapStyle={{}}

                                            />
                                            <RadioButtonInput
                                                obj={obj}
                                                index={i}
                                                isSelected={this.state.value1Index === i}
                                                onPress={onPress}
                                                buttonInnerColor={'#000'}
                                                buttonOuterColor={'#fff'}
                                                buttonSize={15}
                                                buttonStyle={{ backgroundColor: '#fff' }}
                                                buttonWrapStyle={{ marginLeft: 10 }}
                                            />

                                        </RadioButton>
                                    )
                                })}
                            </RadioForm>
                        </View>
                        <View style={styles.types}>
                            <View style={styles.picone}>
                                <TouchableOpacity
                                    onPress={() => { this.props.navigation.navigate('EventReport') }}>
                                    <Image source={require('../../assets/images/hitting.png')}
                                        style={{ width: 101, height: 95 }} />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.picone}>
                                <TouchableOpacity
                                    onPress={() => { this.props.navigation.navigate('EventReport') }}>
                                    <Image source={require('../../assets/images/kidnapped.png')}
                                        style={{ width: 101, height: 95 }} />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.picone}>
                                <TouchableOpacity
                                    style={{ width: 101, height: 95 }}
                                    onPress={() => { this.props.navigation.navigate('EventReport') }}>
                                    <Image source={require('../../assets/images/buglery.png')}
                                        style={{ width: 101, height: 95 }} />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.picone}>
                                <TouchableOpacity
                                    style={{ width: 101, height: 95 }}
                                    onPress={() => { this.props.navigation.navigate('EventReport') }}>
                                    <Image source={require('../../assets/images/car-crash.png')}
                                        style={{ width: 101, height: 95 }} />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.picone}>
                                <TouchableOpacity
                                    style={{ width: 101, height: 95 }}
                                    onPress={() => { this.props.navigation.navigate('EventReport') }}>
                                    <Image source={require('../../assets/images/heart.png')}
                                        style={{ width: 101, height: 95 }} />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.picone}>
                                <TouchableOpacity
                                    style={{ width: 101, height: 95 }}
                                    onPress={() => { this.props.navigation.navigate('EventReport') }}>
                                    <Image source={require('../../assets/images/fire.png')}
                                        style={{ width: 101, height: 95 }} />
                                </TouchableOpacity>
                            </View>
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
    logo: {
        alignItems: 'center',
        paddingTop: 50,
    },
    image: {
        width: 55,
        height: 55,
    },
    headerText: {
        paddingBottom: 20,
        paddingTop: 35,
        color: '#FFFEFE',
        fontSize: 18,
    },
    component: {
        alignItems: 'center',

    },
    types: {
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'flex-start',
        flexDirection: 'row',
    },
    picone: {

        width: 145,
        height: 113,
        borderRadius: 33,
        backgroundColor: '#FFFEFE',
        marginTop: 15,
        marginRight: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
})