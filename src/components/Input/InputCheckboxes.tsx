import { OptionInput } from "./InputOptions";
import type { OptionProps } from "./InputTypes";

export const InputCheckboxes = (props: OptionProps) => {
  return <OptionInput {...props} type="checkbox" />;
};
