import React from "react";
import Particles from "react-tsparticles";
import { loadBigCirclesPreset } from "tsparticles-preset-big-circles";
import "./Template.css";
import SideDrawer from "../SideDrawer/SideDrawer";
import { Link } from "react-router-dom";

function particlesInit(tsParticles) {
  console.log("init", tsParticles);

  loadBigCirclesPreset(tsParticles);
}

export default function Template() {
  return (
    <div className="template-app-container">
      <Particles
        options={{
          preset: "big-circles"
        }}
        init={particlesInit}
      />

      <div className="template-side-drawer-btn">
        <SideDrawer />
      </div>
      <div className="template-button-container">
      
        <Link to={`/join-gameId`} className="template-button">
          Join with GameID
        </Link>
        <Link to={`/default`} className="ms-5 template-button">
          Default
        </Link>
        <Link to={`/game-config`} className="ms-5 template-button">
          Own Template
        </Link>
      </div>
    </div>
  );
}
