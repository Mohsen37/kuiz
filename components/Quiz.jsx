import { useState } from "react";

function Quiz(props) {
  const [choice, setChoice] = useState({
    choice: "",
  });
  let answerList = props.quizItem.incorrect_answers.concat(
    props.quizItem.correct_answer
  );
  const shuffleAnswer = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  };
  shuffleAnswer(answerList);

  function showAnswerHandle(event) {
    const { value, name } = event.target;
    if (value === props.quizItem.correct_answer) {
      console.log("✅");
    } else {
      console.log("❌");
    }
  }

  return (
    <div className="quiz-item">
      <h3>{props.quizItem.question}</h3>
      <div className="wrapper">
        {answerList?.map((ans, index) => (
          <div className="answer-list" key={index}>
            <div>
              <input
                type="radio"
                onChange={showAnswerHandle}
                name={props.quizItem.correct_answer}
                value={ans}
                id={ans}
              />
              <label className={`{}`} htmlFor={ans}>
                {ans}
              </label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Quiz;
