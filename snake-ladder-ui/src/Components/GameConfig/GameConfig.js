import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const GameConfig = () => {
  const [boardRows, setBoardRows] = useState(10);
  const [boardColumns, setBoardColumns] = useState(10);
  const [diceCount, setDiceCount] = useState(1);
  const [playerCount, setPlayerCount] = useState(2);
  const [snake, setSnake] = useState([
    { start: "", end: "" },
  ]);
  const [Ladder, setLadder] = useState([
    { start: "", end: "" },
  ]);

  const handlePositionChangeSnake = (index, type, value) => {
    const updatedSnakeOrLadder = [...snake];
    updatedSnakeOrLadder[index][type] = value;
    setSnake(updatedSnakeOrLadder);
  };

  const handleAddPositionSnake = () => {
    setSnake([...snake, { start: "", end: "" }]);
  };

  const handlePositionChangeLadder = (index, type, value) => {
    const updatedSnakeOrLadder = [...Ladder];
    updatedSnakeOrLadder[index][type] = value;
    setLadder(updatedSnakeOrLadder);
  };

  const handleAddPositionLadder = () => {
    setLadder([...Ladder, { start: "", end: "" }]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Perform any necessary validation or processing of the input values
    // You can access the state variables here and use them as needed

    // Example: Log the input values
    console.log("Board Rows:", boardRows);
    console.log("Board Columns:", boardColumns);
    console.log("Dice Count:", diceCount);
    console.log("Player Count:", playerCount);
    console.log("Snake:", snake);
    console.log("Ladder:", Ladder);
  };

  return (
    <div className="container">
      <h2 className="text-center mt-5">Game Settings</h2>
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
          <label className="form-label">Snake :</label>
          {snake.map((position, index) => (
            <div key={index} className="d-flex">
              <input
                type="number"
                className="form-control me-2"
                placeholder="Start Position"
                value={position.start}
                onChange={(event) => handlePositionChangeSnake(index, "start", event.target.value)}
              />
              <input
                type="number"
                className="form-control me-2"
                placeholder="End Position"
                value={position.end}
                onChange={(event) => handlePositionChangeSnake(index, "end", event.target.value)}
              />
            </div>
          ))}
          
          <button type="button" className="btn btn-secondary mt-2" onClick={handleAddPositionSnake}>
            Add
          </button>
        </div>

        <div className="mb-3">
          <label className="form-label">Ladder :</label>
          {Ladder.map((position, index) => (
            <div key={index} className="d-flex">
              <input
                type="number"
                className="form-control me-2"
                placeholder="Start Position"
                value={position.start}
                onChange={(event) => handlePositionChangeLadder(index, "start", event.target.value)}
              />
              <input
                type="number"
                className="form-control me-2"
                placeholder="End Position"
                value={position.end}
                onChange={(event) => handlePositionChangeLadder(index, "end", event.target.value)}
              />
            </div>
          ))}
          
          <button type="button" className="btn btn-secondary mt-2" onClick={handleAddPositionLadder}>
            Add
          </button>
        </div>

        <button type="submit" className="btn btn-primary">Start Game</button>
      </form>
    </div>
  );
};

export default GameConfig;
