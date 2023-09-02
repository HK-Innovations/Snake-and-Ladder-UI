import React, { useState } from "react";
import axios from "axios";
import baseURL from "../../config";
import { over } from "stompjs";
import SockJS from 'sockjs-client';
import Snake from "../../Assets/joinWithGameID/kaa-disney.gif";
import "./JoinGameId.css"; // Add your CSS file for styling
import SideDrawer from "../SideDrawer/SideDrawer";

var stompClient = null;

const JoinGameId = () => {
  const [gameId, setGameId] = useState("");
  const email = localStorage.getItem("email");

  const handleInputChange = (event) => {
    setGameId(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!gameId.trim()) {
      alert("Please fill in the Game ID field.");
      return;
    }
    
    let Sock = new SockJS(baseURL + "/SnakeLadder");
    stompClient = over(Sock);
    stompClient.connect({}, onConnected, onError);
  };

  const onConnected = () => {
    stompClient.subscribe('/joinPlayerAll/public');
    stompClient.subscribe('/startGameAll/public');
    joinPlayer();
  };

  const onError = (err) => {
    console.log(err);
  };

  const joinPlayer = () => {
    const joinPlayerReq = {
      gameId: gameId,
      emailId: email,
    }
    stompClient.send('/app/joinPlayer', {}, JSON.stringify(joinPlayerReq));
    localStorage.setItem("gameId", gameId);
    window.location.replace(`${window.location.origin}/join`);
  };

  return (
    <div className="join-game-container">
      <SideDrawer/>
      <h1 className="join-game-title">Join with Game ID</h1>
      <form onSubmit={handleSubmit} className="join-form">
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
        
        <button type="submit" className="mt-5  join-game-btn-whimsical"> Join Game</button>
      </form>
      <div className="mt-5">
        <img src={Snake} alt='Snake'/>
      </div>
    </div>
  );
};

export default JoinGameId;
