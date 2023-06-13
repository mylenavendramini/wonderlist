import React from 'react';
import { Link } from 'react-router-dom';

function Navbar ({ isAuthenticated }) {
  return (
    <div className='navbar'>
      <ul>
        <li className='logo'>
          <Link to="/">Wonder List</Link>
        </li>
      </ul>
      <ul>
        {isAuthenticated ? (
          <>
            <li>
              <Link to="/travel-collections">My account</Link>
            </li>
            <li>
              <Link to="/logout">Logout</Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
}

export default Navbar;