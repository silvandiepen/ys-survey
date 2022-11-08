import { createBemm } from "bemm";

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
  const bemm = createBemm("button");

  const classes = [
    bemm(),
    color !== "primary" && bemm("", color),
    size !== "medium" && bemm("", size),
    type !== "default" && bemm("", type),
    disabled && bemm("", "disabled"),
  ].join(" ");

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
