import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableHighlight, Image } from "react-native";
import { LinearGradient, Font } from 'expo';
import LogoApp from './LogoApp'

export default class LoadPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontLoaded: false,
    }
  }

  // componentDidMount() {
  //   var timeOut = setTimeout(() => this.props.navigation.navigate('PhonePage'), 5000);
  //   this.setState({ timeOut: timeOut });
  // }

  // componentWillUnmount() {
  //   clearTimeout(this.state.timeOut);
  // }

  async componentDidMount() {
    await Font.loadAsync({
      'open-sans-light': require('../../assets/fonts/OpenSans-Light.ttf'),
      'open-sans-light-italic': require('../../assets/fonts/OpenSans-LightItalic.ttf'),
    });
    this.setState({ fontLoaded: true })
  }

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
            <LogoApp />
            <Text style={this.state.fontLoaded ? styles.headerText : null}>האפליקציה שעוזרת לך במצבי סיכון</Text>

            <View style={styles.btnView}>
              <TouchableHighlight
                style={styles.btnTH}
                onPress={() => { this.props.navigation.navigate('PhonePage'); }}>
                <Text style={this.state.fontLoaded ? styles.submitText : null}>כניסה</Text>
              </TouchableHighlight>
              {/* <Image style={{ width: 47, height: 47 }} source={require('../../assets/loading1.gif')} /> */}
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
    fontFamily: 'open-sans-light-italic'
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
    fontFamily: 'open-sans-light-italic',
    textAlign: 'center',
  }
});
