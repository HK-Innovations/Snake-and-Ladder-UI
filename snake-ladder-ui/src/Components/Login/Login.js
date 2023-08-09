import React, { useState } from "react";
import axios from "axios";
import baseURL from "../../config";
import cookie from "react-cookies";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import img1 from "../../Assets/PicturesSlider/dice1.jpg";
import img2 from "../../Assets/PicturesSlider/dice2.jpg";
import img3 from "../../Assets/PicturesSlider/p.jpeg";
import img4 from "../../Assets/PicturesSlider/p.jpg";
import img5 from "../../Assets/PicturesSlider/p1.jpeg";
import img6 from "../../Assets/PicturesSlider/p1.jpg";
import img7 from "../../Assets/PicturesSlider/p2.jpg";
import img8 from "../../Assets/PicturesSlider/p3.jpg";
import img9 from "../../Assets/PicturesSlider/p4.jpg";
import img10 from "../../Assets/PicturesSlider/p5.jpg";
import img11 from "../../Assets/PicturesSlider/p6.jpg";
let payloadData;
let decodedPayload;
const Login = () => {
  const decodeAccessToken = (accessToken) => {
    // Split the JWT into its three parts
    const parts = accessToken.split(".");
    if (parts.length !== 3) {
      console.error("Invalid JWT format");
      return;
    }

    // Extract the payload (second part)
    const encodedPayload = parts[1];

    // Decode the base64-encoded payload
    
    try {
      decodedPayload = atob(encodedPayload);
    } catch (error) {
      console.error("Error decoding JWT payload:", error);
      return;
    }

    // Parse the decoded payload as JSON
    
    try {
      payloadData = JSON.parse(decodedPayload);
    } catch (error) {
      console.error("Error parsing JWT payload JSON:", error);
      return;
    }

    // Access the desired data from the payload
    const { name, emailId, exp, iat } = payloadData;

    // Store the data in local storage or perform any other actions
    localStorage.setItem("name", name);
    localStorage.setItem("email", emailId);
    localStorage.setItem("expirationTime", new Date(exp * 1000).toString());
    localStorage.setItem("creationTime", new Date(iat * 1000).toString());

    // console.log("Name:", name);
    // console.log("Email:", emailId);
    // console.log("Expiration Time:", new Date(exp * 1000));
    // console.log("Creation Time:", new Date(iat * 1000));
  };

  const images = [
    img1,
    img2,
    img3,
    img4,
    img5,
    img6,
    img7,
    img8,
    img9,
    img10,
    img11,
  ];

  const [userData, setUserData] = useState({
    emailId: "",
    password: "",
  });
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (userData.emailId.trim() === "") {
      setEmailError("Please enter your email.");
      return;
    }

    if (userData.password.trim() === "") {
      setPasswordError("Please enter your password.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userData.emailId)) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    setEmailError("");
    setPasswordError("");

    axios
      .post(`${baseURL}/player/login`, userData)
      .then((response) => {
        if (response.status == 200) {
          cookie.save("access_token", response.data.accessToken);
          const accessToken = response.data.accessToken;
          decodeAccessToken(accessToken);
          window.location.replace(`${window.location.origin}/template`);
        }
      })
      .catch((error) => {
        alert(error.response.data.reason);
      });
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <div
        style={{
          flex: "0 0 50%",
          backgroundColor: "#eee",
          justifyContent: "center",
          alignContent: "center",
          padding: "180px",
        }}
      >
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
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
            Login
          </button>
        </form>
        <button
          type="submit"
          className="mt-5 btn btn-secondary"
          onClick={() => {
            window.location.replace(`${window.location.origin}/Signup`);
          }}
        >
          Didn't have an account ? Signup
        </button>
      </div>
      <div style={{ flex: "0 0 50%" }}>
        <Carousel showThumbs={false} infiniteLoop autoPlay>
          {images.map((image, index) => (
            <div key={index} style={{ height: "100vh" }}>
              <img
                src={image}
                alt={`Slider Image ${index}`}
                style={{ objectFit: "cover", height: "100%", width: "100%" }}
              />
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default Login;
