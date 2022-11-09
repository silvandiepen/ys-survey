import { createBemm } from "bemm";

import { Button } from "./components/Button";
import { Question } from "./components/Question";
import { Summary } from "./components/Summary";

import { useSharedSurvey } from "./hooks/SurveyController";
import { SurveyQuestion } from "./hooks/survey";

import "./assets/style/App.scss";
import { ReactElement, useEffect, useState } from "react";

const bemm = createBemm("app");

function App() {
  const {
    currentQuestionIds,
    nextStep,
    isDone,
    initSurvey,
    showSummary,
    getQuestions,
    currentStep,
  } = useSharedSurvey();

  initSurvey();

  const [goNext, setGoNext] = useState<boolean>(false);
  useEffect(() => {
    const requiredFields = Object.values(getQuestions).filter(
      (q: SurveyQuestion) =>
        q.step === currentStep && q.required && (typeof q.answer == "string" ? q.answer === "" : q.answer.length < 1)
    );
    setGoNext(!!!requiredFields.length);
  }, [getQuestions, currentStep]);


  const [questions, setQuestions] = useState<ReactElement[]>([]);
  useEffect(() => {
    const questions = [];

    for (let i = 0; i < currentQuestionIds.length; i++) {
      questions.push(<Question id={currentQuestionIds[i]} key={i}></Question>);
    }
    setQuestions(questions);
  }, [currentStep,currentQuestionIds]);

  return (
    <div className={bemm()} data-testid="survey">
      {questions}

      {showSummary() && <Summary />}

      {!isDone && goNext && (
        <Button onClick={() => nextStep()} size="large" color="tertiary">
          {showSummary() ? `Submit answers` : `Next step`}
        </Button>
      )}

      {isDone && <p>Thank you for taking part in this survey!</p>}
    </div>
  );
}

export default App;
