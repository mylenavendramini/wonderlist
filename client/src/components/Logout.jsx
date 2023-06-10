import React from 'react';
import apiServiceJWT from '../apiServiceJWT';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Logout ({ setIsAuthenticated }) {
  let navigate = useNavigate();

  const handleClick = () => {
    removeToken();
    handleAuth();
  };

  const removeToken = () => {
    apiServiceJWT.logout('accessToken');
  };

  const handleAuth = () => {
    setIsAuthenticated(false);
    navigate('/');
  };
  return (
    <div className="logout">
      <h2>Are you sure you want to log out?</h2>
      <Link to="/">
        <button className="confirm-btn">No</button>
      </Link>
      <button className="confirm-btn" onClick={() => handleClick()}>
        Yes
      </button>
    </div>
  );
}

export default Logout;