import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableHighlight, ActivityIndicator } from "react-native";
import { LinearGradient, Font } from 'expo';

import LogoApp from './LogoApp'

export default class LoadPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontLoaded: false,
    }
  }

  componentDidMount = async () => {
    await Font.loadAsync({
      'open-sans-light': require('../../assets/fonts/OpenSans-Light.ttf'),
    });
    this.setState({ fontLoaded: true })
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
            colors={["#358FE2", "#2C0A8C"]}
            start={[0.1, 0.1]}
            style={{
              flex: 1,
              left: 0,
              right: 0,
              top: 0,
            }}>

            <View style={styles.container}>
              <LogoApp />
              <Text style={this.state.fontLoaded ? styles.headerText : null}>האפליקציה שעוזרת לך במצבי סיכון</Text>

              <View style={styles.btnView}>
                <TouchableHighlight
                  style={styles.btnTH}
                  onPress={() => { this.props.navigation.navigate('PhonePage'); }}>
                  <Text style={this.state.fontLoaded ? styles.submitText : null}>כניסה</Text>
                </TouchableHighlight>
              </View>

            </View>

          </LinearGradient>

        </View >
      );
    }
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
  headerText: {
    paddingBottom: 20,
    paddingTop: 50,
    color: '#FFFEFE',
    fontSize: 18,
    fontFamily: 'open-sans-light'
  },
  btnView: {
    flex: 1,
    margin: 0,
    paddingTop: 50,
    width: 120,

  },
  btnTH: {
    width: 120,
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
  }
});
