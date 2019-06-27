import React, { Component } from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { View } from 'react-native';
import LoadPage from './components/Entry/LoadPage';
import PhonePage from './components/Entry/PhonePage';
import CodeVerification from './components/Entry/CodeVerification';
import Regulations from './components/Regulations/Regulations';
import MainApp from './components/MainApp/MainApp';
import EventReport from './components/Reports/EventReport';
import ReportType from './components/Reports/ReportType';
import RealTime from './components/General/RealTime';
import Chat from './components/LiveChat/Chat';

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
  MainApp: MainApp,
  LoadPage: LoadPage,
  PhonePage: PhonePage,
  CodeVerification: CodeVerification,
  Regulations: Regulations,

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

