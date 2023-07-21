import React, { useState } from "react";
import axios from "axios";
import baseURL from "../../config";

const JoinGameId = () => {
  const [gameId, setGameId] = useState("");

  const email = localStorage.getItem("email");

  const handleInputChange = (event) => {
    setGameId(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${baseURL}/player/join`, {
        emailId: email,
        gameId: gameId,
      });
      // console.log("Response->",response);
      // console.log("STATUS", response.status);
     
    } catch (error) {
      console.log("Error",error);
      if(error.response.status == 429) {
        alert("Max player reached");
      } 
      else {
        alert("You already added !!");
      }
    }
  };

  return (
    <div>
      <h1>Join with Game ID</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="floatingInput"
            placeholder="Enter Game ID"
            value={gameId}
            onChange={handleInputChange}
          />
          <label htmlFor="floatingInput">Game ID</label>
        </div>
        <button type="submit" className="btn btn-primary">
          Join Game
        </button>
      </form>
    </div>
  );
};

export default JoinGameId;
