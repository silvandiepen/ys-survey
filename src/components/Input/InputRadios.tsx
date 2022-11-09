import { OptionInput } from "./InputOptions";
import type { OptionProps } from "./InputTypes";

export const InputRadios = (props: OptionProps) => {
  return <OptionInput {...props} type="radio" />;
};
