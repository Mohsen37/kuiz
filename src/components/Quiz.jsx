import { nanoid } from "nanoid";

function Quiz(props) {
  function clickHandle(answer) {
    if (props.quizItem.checked) {
      return;
    }
    props.clickAnswerHandle(props.id, answer);
  }
  return (
    <div className="quiz-item">
      <h3>{atob(props.quizItem.question)}</h3>
      <div className="wrapper">
        {props.quizItem.answers?.map((ans) => {
          let id = null;
          if (props.quizItem.checked) {
            if (props.quizItem.correct_answer == ans) {
              id = "correct";
            } else if (props.quizItem.selected === ans) {
              id = "incorrect";
            } else {
              id = "noSelected";
            }
          }
          return (
            <button
              key={nanoid()}
              id={id}
              className={
                ans === props.quizItem.selected ? "answer selected" : "answer"
              }
              onClick={() => clickHandle(ans)}
            >
              {atob(ans)}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default Quiz;
