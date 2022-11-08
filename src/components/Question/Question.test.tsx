import { render, screen, userEvent } from "../../utils/test-utils";
import { Question } from "./Question";

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
});
