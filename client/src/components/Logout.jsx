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
    <div className="register">
      <form className="form">
        <h2>Are you sure you want to log out?</h2>
        <div className='logout'>
          <Link to="/">
            <button className="btn btn-submit">No</button>
          </Link>
          <Link>
            <button className="btn btn-submit" onClick={() => handleClick()}>Yes</button>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Logout;