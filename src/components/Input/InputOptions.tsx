import { FC, useEffect, useState } from "react";
import { createBemm } from "bemm";

import { OptionProps } from "./InputTypes";
import { c } from "../../utils/helpers";
import "./Input.scss";

const bemm = createBemm("input-field", {
  return: "string",
});

export const OptionInput: FC<OptionProps> = (props: OptionProps) => {
  const {
    description,
    label,
    required,
    value,
    type,
    name,
    options,
    disabled,
    onChangeAction,
  } = props;

  const [values, setValues] = useState<string[]>(
    typeof value === "string" ? [value] : value
  );

  const optionChange = (e: any) => {
    const newValue: string = e.target.value;

    if (type === "checkbox") {
      if (!values.includes(newValue)) {
        setValues([...values, newValue]);
      } else {
        setValues(values.filter((v) => v !== newValue));
      }
    } else {
      setValues([newValue]);
    }
  };

  useEffect(() => {
    if (onChangeAction === undefined) return;
    onChangeAction({
      name: name,
      value: [...new Set(values)].filter((v) => v !== ""),
    });
  }, [name, values]);

  const [touched, setTouched] = useState(false);

  const setIsTouched = () => {
    setTouched(true);
  };

  return (
    <div
      className={c([
        bemm("", ["", type]),
        touched && bemm("", "is-touched"),
        required && bemm("", "is-required"),
      ])}
    >
      {description && <p className={bemm("description")}>{description}</p>}
      {(type === "checkbox" || type === "radio") && (
        <div
          className={c([
            bemm("options"),
            bemm("options", values.length ? "has-value" : "is-empty"),
          ])}
        >
          {options.map((option, index) => (
            <div className={bemm("option", ["", type])} key={index}>
              <input
                className={c([
                  bemm("control", ["", type]),
                  values.includes(option) && bemm("control", "checked"),
                ])}
                required={required}
                disabled={disabled}
                type="checkbox"
                id={`${name}-${index}`}
                name={name}
                onChange={(e) => optionChange(e)}
                onBlur={() => setIsTouched()}
                value={option}
                checked={values.includes(option)}
              />
              <label className={bemm("label")} htmlFor={`${name}-${index}`}>
                {option}
              </label>
            </div>
          ))}
        </div>
      )}
      {type === "select" && (
        <select
          className={c([
            bemm("control", ["", type]),
            bemm("control", value.length ? "has-value" : "is-empty"),
          ])}
          required={required}
          disabled={disabled}
          value={values[0]}
          id={name}
          name={name}
          onBlur={() => setIsTouched()}
          onChange={(e) => optionChange(e)}
        >
          <option></option>
          {options.map((option, index) => (
            <option
              className={bemm("option", ["", type])}
              key={index}
              value={option}
            >
              {option}
            </option>
          ))}
        </select>
      )}
      {required && <span className={bemm("required")}></span>}
      {label && <span className={bemm("label")}>{label}</span>}
    </div>
  );
};
