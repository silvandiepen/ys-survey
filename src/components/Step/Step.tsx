import { useState } from "react";
import { createBemm } from "bemm";
import "./Step.scss";


type PanelProps = {
  children?: React.ReactNode;
};

export const Panel = ({ children }: PanelProps) => {
  const bemm = createBemm("panel");

  const [active, setActive] = useState(false);

  const initPanel = () => {
    setActive(true);
  };

  setTimeout(() => {
    initPanel();
  }, 200);

  const classes = [bemm(), active && bemm("", 'active')].join(" ");

  if (active) {
    return (
      <div className={classes}>
        <div className={bemm("header")}>Survey</div>
        <div className={bemm("content")}>{children}</div>
      </div>
    );
  } else {
    return (<div></div>)
  }
};
