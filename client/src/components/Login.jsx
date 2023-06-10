import React, { useContext, useState } from 'react';
import apiServiceJWT from '../apiServiceJWT';
import { useNavigate } from 'react-router-dom';
import { Context } from '../context/Context';

const initialState = {
  email: '',
  password: '',
};

const Login = ({ setIsAuthenticated }) => {
  let navigate = useNavigate();
  const { user, updateUser } = useContext(Context);
  const [state, setState] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    // Check the session branch to see how to handle redirects
    // REMOVE-START
    e.preventDefault();
    const res = await apiServiceJWT.login(state);

    if (res.error) {
      alert(`${res.message}`);
      setState(initialState);
    } else {
      const { accessToken, user } = res;
      localStorage.setItem('accessToken', accessToken);
      setIsAuthenticated(true);
      updateUser(user);
      console.log(user)
      navigate('/profile');
    }
  };

  const validateForm = () => {
    return !state.email || !state.password;
  };

  return (
    <div className="register">
      <form className="form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          name="email"
          value={state.email}
          onChange={handleChange}
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          value={state.password}
          onChange={handleChange}
        />
        <button className="btn btn-submit" type="submit" disabled={validateForm()}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;