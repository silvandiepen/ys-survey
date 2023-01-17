import { FC, useState } from "react";
import { BaseProps } from "./InputTypes";
import { useClasses } from "bemm";
import "./Input.scss";

const bemm = useClasses("input-field", { return: "string" });

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
      className={bemm(
        ``,
        `:${type}`,
        {m: "is-touched", s: touched},
        {m: "is-required", s: required},
      )}
    >
      {description && <p className={bemm("description")}>{description}</p>}
      <input
        className={bemm(
          ["control", ["", type]],
          ["control", value ? "has-value" : "is-empty"]
        )}
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
