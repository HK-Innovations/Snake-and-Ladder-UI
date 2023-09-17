import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStream } from "@fortawesome/free-solid-svg-icons";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { faAddressCard } from "@fortawesome/free-solid-svg-icons";
import { faAward } from "@fortawesome/free-solid-svg-icons";
import { faTrophy } from "@fortawesome/free-solid-svg-icons";
import { faChessBoard } from "@fortawesome/free-solid-svg-icons";
import "./SideDrawer.css";
import Snake from "../../Assets/Template/snake404.png";

export default function SideDrawer() {
  return (
    <div>
      <a
        className="side-drawer-btn mt-5 "
        data-bs-toggle="offcanvas"
        href="#offcanvasExample"
        role="button"
        aria-controls="offcanvasExample"
      >
        <FontAwesomeIcon className="side-drawer-btn-color" icon={faStream} />
      </a>

      <div
        className="offcanvas offcanvas-start"
        tabIndex="-1"
        id="offcanvasExample"
        aria-labelledby="offcanvasExampleLabel"
      >
        <div className="offcanvas-header side-drawer-content ">
          <h5 className="offcanvas-title" id="offcanvasExampleLabel">
           Snake & Ladder
          </h5>
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="mt-3 ms-3">
        <div
        className="mt-5"
        onClick={() =>window.location.replace(`${window.location.origin}/template`)} // Navigate to "career" page
        style={{ cursor: "pointer" }} // Add cursor pointer to indicate it's clickable
      >
        {/* Add your FontAwesomeIcon and content */}
        <h3 className="mt-3"> <FontAwesomeIcon icon={faHome} />{"   "}Home</h3>
      </div> 

      <div
        className="mt-5"
        onClick={() =>window.location.replace(`${window.location.origin}/about`)} // Navigate to "career" page
        style={{ cursor: "pointer" }} // Add cursor pointer to indicate it's clickable
      >
        {/* Add your FontAwesomeIcon and content */}
        <h3 className="mt-3"> <FontAwesomeIcon icon={faHome} />{"   "}About</h3>
      </div> 

      <div
        className="mt-5"
        onClick={() =>window.location.replace(`${window.location.origin}/career`)} // Navigate to "career" page
        style={{ cursor: "pointer" }} // Add cursor pointer to indicate it's clickable
      >
        {/* Add your FontAwesomeIcon and content */}
        <h3 className="mt-3"> <FontAwesomeIcon icon={faHome} />{"   "}Career</h3>
      </div> 

      <div
        className="mt-5"
        onClick={() =>window.location.replace(`${window.location.origin}/leader-board`)} // Navigate to "career" page
        style={{ cursor: "pointer" }} // Add cursor pointer to indicate it's clickable
      >
        {/* Add your FontAwesomeIcon and content */}
        <h3 className="mt-3"> <FontAwesomeIcon icon={faHome} />{"   "}Leader Board</h3>
      </div> 

      <div
        className="mt-5"
        onClick={() =>window.location.replace(`${window.location.origin}/career`)} // Navigate to "career" page
        style={{ cursor: "pointer" }} // Add cursor pointer to indicate it's clickable
      >
        {/* Add your FontAwesomeIcon and content */}
        <h3 className="mt-3"> <FontAwesomeIcon icon={faHome} />{"   "}Default Board</h3>
      </div> 

      <div
        className="mt-5"
        onClick={() =>window.location.replace(`${window.location.origin}/`)} // Navigate to "career" page
        style={{ cursor: "pointer" }} // Add cursor pointer to indicate it's clickable
      >
        {/* Add your FontAwesomeIcon and content */}
        <h3 className="mt-3"> <FontAwesomeIcon icon={faHome} />{"   "}Logout</h3>
      </div> 

        </div>
        <img className="mt-5 side-drawer-animation" src={Snake} alt='Snake'/>
      </div>
     
    </div>
  );
}



