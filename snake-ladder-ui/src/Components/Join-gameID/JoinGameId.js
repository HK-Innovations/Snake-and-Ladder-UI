import React, { useState } from "react";
import axios from "axios";
import baseURL from "../../config";
import {over} from "stompjs";
import SockJS from 'sockjs-client';

var stompClient=null;
const JoinGameId = () => {
  const [gameId, setGameId] = useState("");

  const email = localStorage.getItem("email");

  const handleInputChange = (event) => {
    setGameId(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let Sock = new SockJS(baseURL + "/SnakeLadder"); //server connection
    stompClient=over(Sock);
    stompClient.connect({}, onConnected, onError);
  };

  const onConnected = ()=>{
    stompClient.subscribe('/joinPlayer/public');
    stompClient.subscribe('/startGame/public');
    joinPlayer();
  };

  const onError=(err)=>{
    console.log(err);
  };

  const joinPlayer=() => {
    const joinPlayerReq = {
      gameId: gameId,
      emailId: email,
    }
    stompClient.send('/app/joinPlayer',{},JSON.stringify(joinPlayerReq));
    localStorage.setItem("gameId", gameId);
    window.location.replace(`${window.location.origin}/join`);
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
