import React, { useState, useMemo } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { UserContext } from './UserContext';
import Home from './containers/home-containers/home';
import Login from './containers/user-containers/login-container/login.jsx';
import Register from './containers/user-containers/register-container/register.jsx';
import Event from './containers/event-containers/event.jsx';

import TestPage from './testPage.jsx';


function App() {

  const [user, setUser] = useState(null);

  const userValue = useMemo(() => ({user, setUser}), [user, setUser]);

  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <UserContext.Provider value ={userValue }>
          <Route exact path = '/' component = {Home}/>
          <Route path = '/login' component = {Login}/>
          <Route path = '/register' component = {Register}/>
          <Route path = '/event' component = {Event}/>
          <Route path = '/testpage' component = {TestPage}/>
          </UserContext.Provider>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
