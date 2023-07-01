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


export default function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/template" element={<Template />} />
      <Route path="/game-config" element={<GameConfig />} />
      <Route path="/board" element={<Board />} />
    </Routes>
  </BrowserRouter>
    // <Router>
    //   <Routes>
    //     <Route path="/" component={Login} />
    //     <Route path="/signup" component={Signup} />
    //     <Route path="/template" component={Template} />
    //     <Route path="/game-config" component={GameConfig} />
    //     <Route path="/board" component={Board} />
    //   </Routes>
    // </Router>



// <Routes>
// <Route path="/" element={<Login />} />
// <Route path="/signup" element={<Signup />} />
// <Route path="/template" element={<Template />} />
// <Route path="/game-config" element={<GameConfig />} />
// <Route path="/board" element={<Board />} />

// </Routes>

  );
}
