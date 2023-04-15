import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import Quiz from "../src/components/Quiz";
import "./App.css";

function App() {
  const [data, setData] = useState();
  const [checked, setChecked] = useState(false);
  const [correct, setCorrect] = useState(0);

  const shuffleAnswers = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  };

  // fetching the api and adding the ID
  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5&type=multiple&encode=base64")
      .then((res) => res.json())
      .then((data) =>
        setData(
          data.results.map((item) => {
            return {
              ...item,
              id: nanoid(),
              selected: null,
              checked: false,
              answers: shuffleAnswers([
                ...item.incorrect_answers,
                item.correct_answer,
              ]),
            };
          })
        )
      );
  }, []);

  function checkHandle() {
    let selected = true;
    data.forEach((q) => {
      if (q.selected === null) {
        selected = false;
        return;
      }
    });
    if (!selected) {
      return;
    }
    setData((data) =>
      data.map((item) => {
        return { ...item, checked: true };
      })
    );
    setChecked(true);
    let correct = 0;
    data.forEach((q) => {
      if (q.correct_answer === q.selected) {
        correct += 1;
      }
    });
    setCorrect(correct);
  }

  function clickAnswerHandle(id, answer) {
    setData((data) =>
      data.map((item) => {
        return item.id === id ? { ...item, selected: answer } : item;
      })
    );
  }

  return (
    <div className="App">
      {data?.map((item) => (
        <Quiz
          key={item.id}
          quizItem={item}
          id={item.id}
          clickAnswerHandle={clickAnswerHandle}
        />
      ))}
      <div className="result">
        {data && (
          <button className="result-btn" onClick={checkHandle}>
            Check Answers
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
