// Leaderboard.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import baseURL from '../../config';

const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);

  useEffect(() => {
    // Make a GET request using Axios
    axios.get(`${baseURL}/player/leaderBoard`)
      .then((response) => {
        console.log(response);
        setLeaderboardData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div className="container mt-5">
      <h2>Leaderboard</h2>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Global Ranking</th>
          </tr>
        </thead>
        <tbody>
          {leaderboardData.map((entry) => (
            <tr key={entry.id}>
              <td>{entry.id}</td>
              <td>{entry.emailId}</td>
              <td>{entry.globalRanking}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
