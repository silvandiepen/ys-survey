
import { createBemm } from "bemm";

import { Button } from "./components/UI/Button";
import { Question } from "./components/Question";
import { Summary } from "./components/Summary";

import { useSurvey } from "./SurveyController";

import "./assets/style/App.scss";


const bemm = createBemm("app");

function App() {
  const {
    getQuestions,
    nextStep,
    isDone,
    nextStepAvailable,
    initSurvey,
    showSummary,
  } = useSurvey();

  initSurvey();

  return (
    <div className={bemm()}>
      {getQuestions().map((question, index) => {
        return <Question id={question.id} key={index} />;
      })}

      {showSummary() && <Summary />}

      {!isDone && nextStepAvailable() && (
        <Button onClick={() => nextStep()} size="large" color="tertiary">
          {showSummary() ? `Submit answers` : `Next step`}
        </Button>
      )}

      {isDone && <p>Thank you for taking part in this survey!</p>}
    </div>
  );
}

export default App;
