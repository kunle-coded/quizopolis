import React from "react";
import { nanoid } from "nanoid";
import Navabar from "./components/Navabar";
import Questions from "./components/Questions";
import Welcome from "./components/Welcome";

export default function App() {
  const [allData, setAllData] = React.useState([]);
  const [quizData, setQuizData] = React.useState([]);
  const [answerData, setAnswerData] = React.useState([]);
  const [start, setStart] = React.useState(false);
  const [count, setCount] = React.useState(0);
  const [showResult, setShowResult] = React.useState(false);

  function startQuiz() {
    setStart(true);
  }

  function sortOptions(options) {
    return options.sort(() => Math.random() - 0.5);
  }

  //Function update answer array state from Questions component
  //   function updateAnswer(answer) {
  //     setAnswerData((prevData) => {
  //       return [...prevData, answer];
  //     });
  //     console.log(answerData);
  //   }

  const checkAnswer = () => {};

  const handleCountChange = () => {
    setCount(count + 1);
    if (count === 4) {
      setShowResult(true);
    }
  };

  //////////////

  React.useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5&category=9&type=multiple")
      .then((res) => res.json())
      .then((data) => setAllData(data.results))
      .catch((error) => console.error(error));
  }, []);

  React.useEffect(() => {
    const updateData = allData.map((data) => ({
      ...data,
      id: nanoid(),
    }));
    setQuizData(updateData);
  }, [allData]);

  ///////

  const modifiedQuizData = quizData.map((question) => {
    const incorrectAnswers = question.incorrect_answers;
    const correctAnswer = question.correct_answer;

    // Check if the correct answer is already in the incorrect answers array
    const isCorrectAnswerInIncorrectAnswers =
      incorrectAnswers.includes(correctAnswer);

    // If the correct answer is not in the incorrect answers array, add it
    if (!isCorrectAnswerInIncorrectAnswers) {
      incorrectAnswers.push(correctAnswer);
    }

    incorrectAnswers.sort(() => Math.random() - 0.5);

    return {
      ...question,
      incorrect_answers: incorrectAnswers,
    };
  });

  const quizElement = modifiedQuizData.map(function (quiz, index) {
    return (
      <Questions
        key={quiz.id}
        quiz={quiz}
        count={count}
        checkAnswer={checkAnswer}
        handleCountChange={handleCountChange}
        answerData={answerData}
        setAnswerData={setAnswerData}
      />
    );
  });

  return (
    <main className="App">
      <Navabar />
      <div className="question--section">
        <Welcome start={start} startQuiz={startQuiz} />
        <div className={start ? "questions--card" : "questions--card hide"}>
          {quizElement}
          <div className="check--answer">
            <p className={!showResult ? "check--text-hide" : "check--text"}>
              You scored 3/5 correct answers
            </p>
            <button className="check--answer-button" onClick={checkAnswer}>
              Check answer
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
