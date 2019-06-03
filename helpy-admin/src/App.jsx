import React from 'react';
import { Route, Link } from 'react-router-dom';

import CssBaseline from '@material-ui/core/CssBaseline';


import './App.css';


import MainApp from './screens/main/MainApp';
import Login from './screens/login/Login.jsx'


function App(props) {
  //console.log('props', props.location.state.userObj);
  //const userObj = props.location.state.userObj;

  return (

    <div>
      <CssBaseline />
      <Link to="/" />
      <Link to="/login" />
      <Route exact path='/' component={MainApp} />
      <Route path='/login' component={Login} />
    </div>

  );
}

export default App;
