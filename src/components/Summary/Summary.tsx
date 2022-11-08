import { createBemm } from "bemm";
import "./Summary.scss";
import { useSharedSurvey } from "../../hooks/SurveyController";
import { ReactElement } from "react";

type SummaryProps = {};

export const Summary = ({}: SummaryProps) => {
  const { getQuestions } = useSharedSurvey();

  const bemm = createBemm("summary", {
    return: "string",
  });

  const Answers = (): ReactElement[] => {
    const answer: ReactElement[] = [];

    Object.values(getQuestions).map((question, index) => {
      answer.push(
        <dl className={bemm("list")} key={index}>
          <dt className={bemm("question")}>{question.question}</dt>
          <dd className={bemm("answer")}>{question.answer}</dd>
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
