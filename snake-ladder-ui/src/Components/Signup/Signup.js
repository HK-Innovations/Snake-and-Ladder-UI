import React, { useState } from "react";
import axios from "axios";
import baseURL from "../../config";

const Signup = () => {
  const [userData, setUserData] = useState({
    name: "",
    emailId: "",
    password: "",
  });
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [nameError, setNameError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (userData.name.trim() === "") {
      setNameError("Please enter your name.");
      return;
    }

    if (userData.emailId.trim() === "") {
      setEmailError("Please enter your email.");
      return;
    }

    if (userData.password.trim() === "") {
      setPasswordError("Please enter your password.");
      return;
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(userData.password)) {
      setPasswordError(
        "Password must contain at least one uppercase letter, one lowercase letter, one number, one special character, and be at least 8 characters long."
      );
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userData.emailId)) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    setNameError("");
    setPasswordError("");
    setEmailError("");

    axios
      .post(`${baseURL}/player/register`, userData)
      .then((response) => {
        if (response.status === 200) {
          window.location.replace(`${window.location.origin}/`);
        }
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="container">
      <h1>Signup</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className={`form-control ${nameError ? "is-invalid" : ""}`}
            id="name"
            name="name"
            value={userData.name}
            onChange={handleChange}
          />
          {nameError && <div className="invalid-feedback">{nameError}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="emailId" className="form-label">
            Email
          </label>
          <input
            type="email"
            className={`form-control ${emailError ? "is-invalid" : ""}`}
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
            className={`form-control ${passwordError ? "is-invalid" : ""}`}
            id="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
          />
          {passwordError && (
            <div className="invalid-feedback">{passwordError}</div>
          )}
        </div>
        <button type="submit" className="btn btn-primary">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
