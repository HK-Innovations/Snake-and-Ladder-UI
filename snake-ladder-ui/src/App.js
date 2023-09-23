import React from "react";
import GameConfig from "./Components/GameConfig/GameConfig";
import Signup from "./Components/Signup/Signup";
import Login from "./Components/Login/Login";
import Template from "./Components/Template/Template";
import Board from "./Components/Board/Board";
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import JoinPage from "./Components/Join-page/JoinPage";
import JoinGameId from "./Components/Join-gameID/JoinGameId.js";
import FireWorks from "./Components/FireWorks/FireWorks";
import Leaderboard from "./Components/LeaderBoard/LeaderBoard";
import Career from "./Components/Career/Career";
import About from "./Components/About/About";
import Default from "./Components/Default/Default";


export default function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/template" element={<Template />} />
      <Route path="/game-config" element={<GameConfig />} />
      <Route path="/join" element={<JoinPage />} />
      <Route path="/join-gameId" element={<JoinGameId />} />
      <Route path="/board" element={<Board />} />
      <Route path="/fire-works" element={<FireWorks/>} />
      <Route path="/leader-board" element={<Leaderboard/>} />
      <Route path="/career" element={<Career/>} />
      <Route path="/about" element={<About/>} />
      <Route path="/default" element={<Default/>} />
    </Routes>
  </BrowserRouter>
  );
}
