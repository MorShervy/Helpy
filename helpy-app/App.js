import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import BgImageColor from './components/Helpy/BgImageColor';

export default class App extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <BgImageColor />

      </View>
    );
  }
}

