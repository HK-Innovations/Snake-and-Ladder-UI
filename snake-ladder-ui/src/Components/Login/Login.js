import React, { useState } from 'react';
import axios from 'axios';
import baseURL from '../../config';
const Login = () => {
  const [userData, setUserData] = useState({
    emailId: '',
    password: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post(`${baseURL}/player/login`, userData)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="emailId" className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            id="emailId"
            name="emailId"
            value={userData.emailId}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    </div>
  );
};

export default Login;
