import React, { useRef, useState, useEffect } from "react";
import ReactDice from "react-dice-complete";
import "./Board.css";
import { over } from "stompjs";
import SockJS from "sockjs-client";
import baseURL from "../../config";
import Line from "../Snake&Ladder/Line";
import "bootstrap/dist/css/bootstrap.css";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


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
  // console.log(playerBoxes)
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
console.log(message);
    setCurrentPlayer(message.emailId);
    setNextPlayer(message.nextPlayerTurn);
    setOldPosition(message.oldPosition);
    setNewPosition(message.newPosition);

    const playerSeq = message.seq;
    const oldPos=message.oldPosition;
    const newPos=message.newPosition;
    // Update playersPosition with the new position
    setPlayersPosition((prevPositions) => ({
      ...prevPositions,
      [playerSeq]: message.newPosition,
    }));
    const diff=newPos-oldPos;
  console.log(diff);
    if(message.gameFinished === true){
      toast(
        `Player P${playerSeq} WON the game !! Wohoooo !!`,
        {
          autoClose: 5000, // Auto-close after 2 seconds
        }
      );
      window.location.replace(`${window.location.origin}/fire-works`);
      
    }
    toast(
      `Player P${playerSeq} moved from ${oldPos} to ${newPos} with total sum of ${diff}`,
      {
        autoClose: 2000, // Auto-close after 2 seconds
      }
    );

  };
 
  
  const renderBoardCells = () => {
    const cells = [];
  
    const tokenStyle = {
      backgroundColor: "#bde5cb",
      borderRadius: '50%',
      width: '40px',
      height: '40px',
      margin: '5px',
    };
  
    for (let row = totalRows - 1; row >= 0; row--) {
      const rows = [];
      for (let column = 0; column < totalColumns; column++) {
        const cellCount = row * totalColumns + column + 1;
  
        // Find the player whose position matches the current cell
        const playerSeq = Object.keys(playersPosition).find(
          (seq) => playersPosition[seq] === cellCount
        );
  
        rows.push(
          <div
            key={cellCount}
            id={cellCount}
            className={`cell ${playerSeq ? "player" : ""}`}
            style={{
              width: "10vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            class="shadow p-3 mb-1 bg-white rounded"
          >
            {/* Display player email */}
            {playerSeq && (
              <div
                style={{
                  ...tokenStyle,
                 
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                P{playerSeq}
              </div>
            )}
            {cellCount}
          </div>
        );
      }
      cells.push(
        <div className="d-flex" key={row}>
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
                  Player uniqueID= P{playerBox.seq} , Name= {playerBox.name}
                
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      {/* // current Player */}
      {/* <h3> Current Player={currentPlayer}</h3> */}
      {/* // next player */}
      <h3> Next Player Turn={nextPlayer}</h3>
      {/* <h3>New position={newPosition}</h3>
      <h3>old position={oldPosition}</h3>
      <h3>diff={newPosition - oldPosition}</h3> */}
       {/* Display player's color */}
      

    </div>
  );
};

export default Board;



