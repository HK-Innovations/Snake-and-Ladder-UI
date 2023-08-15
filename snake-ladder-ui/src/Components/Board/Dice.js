import React, { useRef, useState } from "react";
import ReactDice from "react-dice-complete";

export default function Dice() {
  const diceRef = useRef();
  const [diceValues, setDiceValues] = useState([]);

  const storedData = localStorage.getItem("gameData");
  const parsedData = JSON.parse(storedData);
  const gameId = parsedData?.id;

  const handleRoll = () => {
    diceRef.current.rollAll();
  };

  const handleDiceRoll = (values) => {
    setDiceValues(values);
  };

  return (
    <div>
      <ReactDice
        numDice={2}
        rollTime={1}
        disableIndividual
        ref={diceRef}
        faceColor="radial-gradient(rgb(255, 60, 60), rgb(180, 0, 0))"
        dotColor="#fff"
        dieSize={180}
        rollDone={handleDiceRoll}
      />
      <button onClick={handleRoll}>Rotate</button>
      <div> Sum : {diceValues} </div>
      
    </div>
  );
}