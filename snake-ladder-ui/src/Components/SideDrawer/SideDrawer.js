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
// import Snake from "../../Assets/Template/snake.png";
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
          <h3 className="mt-3"> <FontAwesomeIcon icon={faHome} />{"   "}Home</h3>
          <h3 className="mt-3"><FontAwesomeIcon icon={faAddressCard} />{"   "}About</h3>
          <h3 className="mt-3"><FontAwesomeIcon icon={faAward} />{"   "}Career</h3>
          <h3 className="mt-3"><FontAwesomeIcon icon={faTrophy} />{"   "}Leader Board</h3>
          <h3 className="mt-3"><FontAwesomeIcon icon={faChessBoard} />{"   "}Default Boards</h3>
          <h3 className="mt-3"><FontAwesomeIcon icon={faAward} />{"   "}Logout</h3>
        </div>
        <img className="side-drawer-animation" src={Snake} alt='Snake'/>
      </div>
     
    </div>
  );
}
