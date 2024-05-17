import { Radio } from "flowbite-react";
import React from "react";
import KLabel from "./Label";

interface Option {
  value: string;
  label: string;
}

interface RadioButtonProps {
  groupName: string;
  options: Option[];
  selectedOption: string;
  onOptionChange: (value: string) => void;
}

const RadioButton: React.FC<RadioButtonProps> = ({
  groupName,
  options,
  selectedOption,
  onOptionChange,
}) => {
  return (
    <div className="flex">
      {options.map((option) => (
        <div key={option.value} className="flex items-center mr-5">
          <Radio
            id={groupName + option.value}
            name={groupName}
            value={option.value}
            checked={selectedOption === option.value}
            onChange={() => onOptionChange(option.value)}
          />
          <KLabel htmlFor={groupName + option.value} className="mr-3">
            {option.label}
          </KLabel>
        </div>
      ))}
    </div>
  );
};

export default RadioButton;
