import { useBemm } from "bemm";
import { useSharedSurvey } from "../../hooks/SurveyController";

import {
  InputText,
  InputNumber,
  InputEmail,
  InputSelect,
  InputRadios,
  InputCheckboxes,
} from "../Input";

import "./Question.scss";

type QuestionProps = {
  id: string;
};

export const Question = ({ id }: QuestionProps) => {
  const { setAnswer, getQuestion } = useSharedSurvey();

  const question = getQuestion(id);

  const bemm = useBemm("question", {
    return: "string",
  });

  const handleChange = (data: { name: string; value: string | string[] }) => {
    setAnswer(data.name, data.value);
  };

  if (question === undefined) return <></>;

  return (
    <div className={bemm()}>
      {question.type === "text" && (
        <InputText
          name={question.id}
          value={question.answer}
          required={question.required}
          label={question.question}
          description={question.description}
          onChangeAction={handleChange}
          placeholder={question.placeholder}
        />
      )}
      {question.type === "email" && (
        <InputEmail
          name={question.id}
          value={question.answer}
          required={question.required}
          label={question.question}
          description={question.description}
          onChangeAction={handleChange}
          placeholder={question.placeholder}
        />
      )}
      {question.type === "number" && (
        <InputNumber
          name={question.id}
          value={question.answer}
          required={question.required}
          label={question.question}
          description={question.description}
          onChangeAction={handleChange}
          placeholder={question.placeholder}
        />
      )}
      {question.type === "select" && (
        <InputSelect
          name={question.id}
          value={question.answer}
          required={question.required}
          options={question.options}
          label={question.question}
          description={question.description}
          onChangeAction={handleChange}
          placeholder={question.placeholder}
        />
      )}
      {question.type === "radio" && (
        <InputRadios
          name={question.id}
          value={question.answer}
          required={question.required}
          options={question.options}
          label={question.question}
          description={question.description}
          onChangeAction={handleChange}
        />
      )}
      {question.type === "checkbox" && (
        <InputCheckboxes
          name={question.id}
          value={question.answer}
          required={question.required}
          options={question.options}
          label={question.question}
          description={question.description}
          onChangeAction={handleChange}
        />
      )}
    </div>
  );
};
