import { useBemm } from "bemm";
import "./Summary.scss";
import { useSharedSurvey } from "../../hooks/SurveyController";
import { ReactElement } from "react";

export const Summary = () => {
  const { getQuestions } = useSharedSurvey();

  const bemm = useBemm("summary", {
    return: "string",
  });

  const Answers = (): ReactElement[] => {
    const answer: ReactElement[] = [];

    Object.values(getQuestions).forEach((question, index) => {
      answer.push(
        <dl className={bemm("list")} key={index}>
          <dt className={bemm("question")}>{question.question}</dt>
          <dd className={bemm("answer")}>{typeof question.answer == "string" ? question.answer : question.answer.join(', ')}</dd>
        </dl>
      );
    });
    return answer;
  };

  return (
    <div className={bemm()}>
      <>{Answers()}</>
    </div>
  );
};
