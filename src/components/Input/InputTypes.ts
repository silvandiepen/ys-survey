export interface InputProps {
  required?: boolean;
  label?: string;
  description?: string;
  value: string | string[];
  name: string;
  placeholder?: string;
  disabled?: boolean;
  onChangeAction?: Function;
}

export interface BaseProps extends InputProps {
  pattern?: string;
  minValue?: string | number;
  maxValue?: string | number;
  type?: "text" | "number" | "email" | "password";
}

export interface OptionProps extends InputProps {
  options: string[];
  type?: "checkbox" | "radio" | "select";
}
