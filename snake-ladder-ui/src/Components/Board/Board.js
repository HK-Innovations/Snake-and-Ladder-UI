import React, { useState } from 'react';
import './Board.css'; // CSS file for styling
import Dice from './Dice';

const Board = () => {
  const totalRows = 10;
  const totalColumns = 10;
  const totalCells = totalRows * totalColumns;

  const [playerPosition, setPlayerPosition] = useState(1); // Initial player position
  const [diceSum, setDiceSum] = useState(0); // Initial sum of dice values

  const rollDice = (num) => {
    const diceValue = Math.floor(Math.random() * num) + 1; // Generate a random dice value between 1 and num
    setPlayerPosition((prevPosition) => prevPosition + diceValue);
    setDiceSum((prevSum) => prevSum + diceValue);
  };

  // Render the board cells
  const renderBoardCells = () => {
    const cells = [];

    for (let row = totalRows; row >= 1; row--) {
      for (let column = 1; column <= totalColumns; column++) {
        const cellCount = (row - 1) * totalColumns + column;

        const cell = (
          <div
            key={cellCount}
            className={`cell ${playerPosition === cellCount ? 'player' : ''}`}
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
      <Dice rollDice={rollDice} />
    </div>
  );
};

export default Board;
