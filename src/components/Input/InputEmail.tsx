import { BaseInput } from "./InputBase";
import type { InputProps } from "./InputTypes";

export const InputEmail = (props: InputProps) => {
  return <BaseInput {...props} type="email" pattern="[^ @]*@[^ @]*" />;
};
