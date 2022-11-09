import { useEffect, useState } from "react";
import { useBetween } from "use-between";
import {
  surveyData,
  SurveyQuestion,
  SurveyQuestions,
  surveySteps,
} from "./survey";

const localStorageKey = `surveyTest`;

export const useSurvey = () => {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(true);
  const [init, setInit] = useState(false);
  const [title, setTitle] = useState("Survey");
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

    localStorage.setItem(localStorageKey, JSON.stringify(saveData));
  };

  /*
   *
   *  Steps
   *
   */
  const nextStep = () => {
    if (done || !nextStepAvailable) {
      return;
    }
    setStep(step + 1);
  };

  useEffect(() => {
    step > 0 && saveToLocalStorage();
    if (step > 3) setDone(true);
    if (surveySteps[step]) setTitle(surveySteps[step]);
  }, [step]);

  useEffect(() => {
    if (init) saveToLocalStorage();
  }, [done, init]);

  const prevStep = () => setStep(step - 1);

  const nextStepAvailable = !!!Object.values(questions).filter(
    (q: SurveyQuestion) => q.step === step && q.required && q.answer === ""
  ).length;

  /*
   *
   *  Answers
   *
   */

  const setAnswer = (id: string, answer: string | string[]) => {
    setQuestions((prev: SurveyQuestions) => {
      const newQuestion = prev[id];

      newQuestion.answer = answer;

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
    return step === 3;
  };
  /*
   *
   *  Question
   *
   */

  const currentQuestionIds = Object.values(questions)
    .filter((q) => q.step === step)
    .map((q) => q.id);

  const getQuestion = (id: string) => {
    return Object.values(questions).find((q) => q.id === id);
  };

  return {
    getQuestions: questions,
    getQuestion,
    currentQuestionIds,
    isDone: done,
    currentStep: step,
    currentTitle: title,
    nextStep,
    prevStep,
    setAnswer,
    showSummary,
    initSurvey,
  };
};

export const useSharedSurvey = () => useBetween(useSurvey);
