import { BaseInput } from "./InputBase";
import type { InputProps } from "./InputTypes";

export const InputNumber = (props: InputProps) => {
  return <BaseInput {...props} type="number" />;
};
