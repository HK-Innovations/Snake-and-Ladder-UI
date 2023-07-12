import React from 'react';

const Dice = ({ rollDice }) => {
  // Render the dice component
  return (
    <div className="dice">
      {/* Render your dice UI */}
      <button onClick={rollDice}>Roll Dice</button>
    </div>
  );
};

export default Dice;