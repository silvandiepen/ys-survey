import { createBemm } from "bemm";
import { useEffect, useState } from "react";
import { useSharedSurvey } from "../../hooks/SurveyController";
import "./Question.scss";

type QuestionProps = {
  id: string;
};

export const Question = ({ id }: QuestionProps) => {
  const { setAnswer, getQuestion } = useSharedSurvey();
  const [touched, setTouched] = useState(false);

  const question = getQuestion(id);

  const bemm = createBemm("question", {
    return: "string",
  });

  const setIsTouched = () => {
    if (question?.answer == "") setTouched(true);
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setAnswer(name, value, e.target.checked);
  };

  const handleCheckboxChange = (e: any) => {
    const { name, value } = e.target;
    setAnswer(name, value, e.target.checked);
  };

  if (question == undefined) return <div></div>;
  return (
    <div className={bemm()}>
      {question.type == "text" && (
        <div className={bemm("input-field", ["", question.type])}>
          {question.description && (
            <p className={bemm("description")}>{question.description}</p>
          )}
          {question.required && touched && (
            <span className={bemm("required")}></span>
          )}
          <input
            className={bemm("control", ["", question.type])}
            required={question.required}
            type="text"
            value={question.answer}
            name={question.id}
            onBlur={() => setIsTouched()}
            onChange={handleChange}
            placeholder={question.placeholder}
          />
          <label className={bemm("label")}>{question.question}</label>
        </div>
      )}
      {question.type == "email" && (
        <div className={bemm("input-field", ["", question.type])}>
          {question.description && (
            <p className={bemm("description")}>{question.description}</p>
          )}{" "}
          {question.required && touched && (
            <span className={bemm("required")}></span>
          )}
          <input
            className={bemm("control", ["", question.type])}
            required={question.required}
            type="email"
            pattern="[^ @]*@[^ @]*"
            value={question.answer}
            name={question.id}
            onBlur={() => setIsTouched()}
            onChange={handleChange}
            placeholder={question.placeholder}
          />
          <label className={bemm("label")}>{question.question}</label>
        </div>
      )}
      {question.type == "number" && (
        <div className={bemm("input-field", ["", question.type])}>
          {question.description && (
            <p className={bemm("description")}>{question.description}</p>
          )}{" "}
          {question.required && touched && (
            <span className={bemm("required")}></span>
          )}
          <input
            className={bemm("control", ["", question.type])}
            required={question.required}
            type="number"
            min="0"
            max="100"
            name={question.id}
            onBlur={() => setIsTouched()}
            onChange={handleChange}
            value={question.answer}
            placeholder={question.placeholder}
          />
          <label className={bemm("label")}>{question.question}</label>
        </div>
      )}
      {question.type == "radio" && (
        <div className={bemm("input-field", ["", question.type])}>
          <span className={bemm("label")}>{question.question}</span>
          {question.description && (
            <p className={bemm("description")}>{question.description}</p>
          )}{" "}
          {question.required && touched && (
            <span className={bemm("required")}></span>
          )}
          <div className={bemm("input-items")}>
            {question.options.map((option, index) => (
              <div
                className={bemm("input-item", ["", question.type])}
                key={index}
              >
                <input
                  className={bemm("control", ["", question.type])}
                  required={question.required}
                  type="radio"
                  id={`${question.id}-${index}`}
                  name={question.id}
                  onBlur={() => setIsTouched()}
                  onChange={handleChange}
                  value={option}
                  checked={question.answer == option}
                />
                <label
                  className={bemm("label")}
                  htmlFor={`${question.id}-${index}`}
                >
                  {option}
                </label>
              </div>
            ))}
          </div>
        </div>
      )}
      {question.type == "checkbox" && (
        <div className={bemm("input-field", ["", question.type])}>
          <span className={bemm("label")}>{question.question}</span>
          {question.description && question.answer == "" && (
            <p className={bemm("description")}>{question.description}</p>
          )}
          {question.required && touched && (
            <span className={bemm("required")}></span>
          )}
          <div className={bemm("input-items")}>
            {question.options.map((option, index) => (
              <div
                className={bemm("input-item", ["", question.type])}
                key={index}
              >
                <input
                  className={bemm("control", ["", question.type])}
                  required={question.required}
                  type="checkbox"
                  id={`${question.id}-${index}`}
                  name={question.id}
                  onBlur={() => setIsTouched()}
                  onChange={handleCheckboxChange}
                  value={option}
                  checked={question.answer.includes(option)}
                />
                <label
                  className={bemm("label")}
                  htmlFor={`${question.id}-${index}`}
                >
                  {option}
                </label>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
