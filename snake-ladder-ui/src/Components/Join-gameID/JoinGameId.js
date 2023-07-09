import React, { useEffect, useState } from 'react';
import axios from 'axios';
import baseURL from "../../config";

const JoinGameId = () => {
  const [gameId, setGameId] = useState('');
  const [emailId, setEmailId] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseURL}/configure/getGame?gameId=${gameId}`);
        console.log(response.data); 
      } catch (error) {
        console.error(error);
      }
    };

    const interval = setInterval(() => {
      fetchData();
    }, 5000); 

    return () => {
      clearInterval(interval); 
    };
  }, [gameId]);

  const handleInputChange = (event) => {
    setGameId(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${baseURL}/player/join`, {
        emailId: emailId,
        gameId: gameId
      });
      if(response.status == 400)
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEmailChange = (event) => {
    setEmailId(event.target.value);
  };

  return (
    <div>
      <h1>Join with Game ID</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="floatingInput"
            placeholder="Enter Game ID"
            value={gameId}
            onChange={handleInputChange}
          />
          <label htmlFor="floatingInput">Game ID</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="email"
            className="form-control"
            id="floatingEmail"
            placeholder="Enter Email ID"
            value={emailId}
            onChange={handleEmailChange}
          />
          <label htmlFor="floatingEmail">Email ID</label>
        </div>
        <button type="submit" className="btn btn-primary">Join Game</button>
      </form>
    </div>
  );
};

export default JoinGameId;
