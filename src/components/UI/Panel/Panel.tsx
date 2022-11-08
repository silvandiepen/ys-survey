import { useState } from "react";
import { createBemm } from "bemm";
import "./Panel.scss";

import { useSurvey } from "../../../SurveyController";
import { Button } from "../Button";

type PanelProps = {
  children?: React.ReactNode;
};

export const Panel = ({ children }: PanelProps) => {
  const { prevStep, isDone, currentStep } = useSurvey();

  const bemm = createBemm("panel");

  const [active, setActive] = useState(false);

  const initPanel = () => {
    setActive(true);
  };

  setTimeout(() => {
    initPanel();
  }, 2000);

  const classes = [bemm(), active && bemm("", "active")].join(" ");

  if (active) {
    return (
      <div className={classes}>
        <div className={bemm("header")}>
          {!isDone && currentStep !== 0 && (
            <Button onClick={() => prevStep()} size="medium" type="ghost">
              ←
            </Button>
          )}
          <div className={bemm("title")}>Survey</div>
        </div>
        <div className={bemm("content")}>{children}</div>
      </div>
    );
  } else {
    return <div></div>;
  }
};
