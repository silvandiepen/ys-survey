import { useBemm } from "bemm";
import { useMemo } from "react";

import { ButtonProps } from "./Button.model";
import "./Button.scss";

export const Button = ({
  onClick,
  children,
  href = "",
  color = "primary",
  type = "default",
  disabled = false,
  size = "medium",
}: ButtonProps) => {
  const bemm = useBemm("button");

  const classes = useMemo(
    () =>
      [
        bemm(),
        color !== "primary" && bemm("", color),
        size !== "medium" && bemm("", size),
        type !== "default" && bemm("", type),
        disabled && bemm("", "disabled"),
      ].join(" "),
    [bemm, color, disabled, size, type]
  );

  if (href) {
    return (
      <a href={href} className={classes}>
        <span className={bemm("text")}>{children}</span>
      </a>
    );
  } else {
    return (
      <button onClick={onClick} className={classes} disabled={disabled}>
        <span className={bemm("text")}>{children}</span>
      </button>
    );
  }
};
