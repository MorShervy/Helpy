import React, { Component } from 'react';

import { createStackNavigator, createAppContainer } from 'react-navigation';
import { View } from 'react-native';

import LoadPage from "./components/Helpy/LoadPage";
import PhonePage from './components/Helpy/PhonePage';
import CodeVerification from './components/Helpy/CodeVerification';
import MainApp from './components/Helpy/MainApp';

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

  LoadPage: LoadPage,
  PhonePage: PhonePage,
  MainApp: MainApp,
  CodeVerification: CodeVerification,

},
  {
    headerMode: 'none',
    defaultNavigationOptions: {
      headerVisable: false,
    }
  },
  {
    initialRouteName: 'LoadPage',
  });

export default createAppContainer(AppNavigator);

