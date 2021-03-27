import React, { useState, useMemo } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { UserContext } from './UserContext';
import HomePage from './containers/home-containers/homePage';
import Login from './containers/user-containers/login.jsx';
import Register from './containers/user-containers/register.jsx';
import EventPage from './containers/event-containers/eventPage.jsx';
import ArtistPage from './containers/artist-containers/artistPage.jsx';
import Navbar from './components/navbar/navbar.jsx';

function App() {

  const [user, setUser] = useState(null);

  const userValue = useMemo(() => ({user, setUser}), [user, setUser]);

  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <UserContext.Provider value ={userValue}>
          <Navbar/>
          <Route exact path = '/' component = {HomePage}/>
          <Route path = '/login' component = {Login}/>
          <Route path = '/register' component = {Register}/>
          <Route path = '/event/:id' component = {EventPage}/>
          <Route path = '/artist/:id' component = {ArtistPage}/>
          </UserContext.Provider>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
