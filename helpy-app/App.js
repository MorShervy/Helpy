import React, { Component } from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { View } from 'react-native';
import LoadPage from "./components/Helpy/LoadPage";
import PhonePage from './components/Helpy/PhonePage';
import CodeVerification from './components/Helpy/CodeVerification';
import Regulations from './components/Helpy/Regulations';

class App extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <AppNavigator />
      </View>
    );
  }
}

const AppNavigator = createStackNavigator({
  Regulations: Regulations,
  LoadPage: LoadPage,
  PhonePage: PhonePage,
  CodeVerification: CodeVerification,


},
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisable: false,
    }
  },
  {
    initialRouteName: 'LoadPage',
  });

export default createAppContainer(AppNavigator);

