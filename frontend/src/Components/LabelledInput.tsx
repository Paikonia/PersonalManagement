import React from "react";
import { Label } from "./ui/label";
import { Input, InputProps } from "./ui/input";

const LabelledInput = ({
  label,
  id,
  name,
  ...rest
}: {
  label: string;
  id: string;
  name: string;
} & InputProps) => {
  return (
    <div className="p-2 mx-4 mt-2 mb-2">
      <Label className="text-md mb-4" htmlFor={id}>{label}</Label>
      <Input
        name={name}
        {...rest}
      />
    </div>
  );
};

export default LabelledInput;
