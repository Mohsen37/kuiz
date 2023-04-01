import Quiz from "../components/Quiz";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Quiz num={1} />
      <Quiz num={2} />
      <Quiz num={3} />
      <Quiz num={4} />
    </div>
  );
}

export default App;
