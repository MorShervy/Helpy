import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableHighlight } from "react-native";
import LogoApp from './LogoApp'

export default class LoadPage extends Component {


  render() {
    return (
      <View style={styles.container}>

        <LogoApp />

        <Text style={styles.text}>האפליקציה שעוזרת לך במצבי סיכון</Text>

        <View style={styles.con}>

          <TouchableHighlight
            style={styles.button}
            onPress={this.onPressStart}>
            <Text style={{ color: 'white' }}>כניסה</Text>
          </TouchableHighlight>

        </View>
      </View>

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
  text: {
    paddingBottom: 20,
    paddingTop: 50,
    color: '#000000',
    fontSize: 18,
  },
  con: {
    flex: 1,
    margin: 0,
    paddingTop: 50,
    alignItems: 'center',
  },
  button: {
    padding: 14,
    paddingTop: 10,
    paddingRight: 30,
    backgroundColor: '#000000',
    borderRadius: 20,
  },
  submitText: {
    textAlign: 'center',
    fontSize: 18,
    color: 'white',
  }
}
);
