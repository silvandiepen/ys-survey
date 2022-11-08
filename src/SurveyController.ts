import { useCallback, useEffect, useState } from "react";
import { useBetween } from "use-between";
import { surveyData, SurveyQuestion, SurveyQuestions } from "./survey";

const localStorageKey = `surveyTest`;

export const useSurvey = () => {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(true);
  const [init, setInit] = useState(false);
  const [questions, setQuestions] = useState(surveyData);

  /*
   *
   *  Init & Store
   *
   */
  const initSurvey = () => {

    if (init) return;
    const localData = localStorage.getItem(localStorageKey);

    if (!localData) {
      setStep(0);
      setInit(true);
      setDone(false);
      return;
    }

    const localDataJson = JSON.parse(localData);
    setQuestions(localDataJson.questions);
    setDone(localDataJson.done);
    setStep(localDataJson.step);
    setInit(true);
  };

  const saveToLocalStorage = () => {
    const saveData = {
      created: Math.floor(Date.now() / 1000),
      step: step,
      done: done,
      questions: questions,
    };

    console.log("survey ::: saving data", saveData);

    localStorage.setItem(localStorageKey, JSON.stringify(saveData));
  };

  const setQuestion = (id: string, value: string) => {
    questions[id].answer = value;
  };

  /*
   *
   *  Steps
   *
   */
  const nextStep = () => {
    if (done || !nextStepAvailable) return;

    setStep(step + 1);
  };

  useEffect(() => {
    step > 0 && saveToLocalStorage();
    if (step > 3) setDone(true);
  }, [step]);

  useEffect(() => {
    if (done && init) saveToLocalStorage();
  }, [done]);

  const prevStep = () => setStep(step - 1);

  const nextStepAvailable = !!!Object.values(questions).filter(
    (q: SurveyQuestion) => q.step == step && q.required && q.answer == ""
  ).length;

  /*
   *
   *  Answers
   *
   */

  const setAnswer = (id: string, answer: string, checked = true) => {
    setQuestions((prev: SurveyQuestions) => {
      if (prev[id].type == "checkbox") {
        let answers = [...new Set(prev[id].answer.split(", "))].filter(
          (v) => v !== ""
        );
        if (checked) {
          answers.push(answer);
        } else {
          answers = answers.filter((a) => a !== answer);
        }
        answer = answers.join(", ");
      }
      const newQuestion = prev[id];
      newQuestion.answer = `${answer}`;

      return {
        ...prev,
        [id]: newQuestion,
      };
    });
  };
  /*
   *
   *  Summary
   *
   */
  const showSummary = () => {
    return step == 3;
  };

  const currentQuestionIds = () => {
    return Object.values(questions)
      .filter((q) => q.step == step)
      .map((q) => q.id);
  };

  const getQuestion = (id: string) => {
    return Object.values(questions).find((q) => q.id == id);
  };

  return {
    questions,
    getQuestions: questions,
    getQuestion,
    currentQuestionIds,
    isDone: done,
    currentStep: step,
    nextStep,
    prevStep,
    setAnswer,
    initSurvey,
    showSummary,
  };
};

export const useSharedSurvey = () => useBetween(useSurvey);
