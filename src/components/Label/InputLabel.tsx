import { ComponentPropsWithoutRef } from "react";

interface InputLabelProps extends ComponentPropsWithoutRef<"label"> {
  text: string;
  isRequired: boolean;
}

const InputLabel = ({ text, isRequired, ...props }: InputLabelProps) => {
  return (
    <label className="text-base" {...props}>
      {text}
      {isRequired && <span className="ml-1 text-red-500">*</span>}
    </label>
  );
};
export default InputLabel;
