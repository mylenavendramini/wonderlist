import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import React, { useContext, useEffect, useState } from 'react';
import apiServiceJWT from './apiServiceJWT';

import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import Footer from './components/Footer';
import { Context } from './context/Context';

function App () {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { updateUser } = useContext(Context);

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
    <div className="app">
      <Router>
        <Navbar isAuthenticated={isAuthenticated} />
        <Dashboard setIsAuthenticated={setIsAuthenticated} isAuthenticated={isAuthenticated} />
        <Footer />
      </Router>
    </div>
  );
}

export default App;
