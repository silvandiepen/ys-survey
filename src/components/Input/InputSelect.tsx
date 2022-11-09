import { OptionInput } from "./InputOptions";
import type { OptionProps } from "./InputTypes";

export const InputSelect = (props: OptionProps) => {
  return <OptionInput {...props} type="select" />;
};
