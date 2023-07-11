import React from "react";

export default function Template() {
  return (
    <div className="mt-4 ml-4">
      <button
        className="btn btn-warning mr-2"
        onClick={() => {
          window.location.replace(`${window.location.origin}/join-gameId`);
        }}
      >
        JOIN Game with GameId
      </button>
      <button className="btn btn-primary mr-2">Default Template</button>
      <button
        className="btn btn-secondary mr-4"
        onClick={() => {
          window.location.replace(`${window.location.origin}/game-config`);
        }}
      >
        Own Template
      </button>
    </div>
  );
}
