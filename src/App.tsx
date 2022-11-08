import { createBemm } from "bemm";

import { Button } from "./components/Button";
import { Question } from "./components/Question";
import { Summary } from "./components/Summary";

import { useSharedSurvey } from "./hooks/SurveyController";
import { SurveyQuestion } from "./hooks/survey";

import "./assets/style/App.scss";

const bemm = createBemm("app");

function App() {
  const {
    currentQuestionIds,
    nextStep,
    isDone,
    initSurvey,
    showSummary,
    questions,
    currentStep,
  } = useSharedSurvey();

  initSurvey();

  const nextStepAvailable = () =>
    !!!Object.values(questions).filter(
      (q: SurveyQuestion) => q.step == currentStep && q.required && q.answer == ""
    ).length;

  const Questions = () => {
    const questions = [];

    for (let i = 0; i < currentQuestionIds().length; i++) {
      questions.push(
        <Question id={currentQuestionIds()[i]} key={i}></Question>
      );
    }
    return questions;
  };

  return (
    <div className={bemm()} data-testid="survey">
      {Questions()}

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
