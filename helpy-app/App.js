import React, { Component } from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { View } from 'react-native';
import LoadPage from './Pages/LoadPage';
import PhonePage from './Pages/PhonePage';
import CodeVerification from './Pages/CodeVerification';
import Regulations from './Pages/Regulations';
import MainApp from './Pages/MainApp';
import EventReport from './Pages/EventReport';
import ReportType from './Pages/ReportType';
import RealTime from './Pages/RealTime';
import Chat from './Pages/Chat';

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
  CodeVerification: CodeVerification,
  Regulations: Regulations,
  MainApp: MainApp,
  ReportType: ReportType,
  EventReport: EventReport,
  RealTime: RealTime,
  Chat: Chat,

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

