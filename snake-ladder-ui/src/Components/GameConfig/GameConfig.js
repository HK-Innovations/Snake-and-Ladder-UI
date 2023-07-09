import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Snake from "../../Assets/snake.png";
import Ladder from "../../Assets/ladder.png";
import baseURL from "../../config";

const GameConfig = () => {
  const [boardRows, setBoardRows] = useState(10);
  const [boardColumns, setBoardColumns] = useState(10);
  const [diceCount, setDiceCount] = useState(3);
  const [playerCount, setPlayerCount] = useState(4);
  const [snakeOrLadder, setSnakeOrLadder] = useState([{ start: "", end: "" }]);

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
      snakeOrLadder: {},
    };

    snakeOrLadder.forEach((position, index) => {
      data.snakeOrLadder[position.start] = position.end;
    });

    axios
      .post(`${baseURL}/configure/game`, data)
      .then((response) => {
        console.log("Data successfully sent:", response.data);
        localStorage.setItem("gameData", JSON.stringify(response.data));
        window.location.replace(`${window.location.origin}/join`);
      })
      .catch((error) => {
        console.error("Error sending data:", error);
      });
  };

  return (
    <div className="game-config-page">
      <div className="game-config-parent">
        <div className="game-config-card">Game Configuration</div>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="boardRows" className="form-label">
              Board Rows:
            </label>
            <input
              type="number"
              className="form-control"
              id="boardRows"
              value={boardRows}
              onChange={(event) => setBoardRows(parseInt(event.target.value))}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="boardColumns" className="form-label">
              Board Columns:
            </label>
            <input
              type="number"
              className="form-control"
              id="boardColumns"
              value={boardColumns}
              onChange={(event) =>
                setBoardColumns(parseInt(event.target.value))
              }
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="diceCount" className="form-label">
              Dice Count:
            </label>
            <input
              type="number"
              className="form-control"
              id="diceCount"
              value={diceCount}
              onChange={(event) => setDiceCount(parseInt(event.target.value))}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="playerCount" className="form-label">
              Player Count:
            </label>
            <input
              type="number"
              className="form-control"
              id="playerCount"
              value={playerCount}
              onChange={(event) => setPlayerCount(parseInt(event.target.value))}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Snake and Ladder:</label>
            <p>
              For Snake: Start Position {">"} End Position{" "}
              <img
                src={Snake}
                alt=""
                style={{ marginLeft: 10, width: "60px", height: "70px" }}
              />
            </p>
            <p>
              For Ladder: Start Position {"<"} End Position{" "}
              <img
                src={Ladder}
                alt=""
                style={{ marginLeft: 10, width: "55px", height: "55px" }}
              />
            </p>

            {snakeOrLadder.map((position, index) => (
              <div key={index} className="d-flex">
                <input
                  type="number"
                  className="form-control me-2"
                  placeholder="Start Position"
                  value={position.start}
                  onChange={(event) =>
                    handlePositionChange(index, "start", event.target.value)
                  }
                  required
                />
                <input
                  type="number"
                  className="form-control me-2"
                  placeholder="End Position"
                  value={position.end}
                  onChange={(event) =>
                    handlePositionChange(index, "end", event.target.value)
                  }
                  required
                />
              </div>
            ))}
            <button
              type="button"
              className="btn btn-secondary mt-2"
              onClick={handleAddPosition}
            >
              Add
            </button>
          </div>
          <button type="submit" className="btn btn-primary">
            Create Game
          </button>
        </form>
      </div>
    </div>
  );
};

export default GameConfig;
