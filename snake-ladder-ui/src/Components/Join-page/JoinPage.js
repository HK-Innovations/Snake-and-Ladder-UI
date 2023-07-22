import React, { useEffect, useState } from "react";
import axios from "axios";
import baseURL from "../../config";
import CopyButton from "../CopyButton";
import { over } from "stompjs";
import SockJS from 'sockjs-client';

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
      let Sock = new SockJS("http://localhost:8080/SnakeLadder"); //server connection
      stompClient = over(Sock);
      stompClient.connect({}, onConnected, onError);
    }
  };

  const onConnected = () => {
    
    stompClient.subscribe('/joinPlayer/public', onJoinPlayer);
    stompClient.subscribe('/startGame/public', onStartGame);
    onJoinPlayer();
  };

  const onError = (err) => {
    console.log(err);
  };

  const onJoinPlayer = async () => {
    console.log("Inside Join Player in Join Page");
    const response = await axios.get(
      `${baseURL}/configure/getGame?gameId=${gameId}`
    );
    setPlayerBoxes(response.data.board.playerBoxes || []);
  };

  const onStartGame = (message) => {
    // console.log("Inside start game in Join Page");
    const { gameId } = JSON.parse(message.body);
    if (gameId === gameId) {
      window.location.replace(`${window.location.origin}/board`);
    }
    // else{
    //   console.log("DANGER");
    // }
  };

  useEffect(() => {
    myMethod();
  }, []);

  const handleStartGame = () => {
    const startGameReq = {
      gameId: gameId,
    };
    stompClient.send('/app/startGame', {}, JSON.stringify(startGameReq));
    // console.log("danger");
  };

  return (
    <div>
      <h1>Join Page</h1>
      <h3>Game ID - Share with your friends</h3>
      <CopyButton text={gameId} />
      <div>
        <h1>Player List</h1>
        {playerBoxes.length === 0 ? (
          <p>No players have joined yet.</p>
        ) : (
          <ul>
            {playerBoxes.map((playerBox) => (
              <li key={playerBox.pid}>{playerBox.pid}</li>
            ))}
          </ul>
        )}
      </div>
      {isGameCreator && (
        <button className="btn btn-secondary mr-4" onClick={handleStartGame}>
          Start Game
        </button>
      )}
    </div>
  );
};

export default JoinPage;
