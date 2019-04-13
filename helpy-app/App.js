import React, { Component } from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { View } from 'react-native';
import LoadPage from "./components/Helpy/LoadPage";
import PhonePage from './components/Helpy/PhonePage';

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
},
  {
    initialRouteName: 'LoadPage',
  });

export default createAppContainer(AppNavigator);

