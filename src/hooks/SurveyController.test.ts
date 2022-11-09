import { act, renderHook } from "@testing-library/react";
import { useSharedSurvey } from "./SurveyController";
import { describe, expect, it } from "vitest";

describe("useCounter hook", () => {
  it("Should get the current initial defaults", () => {
    const { result } = renderHook(() => useSharedSurvey());
    expect(result.current.currentStep).toBe(0);
    expect(result.current.isDone).toBe(true);
    expect(result.current.currentQuestionIds.length).toBe(2);
  });
  it("Should not update the step", () => {
    const { result } = renderHook(() => useSharedSurvey());
    setTimeout(() => {
      act(() => {
        result.current.nextStep();
      });

      expect(result.current.currentStep).toBe(1);
    }, 100);
  });
  it("Should set the first answer, the second and go to the next step", () => {
    const { result } = renderHook(() => useSharedSurvey());

    act(() => {
      result.current.initSurvey();
      result.current.setAnswer("question1", "Something");
    });

    expect(result.current.getQuestion("question1")?.answer).toBe("Something");
    act(() => {
      result.current.nextStep();
    });
    expect(result.current.currentStep).toBe(1);
  });
  it("Should go through the full flow", async () => {
    const { result } = renderHook(() => useSharedSurvey());
    const answer = "something";

    act(() => {
      result.current.initSurvey();
      result.current.setAnswer("question1", answer);
      result.current.setAnswer("question2", answer);
      result.current.setAnswer("question3", answer);
      result.current.setAnswer("question4", answer);
      result.current.setAnswer("question5", answer);
      result.current.setAnswer("question6", answer);
    });

    act(() => {
      result.current.nextStep();
    });
    act(() => {
      result.current.nextStep();
    });
    act(() => {
      result.current.nextStep();
    });
    act(() => {
      result.current.nextStep();
    });
    expect(result.current.getQuestion("question1")?.answer).toBe(answer);
    expect(result.current.getQuestion("question2")?.answer).toBe(answer);
    expect(result.current.getQuestion("question3")?.answer).toBe(answer);
    expect(result.current.getQuestion("question4")?.answer).toBe(answer);
    expect(result.current.getQuestion("question5")?.answer).toBe(answer);
    expect(result.current.getQuestion("question6")?.answer).toBe(answer);

    expect(result.current.currentStep).toBe(4);
    expect(result.current.isDone).toBe(true);
  });
});
