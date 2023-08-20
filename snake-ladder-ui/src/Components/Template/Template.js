import React from "react";
import Particles from "react-tsparticles";
import { loadBigCirclesPreset } from "tsparticles-preset-big-circles";
import "./Template.css";
import SideDrawer from "../SideDrawer/SideDrawer";

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
        <SideDrawer/>
      </div>
      <div className="template-button-container">
      
    
        <button className="template-button"  onClick={() => {
          window.location.replace(`${window.location.origin}/join-gameId`);
        }}>Join with GameID</button>
        <button className="ms-5 template-button" >Default</button>
        <button className="ms-5 template-button"  onClick={() => {
          window.location.replace(`${window.location.origin}/game-config`);
        }}>Own Template</button>
      </div>
    </div>
  );
}
