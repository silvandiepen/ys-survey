import {  useCallback, useEffect, useMemo, useState } from "react";
import { useBemm } from "bemm";

import { useSharedSurvey } from "../../hooks/SurveyController";
import { Button } from "../Button";

import "./Panel.scss";

type PanelProps = {
  children?: React.ReactNode;
};

export const Panel = ({ children }: PanelProps) => {
  const { prevStep, currentStep, currentTitle } = useSharedSurvey();

  const bemm = useBemm("panel");

  const [active, setActive] = useState(false);
  const [showPrev, setShowPrev] = useState(false);


  const isDone = useCallback(() => {
    const local = localStorage.getItem("surveyTest");
    return local ? JSON.parse(local).done : false;
  },[]);

  setTimeout(() => {
    if (!isDone()) setActive(true);
  }, 2000);

  const classes = useMemo(
    () => [bemm(), active && bemm("", "active")].join(" "),
    [bemm, active]
  );

  useEffect(() => {
    if (currentStep === 4) {
      setTimeout(() => {
        setActive(false);
      }, 2000);
    }
  }, [currentStep]);


  useEffect(() => {
    setShowPrev(!isDone() && currentStep > 0 && currentStep < 4);
  }, [isDone, currentStep]);

  if (active) {
    return (
      <div className={classes} data-testid="panel">
        <header className={bemm("header")} data-testid="panel-header">
          {showPrev && (
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
    return <></>;
  }
};
