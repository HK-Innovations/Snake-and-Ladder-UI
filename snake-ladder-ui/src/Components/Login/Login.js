// import React, { useState } from 'react';
// import axios from 'axios';
// import baseURL from '../../config';
// const Login = () => {
//   const [userData, setUserData] = useState({
//     emailId: '',
//     password: ''
//   });

//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     setUserData((prevData) => ({
//       ...prevData,
//       [name]: value
//     }));
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     axios.post(`${baseURL}/player/login`, userData)
//       .then((response) => {
//         console.log(response.data);
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   };

//   return (
//     <div className="container">
//       <h1>Login</h1>
//       <form onSubmit={handleSubmit}>
//         <div className="mb-3">
//           <label htmlFor="emailId" className="form-label">Email</label>
//           <input
//             type="email"
//             className="form-control"
//             id="emailId"
//             name="emailId"
//             value={userData.emailId}
//             onChange={handleChange}
//           />
//         </div>
//         <div className="mb-3">
//           <label htmlFor="password" className="form-label">Password</label>
//           <input
//             type="password"
//             className="form-control"
//             id="password"
//             name="password"
//             value={userData.password}
//             onChange={handleChange}
//           />
//         </div>
//         <button type="submit" className="btn btn-primary">Login</button>
//       </form>
//     </div>
//   );
// };

// export default Login;





import React, { useState } from 'react';
import axios from 'axios';
import baseURL from '../../config';

const Login = () => {
  const [userData, setUserData] = useState({
    emailId: '',
    password: ''
  });
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Compulsory field validation
    if (userData.emailId.trim() === '') {
      setEmailError('Please enter your email.');
      return;
    }

    if (userData.password.trim() === '') {
      setPasswordError('Please enter your password.');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userData.emailId)) {
      setEmailError('Please enter a valid email address.');
      return;
    }

    // Reset validation errors
    setEmailError('');
    setPasswordError('');

    axios
      .post(`${baseURL}/player/login`, userData)
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
          <label htmlFor="emailId" className="form-label">
            Email
          </label>
          <input
            type="email"
            className={`form-control ${emailError ? 'is-invalid' : ''}`}
            id="emailId"
            name="emailId"
            value={userData.emailId}
            onChange={handleChange}
          />
          {emailError && <div className="invalid-feedback">{emailError}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className={`form-control ${passwordError ? 'is-invalid' : ''}`}
            id="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
          />
          {passwordError && <div className="invalid-feedback">{passwordError}</div>}
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
