import { useState } from "react";
import { surveyData, SurveyQuestion, SurveyQuestions } from "./survey";

const localStorageKey = `surveyTest`;

export const useSurvey = () => {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [questions, setQuestions] = useState(surveyData);

  /*
   *
   *  Init & Store
   *
   */
  const initSurvey = () => {
    const localData = localStorage
      ? JSON.parse(localStorage.getItem(localStorageKey) || "{}")
      : null;

    if (localData && Object.values(localData).length) {
      setQuestions(localData.questions);
      setDone(localData.done);
      setStep(localData.step);
    }
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

  const getQuestions = () =>
    Object.values({ ...questions }).filter(
      (question: SurveyQuestion) => question.step === step
    );

  const getQuestion = (id: string) => {
    return questions[id];
  };

  /*
   *
   *  Questions
   *
   */
  const nextStep = () => {
    if (done) return;

    if (!nextStepAvailable) {
      // console.log("NO YOU CANTTTT");
      return;
    }

    setStep(step + 1);
    if (step == 3) setDone(true);

    // saveToLocalStorage()
  };
  const prevStep = () => {
    setStep(step - 1);
  };

  const nextStepAvailable = () => {
    return true;
    // return !!!getQuestions().filter(
    //   (q: SurveyQuestion) => q.required && q.answer == ""
    // ).length;
  };
  // A question is only un answered if the answer is empty and the question is required.
  //   const unAnsweredQuestions = ;
  //   return !!!unAnsweredQuestions.length;
  // };

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

  const getSummary = () => {
    return Object.values(questions).map((q) => ({
      question: q.question,
      answer: q.answer,
    }));
  };
  const showSummary = () => {
    return step == 3;
  };

  return {
    questions,
    setQuestions,
    getQuestions,
    getQuestion,
    getSummary,
    nextStepAvailable,
    isDone: done,
    currentStep: step,
    nextStep,
    prevStep,
    setAnswer,
    initSurvey,
    showSummary,
  };
};
