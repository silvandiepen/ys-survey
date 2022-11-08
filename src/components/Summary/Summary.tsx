import { createBemm } from "bemm";
import "./Summary.scss";
import { useSurvey } from "../../SurveyController";

type SummaryProps = {};

export const Summary = ({}: SummaryProps) => {
  const { getSummary } = useSurvey();

  const bemm = createBemm("summary", {
    return: "string",
  });

  return (
    <div className={bemm()}>
      {getSummary().map((question, index) => {
        return (
          <dl className={bemm("list")}  key={index}>
            <dt className={bemm("question")}>
              {question.question}
            </dt>
            <dd className={bemm("answer")}>{question.answer}</dd>
          </dl>
        );
      })}
    </div>
  );
};
