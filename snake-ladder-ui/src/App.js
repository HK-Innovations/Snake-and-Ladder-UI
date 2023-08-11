import React from "react";
// import { Content } from './Components/Content/Content';
import GameConfig from "./Components/GameConfig/GameConfig";
import Signup from "./Components/Signup/Signup";
import Login from "./Components/Login/Login";
import Template from "./Components/Template/Template";
import Board from "./Components/Board/Board";
import {
  BrowserRouter,
  Link,
  Route,
  Routes,
} from "react-router-dom";
import JoinPage from "./Components/Join-page/JoinPage";
import JoinGameId from "./Components/Join-gameID/JoinGameId.js";
import FireWorks from "./Components/FireWorks";


export default function App() {
  return (
    <BrowserRouter>
    <Routes>
    {/* <Route path="/" element={<Board rows={10} columns={10}/>} /> */}
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/template" element={<Template />} />
      <Route path="/game-config" element={<GameConfig />} />
      <Route path="/join" element={<JoinPage />} />
      <Route path="/join-gameId" element={<JoinGameId />} />
      <Route path="/board" element={<Board />} />
      <Route path="/fire-works" element={<FireWorks/>} />
    </Routes>
  </BrowserRouter>
  );
}
