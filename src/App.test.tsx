import App from "./App";
import { render, screen } from "./utils/test-utils";

describe("Does the app load?", () => {
  it("Does the survey show directly?", async () => {
    render(<App />);
    expect(await screen.findByTestId("survey")).toBeInTheDocument();
  });

  it("Does the survey show after two seconds?", async () => {
    render(<App />);
    setTimeout(async () => {
      expect(await screen.findByTestId("panel")).toBeInTheDocument();
    }, 2000);
  });

  it("Does it load the header and does it load the styling", async () => {
    render(<App />);
    setTimeout(async () => {
      const element = screen.getByText("Survey");
      expect(element.className).toEqual("panel_title");
      expect(getComputedStyle(element).display).toEqual("flex");
    }, 2000);
  });
});
