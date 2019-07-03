import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { LinearGradient } from 'expo';

import LogoApp from '../components/LogoApp';

export default class LoadPage extends Component {


  render() {

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
            <LogoApp styles={[styles.logo, styles.image]} />
            <Text style={styles.headerText}>האפליקציה שעוזרת לך במצבי סיכון</Text>

            <View style={styles.btnView}>
              <TouchableOpacity
                style={styles.btnSubmit}
                onPress={() => { this.props.navigation.navigate('PhonePage') }}>
                <Text style={styles.txtSubmit}>כניסה</Text>
              </TouchableOpacity>
            </View>
          </View>

        </LinearGradient>

      </View >
    );
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
  },
  btnView: {
    flex: 1,
    margin: 0,
    paddingTop: 50,
    width: 120,

  },
  btnSubmit: {
    width: 120,
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
