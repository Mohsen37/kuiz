import { useEffect, useState } from "react";
import Quiz from "../components/Quiz";
import "./App.css";

function App() {
  const [checkList, setCheckList] = useState({
    0: false,
    1: false,
    2: false,
    3: false,
    4: false,
  });

  const [data, setData] = useState();
  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5&type=multiple")
      .then((res) => res.json())
      .then((data) => setData(data.results));
  }, []);

  return (
    <div className="App">
      {data?.map((item, index) => (
        <Quiz key={index} quizItem={item} />
      ))}
      <div className="result">
        {data && (
          <button onClick={showResultHandle} className="result-btn">
            Check Answers
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
