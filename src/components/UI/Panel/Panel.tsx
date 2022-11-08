import { useEffect, useState } from "react";
import { createBemm } from "bemm";
import "./Panel.scss";

import { useSharedSurvey } from "../../../hooks/SurveyController";
import { Button } from "../Button";

type PanelProps = {
  children?: React.ReactNode;
};

export const Panel = ({ children }: PanelProps) => {
  const { prevStep, currentStep, currentTitle } = useSharedSurvey();

  const bemm = createBemm("panel");

  const [active, setActive] = useState(false);

  const isDone = () => {
    const local = localStorage.getItem("surveyTest");
    return local ? JSON.parse(local).done : false;
  };

  setTimeout(() => {
    if (!isDone()) setActive(true);
  }, 2000);

  const classes = [bemm(), active && bemm("", "active")].join(" ");


  useEffect(() => {

    if (currentStep == 4) {
      setTimeout(() => {
        setActive(false);
      }, 2000);
    }
  }, [currentStep]);

  if (active) {
    return (
      <div className={classes} data-testid="panel">
        <header className={bemm("header")} role="header">
          {!isDone && currentStep !== 0 && (
            <Button onClick={() => prevStep()} size="medium" type="ghost">
              ←
            </Button>
          )}
          <div className={bemm("title")}>{currentTitle}</div>
        </header>
        <div className={bemm("content")}>{children}</div>
      </div>
    );
  } else {
    return <div></div>;
  }
};
