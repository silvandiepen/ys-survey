type InputType = "text" | "email" | "number" | "select" | "radio" | "checkbox" | "select";

export interface SurveyQuestion {
  id: string;
  step: number;
  question: string;
  description?: string;
  placeholder?: string;
  answer: string;
  required: boolean;
  type: InputType;
  options: string[];
}
export interface SurveyQuestions {
  [key: string]: SurveyQuestion;
}

export const surveyData: SurveyQuestions = {
  question1: {
    id: "question1",
    step: 0,
    question: "Name",
    description: "How can we call you?",
    answer: "",
    required: false,
    placeholder: "John Doe",
    type: "text",
    options: [],
  },
  question2: {
    id: "question2",
    step: 0,
    question: "E-mail",
    description:
      "We would like to send you your answers and keep you up to date about the survey",
    answer: "",
    required: false,
    placeholder: "john@doe.com",
    type: "email",
    options: [],
  },
  question3: {
    id: "question3",
    step: 1,
    question: "How old are you?",
    answer: "",
    required: true,
    type: "select",
    options: [`0-18`, `19-25`, `26-35`, `36-45`, `46-60`, `60+`],
  },
  question4: {
    id: "question4",
    step: 1,
    question: "What is your gender?",
    answer: "",
    required: true,
    type: "radio",
    options: ["male", "female", "undefined"],
  },
  question5: {
    id: "question5",
    step: 2,
    question: "What is your favorite book?",
    answer: "",
    required: true,
    placeholder: "Which books do you like?",
    type: "text",
    options: [],
  },
  question6: {
    id: "question6",
    step: 2,
    question: "What is your favorite color?",
    answer: "",
    required: true,
    type: "checkbox",
    options: [
      "red",
      "green",
      "blue",
      "purple",
      "turquoise",
      "yellow",
      "orange",
    ],
  },
};

export const surveySteps = ["Identity", "Detail", "Favorites", "Summary","Thanks!"];
