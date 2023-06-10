import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import React, { useContext, useEffect, useState } from 'react';
import apiServiceJWT from './apiServiceJWT';

import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import Home from './components/Home';
import { Context } from './context/Context';

function App () {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // const [user, setUser] = useState(null);
  const { user, updateUser } = useContext(Context);

  function checkToken () {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      apiServiceJWT.profile(accessToken).then(data => {
        updateUser(data[0]);
      });
      setIsAuthenticated(true);
    }
  }

  useEffect(() => {
    checkToken()
  }, [])

  return (
    <div className="App">
      <Router>

        <Navbar isAuthenticated={isAuthenticated} />
        <Home />
        {/*<div>{user}</div>*/}
        <Dashboard setIsAuthenticated={setIsAuthenticated} />

      </Router>
    </div>
  );
}

export default App;
