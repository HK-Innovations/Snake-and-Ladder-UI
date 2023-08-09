import React, { useRef, useState, useEffect } from "react";
import ReactDice from "react-dice-complete";
import "./Board.css";
import { over } from "stompjs";
import SockJS from "sockjs-client";
import baseURL from "../../config";
import Line from "../Snake&Ladder/Line";
import "bootstrap/dist/css/bootstrap.css";

var stompClient = null;

const Board = () => {
  //dice
  const diceRef = useRef();
  const [diceValues, setDiceValues] = useState([]);
  
  let isDiceRolled = false;

  const cells = [];

  const storedData = localStorage.getItem("gameDataNEW"); // stored in JoinPage in onJoinPlayer()
  const userEmail = localStorage.getItem("email"); // stored in login via access token decode
  const accessName = localStorage.getItem("name"); // stored in login via access token decode

  const parsedData = JSON.parse(storedData);

  const gameId = parsedData?.id;
  const emailId = parsedData?.emailId;
  const totalRows = parsedData?.boardRows;
  const totalColumns = parsedData?.boardColumns;
  const playerBoxes = parsedData?.board?.playerBoxes;
  const snakeLadder = new Map(Object.entries(parsedData.board.snakeOrLadder));

  const [oldPosition, setOldPosition] = useState();
  const [newPosition, setNewPosition] = useState();
  const [currentPlayer, setCurrentPlayer] = useState("");
  const [nextPlayer, setNextPlayer] = useState(emailId);
  useEffect(() => {
    myMethod();
  }, []);

  const myMethod = () => {
    if (!stompClient) {
      let Sock = new SockJS(baseURL + "/SnakeLadder"); //server connection
      stompClient = over(Sock);
      stompClient.connect({}, onConnected, onError);
    }
  };

  const onConnected = () => {
    stompClient.subscribe("/movePlayerAll/public", onMovePlayer);
  };

  const onError = (err) => {
    console.log(err);
  };

  const handleRoll = () => {
    diceRef.current.rollAll();
    isDiceRolled = true;
  };

  const handleDiceRoll = (values) => {
    if (stompClient != null && isDiceRolled === true) {
      setDiceValues(values);
      const movePlayerReq = {
        gameId: gameId,
        emailId: userEmail,
        sum: values,
      };
      stompClient.send("/app/movePlayer", {}, JSON.stringify(movePlayerReq));
      console.log("after send");
      isDiceRolled = false;
    }
  };
  const [playersPosition, setPlayersPosition] = useState({});
// console.log("playerPositions=", playersPosition);
  const onMovePlayer = (response) => {
    let message = JSON.parse(response.body);

    setCurrentPlayer(message.emailId);
    setNextPlayer(message.nextPlayerTurn);
    setOldPosition(message.oldPosition);
    setNewPosition(message.newPosition);

    const playerEmail = message.emailId;

    // Update playersPosition with the new position
    setPlayersPosition((prevPositions) => ({
      ...prevPositions,
      [playerEmail]: message.newPosition,
    }));
  };
  const [playerColors, setPlayerColors] = useState({}); 
  
  
  const renderBoardCells = () => {
    let cellCount = totalRows * totalColumns;
    let order = 1;
  
    const cells = [];
  
    for (let row = totalRows - 1; row >= 0; row--) {
      if (order === 1) {
        order = -1;
        cellCount = row * totalColumns + totalColumns;
      } else {
        order = 1;
        cellCount = row * totalColumns + 1;
      }
      const rows = [];
      for (let column = 0; column < totalColumns; column++) {
        const cellPosition = cellCount;
  
        // Determine if the current cell has a player
        const hasPlayer = Object.values(playersPosition).includes(cellPosition);
  
        // Get the email of the player in the current cell
        const playerEmailInCell = Object.keys(playersPosition).find(
          (email) => playersPosition[email] === cellPosition
        );
  
        // Get the color for the player
        const playerColor = playerColors[playerEmailInCell];
  
        // Determine the class name based on player presence
        const cellClassName = `cell ${hasPlayer ? "player" : ""}`;
  
        rows.push(
          <div
            key={cellCount}
            id={cellCount}
            className={cellClassName}
            style={{
              backgroundColor: hasPlayer ? playerColor : "white",
            }}
            class="shadow p-3 mb-1 bg-white rounded"
            style={{ width: "10vh" }}
          >
            {cellCount}
          </div>
        );
        cellCount += order;
      }
      cells.push(
        <div className="d-flex" key={cellCount}>
          {rows}
        </div>
      );
    }
  
    return cells;
  };
  


  return (
    <div>
      {/* // user-details */}
      <h3> Hello, Player {accessName}</h3>
      <h5> Player email- {userEmail} </h5>
      <div className="board">{renderBoardCells()}</div>
      <div>
        {Array.from(snakeLadder).map(([key, value]) => (
          <Line from={key} to={value}></Line>
        ))}
      </div>

      <div>
        <ReactDice
          numDice={parsedData.board.dice.count}
          rollTime={1}
          disableIndividual
          ref={diceRef}
          faceColor="radial-gradient(rgb(255, 60, 60), rgb(180, 0, 0))"
          dotColor="#fff"
          dieSize={40}
          rollDone={handleDiceRoll}
        />
        {nextPlayer === userEmail && (
          <button onClick={handleRoll}>Roll Dice</button>
        )}
        {/* <button onClick={handleRoll}>Rotate</button> */}
        <div> Sum : {diceValues} </div>

        {/* //players list */}
        <div>
          <h1>Player List</h1>
          {playerBoxes.length === 0 ? (
            <p>No players have joined yet.</p>
          ) : (
            <ul>
              {playerBoxes.map((playerBox) => (
                <li key={playerBox.pid}>
                  PlayerId= {playerBox.pid} , PlayerSequence= {playerBox.seq} ,
                  ID={playerBox.id} , PlayerPosition={playerBox.position}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      {/* // current Player */}
      <h3> Current Player={currentPlayer}</h3>
      {/* // next player */}
      <h3> Next Player Turn={nextPlayer}</h3>
      <h3>New position={newPosition}</h3>
      <h3>old position={oldPosition}</h3>
      <h3>diff={newPosition - oldPosition}</h3>
       {/* Display player's color */}
       {userEmail && playerColors[userEmail] && (
  <div style={{ color: playerColors[userEmail] }}>
    Your Color: {playerColors[userEmail]}
  </div>
)}

    </div>
  );
};

export default Board;



