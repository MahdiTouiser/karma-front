import React from "react";

interface Option {
  value: string;
  label: string;
}

interface RadioButtonProps {
  groupName: string;
  options: Option[];
  selectedOption: string;
  onOptionChange: (value: string) => void;
  register: any; // Add the register prop
}

const KRadioButton: React.FC<RadioButtonProps> = ({
  groupName,
  options,
  selectedOption,
  onOptionChange,
  register, // Destructure register
}) => {
  return (
    <div className="flow-root border-gray-200 bg-gray-50 rounded">
      <nav className="flex">
        {options.map((option) => (
          <label
            key={option.value}
            className={`cursor-pointer p-2 inline-flex items-center justify-center text-md font-medium text-black w-full focus:outline-none relative ${selectedOption === option.value
              ? "text-green-600 border-b-2 border-green-600 bg-green-100"
              : ""
              }`}
            style={{ minHeight: "3rem" }}
          >
            <input
              type="radio"
              name={groupName}
              value={option.value}
              checked={selectedOption === option.value}
              onChange={() => onOptionChange(option.value)}
              className="sr-only"
              {...register(groupName)}
            />
            {option.label}
            {selectedOption === option.value && (
              <span
                className="absolute bottom-0 left-0 w-full h-0.5 bg-green-600"
                aria-hidden="true"
              ></span>
            )}
          </label>
        ))}
      </nav>
    </div>
  );
};

export default KRadioButton;
