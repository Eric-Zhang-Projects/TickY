import React, { useState, useMemo } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { UserContext } from './UserContext';
import Home from './containers/home-containers/home';
import Login from './containers/user-containers/login.jsx';
import Register from './containers/user-containers/register.jsx';
import Event from './containers/event-containers/event.jsx';
import ArtistPage from './containers/artist-containers/artist.jsx';
import Navbar from './components/navbar/navbar.jsx';

import TestPage from './testPage.jsx';


function App() {

  const [user, setUser] = useState(null);

  const userValue = useMemo(() => ({user, setUser}), [user, setUser]);

  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <UserContext.Provider value ={userValue}>
          <Navbar/>
          <Route exact path = '/' component = {Home}/>
          <Route path = '/login' component = {Login}/>
          <Route path = '/register' component = {Register}/>
          <Route path = '/event' component = {Event}/>
          <Route path = '/artist/:id' component = {ArtistPage}/>
          <Route path = '/testpage' component = {TestPage}/>
          </UserContext.Provider>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
