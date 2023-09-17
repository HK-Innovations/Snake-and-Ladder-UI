import React, { useState, useEffect } from 'react';
import axios from 'axios';
import baseURL from '../../config';

const Career = () => {
  const email = localStorage.getItem('email');
  const emailId = email;
  const apiUrl = `${baseURL}/player/career`;

  const [careerData, setCareerData] = useState(null);

  useEffect(() => {
    axios({
      method: 'post', // Change to POST request
      url: apiUrl,
      data: { emailId }, // Send emailId in the request body
      headers: {
        'Content-Type': 'application/json', // Set the content type as JSON
      },
    })
      .then(response => {
        // Handle the response data here
        setCareerData(response.data);
      })
      .catch(error => {
        // Handle errors here
        console.error(error);
      });
  }, []); // Empty dependency array ensures the effect runs only once

  return (
    <div className="container mt-5">
      <h1>Career Data</h1>
      {careerData && (
        <div>
          <p>ID: {careerData.id}</p>
          <p>Total Games Played: {careerData.totalGamesPlayed}</p>
          <p>Total Wins: {careerData.totalWins}</p>
          <p>Total Losses: {careerData.totalLoss}</p>
        </div>
      )}
    </div>
  );
};

export default Career;
