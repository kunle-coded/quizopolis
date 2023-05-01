import React from "react";
import logo from "../images/quizopolis-logo.png";

export default function () {
  return (
    <nav>
      <img src={logo} className="logo"></img>
      <h1>Quizopolis</h1>
      <div className="toggler">
        <p className="toggler--light">Light</p>
        <div className="toggler--slider">
          <div className="toggler--slider--circle"></div>
        </div>
        <p className="toggler--dark">Dark</p>
      </div>
    </nav>
  );
}
