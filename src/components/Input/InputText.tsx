import { BaseInput } from "./InputBase";
import type { InputProps } from "./InputTypes";

export const InputText = (props: InputProps) => {
  return <BaseInput {...props} type="text" />;
};
