import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './containers/home-containers/home';
import Login from './containers/user-containers/login-container/login.jsx';
import Register from './containers/user-containers/register-container/register.jsx';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path = '/' component = {Home}/>
          <Route path = '/login' component = {Login}/>
          <Route path = '/register' component = {Register}/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
