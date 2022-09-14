// import {Client} from "whatsapp-web.js";
import whiteLogo from "../../img/whatstimelogowhite.png";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

function HomePage() {
  return (
    <>
      <div className="homeBody">
        <img src={whiteLogo} alt="" />

        <div className="buttonGroup">
          <Link to="/register">Get Started</Link>
        </div>
      </div>
    </>
  );
}

export default HomePage;
