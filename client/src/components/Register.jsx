import apiServiceJWT from '../apiServiceJWT';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function Register ({ setIsAuthenticated }) {
  const [formError, setFormError] = useState("");

  let navigate = useNavigate();
  const initialState = {
    email: '',
    password: '',
    userName: '',
  };
  const [user, setUser] = useState(initialState);

  async function handleSubmit (e) {
    e.preventDefault();
    if (!user.userName || !user.email || !user.password) {
      setFormError("Please fill in all fields");
      return;
    }
    const res = await apiServiceJWT.register(user);
    setFormError("");

    if (res.error) {
      console.log(res.message);
      setUser(initialState);
    } else {
      const { accessToken } = res;
      localStorage.setItem('accessToken', accessToken);
      setIsAuthenticated(true);
      navigate('/profile');
    }
  }
  function handleChange (e) {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  return (
    <div className="register">
      <form className="form" onSubmit={handleSubmit}>
        <h2>Register</h2>
        <label htmlFor="userName">Username:</label>
        <input
          type="text"
          name="userName"
          value={user.userName}
          onChange={handleChange}
        />
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          name="email"
          value={user.email}
          onChange={handleChange}
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          value={user.password}
          onChange={handleChange}
        />
        {formError && <p className="error-message">{formError}</p>}
        <button className="btn btn-submit" type="submit">
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;