import { FC, useState } from "react";
import { createBemm } from "bemm";

import { BaseProps } from "./InputTypes";
import "./Input.scss";

const bemm = createBemm("input-field", {
  return: "string",
});

export const BaseInput: FC<BaseProps> = (props: BaseProps) => {
  const {
    description,
    label,
    required,
    pattern,
    value,
    type,
    name,
    minValue,
    maxValue,
    disabled,
    placeholder,
    onChangeAction,
  } = props;

  const [touched, setTouched] = useState(false);

  const setIsTouched = () => {
    if (value === "") setTouched(true);
  };

  const onChangeInput = (e: any) => {
    if (onChangeAction === undefined) return;
    onChangeAction({
      name: e.target.name,
      value: e.target.value,
    });
  };

  return (
    <div
      className={[bemm("", ["", type]), touched && bemm("", "touched")].join(
        " "
      )}
    >
      {description && <p className={bemm("description")}>{description}</p>}
      <input
        className={[
          bemm("control", ["", type]),
          bemm("control", value ? "has-value" : "is-empty"),
        ].join(" ")}
        required={required}
        type={type}
        value={value}
        name={name}
        min={minValue}
        max={maxValue}
        disabled={disabled}
        pattern={pattern}
        onBlur={() => setIsTouched()}
        onChange={(e) => onChangeInput(e)}
        placeholder={placeholder}
      />
      {required && touched && <span className={bemm("required")}></span>}
      {label && <label className={bemm("label")}>{label}</label>}
    </div>
  );
};
