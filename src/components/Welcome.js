import React from "react";

export default function Welcome(props) {
  return (
    <div className={props.start ? "welcome--card hide" : "welcome--card"}>
      <h1>Quizopolis</h1>
      <p>Test your wits!</p>
      <button className="welcome--button" onClick={props.startQuiz}>
        Start quiz
      </button>
    </div>
  );
}
