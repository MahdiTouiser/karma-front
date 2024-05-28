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
}

const KRadioButton: React.FC<RadioButtonProps> = ({
  groupName,
  options,
  selectedOption,
  onOptionChange,
}) => {
  return (
    <div className="flow-root border-b border-gray-200 mb-8">
      <nav className="-mb-px flex">
        {options.map((option, index) => (
          <label
            key={option.value}
            className={`${index === 0 ? "" : "ml-2"
              } cursor-pointer py-2 px-4 inline-flex items-center text-md font-medium text-black  focus:outline-none relative ${selectedOption === option.value
                ? "text-green-600 border-b-2 border-green-600"
                : ""
              }`}
          >
            <input
              type="radio"
              name={groupName}
              value={option.value}
              checked={selectedOption === option.value}
              onChange={() => onOptionChange(option.value)}
              className="sr-only"
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
