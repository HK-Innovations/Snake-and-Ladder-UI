import React, { useEffect, useState } from "react";
import axios from "axios";
import baseURL from "../../config";
import CopyButton from "../CopyButton";
import { over } from "stompjs";
import SockJS from "sockjs-client";
import SideDrawer from "../SideDrawer/SideDrawer";

import "./JoinPage.css"; // Import your custom CSS for additional styling

var stompClient = null;

const JoinPage = () => {
  const storedData = localStorage.getItem("gameData");
  const parsedData = JSON.parse(storedData);
  const gameId = storedData ? parsedData.id : localStorage.getItem("gameId");
  const [playerBoxes, setPlayerBoxes] = useState(
    parsedData?.board?.playerBoxes || []
  );

  const email = parsedData?.config?.email;
  const isGameCreator = email === parsedData?.config?.email;

  const myMethod = () => {
    console.log("Inside My Method");
    if (!stompClient) {
      let Sock = new SockJS(baseURL + "/SnakeLadder");
      stompClient = over(Sock);
      stompClient.connect({}, onConnected, onError);
    }
  };

  const onConnected = () => {
    stompClient.subscribe("/joinPlayerAll/public", onJoinPlayer);
    stompClient.subscribe("/startGameAll/public", onStartGame);
    onJoinPlayer();
  };

  const onError = (err) => {
    console.log(err);
  };

  const onJoinPlayer = async () => {
    const response = await axios.get(
      `${baseURL}/configure/getGame?gameId=${gameId}`
    );
    const gameResponse = await axios.get(
      `${baseURL}/configure/getGame?gameId=${gameId}`
    );
    console.log(gameResponse);
    localStorage.setItem("gameDataNEW", JSON.stringify(gameResponse.data));
    setPlayerBoxes(response.data.board.playerBoxes || []);
  };

  const onStartGame = () => {
    console.log("Inside onStartGame Method");
    window.location.replace(`${window.location.origin}/board`);
  };

  useEffect(() => {
    myMethod();
  }, []);

  const handleStartGame = () => {
    let startGameId = gameId.toString();
    stompClient.send("/app/startGame", {}, startGameId);
  };

  return (
    <div className="mt-5 join-page-container">
      <h2 className="join-page-title">Waiting Room</h2>
      <SideDrawer />
      <div className="game-id-section">
        <h4>Invite Friends !!</h4>
        <CopyButton text={gameId} />
      </div>
      <div className="player-list-section">
        <h4>Players in the Game</h4>
          {playerBoxes.length === 0 ? (
            <p>No players have joined yet.</p>
          ) : (
            <ul>
              {playerBoxes.map((playerBox) => (

                <li key={playerBox.pid}>
                   P{playerBox.seq} - {playerBox.name}
                
                </li>
              ))}
            </ul>
          )}
       
      </div>
      {isGameCreator && (
         <button type="submit" className="mt-5  start-game-btn-whimsical" onClick={handleStartGame}>Start Game</button>
      )}
    </div>
  );
};

export default JoinPage;
