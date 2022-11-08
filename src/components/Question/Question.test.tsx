import { render, screen, userEvent } from "../../utils/test-utils";
import { Question } from "./Question";

import { useSharedSurvey } from "../../hooks/SurveyController";

describe("Question", async () => {
  it("should render the Question label and input", () => {
    render(<Question id="question1" />);
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("John Doe")).toBeInTheDocument();
  });

  it("should change input value", async () => {
    render(<Question id="question1" />);

    screen.logTestingPlaygroundURL();

    const input = screen.getByPlaceholderText("John Doe");
    expect(input).toBeInTheDocument();
    await userEvent.type(input, "1337");
    expect(input).toHaveValue("1337");
  });
  
  //   it('should render the input with error', () => {
  //     render(
  //       <Input
  //         name="email"
  //         type="email"
  //         placeholder="Email"
  //         label="Email Address"
  //         aria-label="Email Address"
  //         error="Please enter your email"
  //       />,
  //     )
  //     expect(screen.getByRole('textbox', {
  //       name: /email address/i,
  //     })).toBeInTheDocument()
  //     expect(screen.getByRole('alert')).toHaveTextContent('Please enter your email')
  //   })
});
