import React from "react";
import { nanoid } from "nanoid";
import { formatText } from "../components/formatter";

export default function Questions(props) {
  const [selected, setSelected] = React.useState(null);
  const [sel, setSel] = React.useState([]);
  const [selectedOption, setSelectedOption] = React.useState(null);
  const [selectedAnswers, setSelectedAnswers] = React.useState(new Set());
  //   const [updateSel, setUpdateSel] = React.useState(false);
  const [correctAnswers, setCorrectAnswers] = React.useState([]);
  //const [score, setScore] = React.useState(0);

  //const formattedAnswers = formatText(props.answer);

  const handleClick = (event, index) => {
    //count = count + 1;
    // setSelected(index);
    setSelectedOption(index);

    //checkAnswer(event);
    //handleAnswer(event, formattedAnswers);
    //const isCorrect = event.target.getAttribute("data-correct") === "true";

    // const formattedAnswer = formatText(props.quiz.correct_answer);
  };

  function checkAnswer(event) {
    //const answerSelected = event.target.textContent;
    // const isCorrect = event.target.getAttribute("data-correct") === "true";
    const isCorrect =
      props.quiz.incorrect_answers[selectedOption] ===
      props.quiz.correct_answer;

    // if (!answerSelected && isCorrect) {
    //   setSel([...sel, event.target.textContent]);
    // }
    if (isCorrect) {
      setSelectedAnswers(
        new Set(selectedAnswers).add(props.quiz.correct_answer)
      );
      setCorrectAnswers((prevData) => [...prevData, props.quiz.correct_answer]);
    }
  }

  React.useEffect(() => {
    checkAnswer();
  }, [selectedOption]);

  console.log(selectedAnswers);
  console.log(correctAnswers);

  const formattedQuiz = formatText(props.quiz.question);

  return (
    <div className="quiz--card">
      <div className="quiz--item">
        {formattedQuiz}
        <div className="quiz--options">
          {props.quiz.incorrect_answers.map((option, index) => {
            const formattedOptions = formatText(option);
            const backgroundColor = selectedOption === index ? "#ccccff91" : "";
            const isCorrect = option === props.quiz.correct_answer;

            return (
              <button
                key={nanoid()}
                onClick={(event) => handleClick(event, index)}
                style={{ backgroundColor }}
                data-correct={isCorrect}
              >
                {formattedOptions}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
  /////
}
