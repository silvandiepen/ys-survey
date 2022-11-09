import { BaseInput } from "./InputBase";
import type { InputProps } from "./InputTypes";

export const InputPassword = (props: InputProps) => {
  return <BaseInput {...props} type="password" />;
};
