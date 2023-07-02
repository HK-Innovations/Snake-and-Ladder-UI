import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Snake from "../../Assets/snake.png";
import Ladder from "../../Assets/ladder.png";

const GameConfig = () => {
  const [boardRows, setBoardRows] = useState(10);
  const [boardColumns, setBoardColumns] = useState(10);
  const [diceCount, setDiceCount] = useState(3);
  const [playerCount, setPlayerCount] = useState(4);
  const [snakeOrLadder, setSnakeOrLadder] = useState([
    { start: "", end: "" },
  ]);

  const handlePositionChange = (index, type, value) => {
    const updatedSnakeOrLadder = [...snakeOrLadder];
    updatedSnakeOrLadder[index][type] = value;
    setSnakeOrLadder(updatedSnakeOrLadder);
  };

  const handleAddPosition = () => {
    setSnakeOrLadder([...snakeOrLadder, { start: "", end: "" }]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Board Rows:", boardRows);
    console.log("Board Columns:", boardColumns);
    console.log("Dice Count:", diceCount);
    console.log("Player Count:", playerCount);
    console.log("Snake or Ladder:", snakeOrLadder);

    const data = {
      boardRows: boardRows,
      boardColumns: boardColumns,
      diceCount: diceCount,
      playerCount: playerCount,
      gameState: "JOIN",
      snakeOrLadder: {}
    };

    snakeOrLadder.forEach((position, index) => {
      data.snakeOrLadder[position.start] = position.end;
    });

    axios.post('http://localhost:8080/configure/game', data)
      .then(response => {
        console.log('Data successfully sent:', response.data);
        
      })
      .catch(error => {
        console.error('Error sending data:', error);
      
      });
  };

  return (
    <div className="container">
      <h2 className="text-center mt-5">Game Configuration</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="boardRows" className="form-label">Board Rows:</label>
          <input
            type="number"
            className="form-control"
            id="boardRows"
            value={boardRows}
            onChange={(event) => setBoardRows(parseInt(event.target.value))}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="boardColumns" className="form-label">Board Columns:</label>
          <input
            type="number"
            className="form-control"
            id="boardColumns"
            value={boardColumns}
            onChange={(event) => setBoardColumns(parseInt(event.target.value))}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="diceCount" className="form-label">Dice Count:</label>
          <input
            type="number"
            className="form-control"
            id="diceCount"
            value={diceCount}
            onChange={(event) => setDiceCount(parseInt(event.target.value))}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="playerCount" className="form-label">Player Count:</label>
          <input
            type="number"
            className="form-control"
            id="playerCount"
            value={playerCount}
            onChange={(event) => setPlayerCount(parseInt(event.target.value))}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Snake and Ladder:</label>
          <p>For Snake: Start Position {'>'} End Position <img src={Snake} alt="" style={{ marginLeft:10, width: '60px', height: '70px' }}/> </p>
          <p>For Ladder: Start Position {'<'} End Position <img src={Ladder} alt="" style={{ marginLeft:10, width: '55px', height: '55px' }}/> </p>

          {snakeOrLadder.map((position, index) => (
            <div key={index} className="d-flex">
              <input
                type="number"
                className="form-control me-2"
                placeholder="Start Position"
                value={position.start}
                onChange={(event) => handlePositionChange(index, "start", event.target.value)}
              />
              <input
                type="number"
                className="form-control me-2"
                placeholder="End Position"
                value={position.end}
                onChange={(event) => handlePositionChange(index, "end", event.target.value)}
              />
            </div>
          ))}
          <button type="button" className="btn btn-secondary mt-2" onClick={handleAddPosition}>
            Add
          </button>
        </div>
        <button type="submit" className="btn btn-primary" onClick={()=>{window.location.replace(`${window.location.origin}/board`)} }  >Create Game</button>
      </form>
    </div>
  );
};

export default GameConfig;
