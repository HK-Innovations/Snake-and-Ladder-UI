import React, { useRef, useState, useEffect } from "react";
import ReactDice from "react-dice-complete";
import "./Board.css";
import { over } from "stompjs";
import SockJS from "sockjs-client";
import baseURL from "../../config";

var stompClient = null;
const Board = () => {
  //dice
  const diceRef = useRef();
  const [diceValues, setDiceValues] = useState([]);

  const storedData = localStorage.getItem("gameDataNEW");
  const parsedData = JSON.parse(storedData);
  const noOfDices = parsedData.board.dice.count;
  console.log("Parsed Data Log->", parsedData);
  const gameId = parsedData?.id;
  const emailId = parsedData?.emailId;
  useEffect(() => {
    myMethod();
  }, []);

  const myMethod = () => {
    console.log("Inside My Method");
    if (!stompClient) {
      const url =  `${baseURL}/SnakeLadder`;
      console.log(url);
      let Sock = new SockJS(url); //server connection
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

    const movePlayerReq = {
      gameId: gameId,
      emailId: emailId,
      sum: diceValues,
    };

    console.log("movePlayerReq->", movePlayerReq);
    stompClient.send("/app/movePlayer", {}, JSON.stringify(movePlayerReq));
    console.log("after send");
  };

  const handleDiceRoll = (values) => {
    setDiceValues(values);

  };
  const onMovePlayer = (response) => {
    // const response = JSON.parse(message.body);
    console.log(response.body);
  };
  const totalRows = parsedData.boardRows;
  const totalColumns = parsedData.boardColumns;

  const [playerPosition, setPlayerPosition] = useState(1);

  // Render the board cells
  const renderBoardCells = () => {
    const cells = [];

    for (let row = totalRows; row >= 1; row--) {
      for (let column = 1; column <= totalColumns; column++) {
        const cellCount = (row - 1) * totalColumns + column;

        const cell = (
          <div
            key={cellCount}
            className={`cell ${playerPosition === cellCount ? "player" : ""}`}
          >
            {cellCount}
          </div>
        );

        cells.push(cell);
      }
    }

    return cells;
  };

  return (
    <div>

      <div className="board">{renderBoardCells()}</div>

      <div>
        <ReactDice
          numDice={noOfDices}
          rollTime={1}
          disableIndividual
          ref={diceRef}
          faceColor="radial-gradient(rgb(255, 60, 60), rgb(180, 0, 0))"
          dotColor="#fff"
          dieSize={40}
          rollDone={handleDiceRoll}
        />
        <button onClick={handleRoll}>Rotate</button>
        <div> Sum : {diceValues} </div>
      </div>
    </div>
  );
};

export default Board;
