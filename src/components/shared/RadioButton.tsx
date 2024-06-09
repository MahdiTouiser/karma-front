import { ChangeEvent, Ref, forwardRef } from "react";
import { UseFormRegisterReturn } from 'react-hook-form';

interface Option {
  value: string;
  label: string;
}

interface RadioButtonProps {
  options: Option[];
  selectedOption: string;
  onOptionChange: (value: string) => void;
  register: UseFormRegisterReturn;
}

const KRadioButton = forwardRef<HTMLInputElement, RadioButtonProps>(
  (
    { options, selectedOption, onOptionChange, register },
    ref: Ref<HTMLInputElement>
  ) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      onOptionChange(e.target.value);
    };

    return (
      <div className="flow-root border-gray-300 bg-white border rounded ">
        <div className="flex">
          {options.map((option) => (
            <label
              key={option.value}
              className={`cursor-pointer p-2 inline-flex items-center justify-center text-sm font-medium text-black w-full focus:outline-none relative ${selectedOption === option.value
                ? "text-green-600 border-b-2 border-green-600 bg-green-100"
                : ""
                }`}
            >
              <input
                type="radio"
                value={option.value}
                checked={selectedOption === option.value}
                onChange={(e) => {
                  handleChange(e);
                  register.onChange(e);
                }}
                className="sr-only"
                ref={ref}
              />
              {option.label}
              {selectedOption === option.value && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-green-600"></span>
              )}
            </label>
          ))}
        </div>
      </div>
    );
  }
);

export default KRadioButton;
