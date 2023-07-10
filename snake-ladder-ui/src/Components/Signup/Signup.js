import React, { useState } from "react";
import axios from "axios";
import baseURL from "../../config";
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
const Signup = () => {
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
          // console.log(response.data);
        }
      })
      .catch((error) => {
        alert("You already have an account, please login");
        // console.error(error);
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
          padding: "280px",
        }}
      >
        <h1 className="mt-5 d-flex justify-content-center">Signup</h1>
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
        <button
          type="submit"
          className="mt-5 btn btn-secondary"
          onClick={() => {
            window.location.replace(`${window.location.origin}/`);
          }}
        >
          Already have an account !! Login
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

export default Signup;
