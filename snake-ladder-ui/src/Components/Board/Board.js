import React, { useRef, useState } from "react";
import ReactDice from "react-dice-complete";
import axios from "axios";
import "./Board.css";
import baseURL from "../../config";

const Board = () => {
  //dice
  const diceRef = useRef();
  const [diceValues, setDiceValues] = useState([]);

  const storedData = localStorage.getItem("gameData");
  const parsedData = JSON.parse(storedData);
  // console.log(parsedData);
  const gameId = parsedData?.id;
  const emailId = parsedData?.emailId;

  const handleRoll = () => {
    diceRef.current.rollAll();
  };

  const handleDiceRoll = (values) => {
    setDiceValues(values);

    // const apiUrl = `${baseURL}/player/movePlayer`; //change

    // try {
    //   const response = axios.post(apiUrl, {
    //     gameId: gameId,
    //     diceValue: diceValues,
    //     currentPlayer: emailId,
    //   });
    //   console.log("Dice Roll Response:", response.data);
    // } catch (error) {
    //   console.error("Error making POST request:", error);
    // }
  };

  const totalRows = 10;
  const totalColumns = 10;

  const [playerPosition, setPlayerPosition] = useState(1); // Initial player position

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
          numDice={2}
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
