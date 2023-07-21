import React, { useEffect, useState } from "react";
import axios from "axios";
import baseURL from "../../config";
import CopyButton from "../CopyButton";

const JoinPage = () => {
  const storedData = localStorage.getItem("gameData");
  const parsedData = JSON.parse(storedData);
  const gameId = parsedData?.id;
  const [playerBoxes, setPlayerBoxes] = useState(
    parsedData?.board?.playerBoxes || []
  );
  const email = parsedData?.config?.email;
  const isGameCreator = email === parsedData?.config?.email;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${baseURL}/configure/getGame?gameId=${gameId}`
        );
        setPlayerBoxes(response.data.board.playerBoxes || []);
      } catch (error) {
        console.error(error);
      }
    };

    const interval = setInterval(() => {
      fetchData();
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [gameId]);

  const handleStartGame = () => {
    const postData = { gameId: gameId };

    axios.post(`${baseURL}/configure/startGame?gameId=${gameId}`, postData)
      .then((response) => {
        console.log('Response:', response.data);
        alert("All the best! The game has started.");
        window.location.replace(`${window.location.origin}/board`);
      })
      .catch((error) => {
        alert("You already joined");
        console.error('Error:', error);
      });
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
              <li key={playerBox.id}>{playerBox.pid}</li>
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
