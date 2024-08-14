import {
  ChangeEvent,
  forwardRef,
  Ref,
} from 'react';

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
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      onOptionChange(e.target.value);
      register.onChange?.(e);
    };

    const { onChange, ...restRegister } = register;

    return (
      <div className="flow-root border-gray-300 bg-white border rounded-md">

        {/* Render select box for lg devices and smaller */}
        <div className="lg:hidden">
          <select
            className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
            value={selectedOption}
            onChange={handleChange}
            {...restRegister}
          >
            {options.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="hidden lg:flex lg:flex-row w-full">
          {options.map((option) => (
            <label
              key={option.value}
              className={`cursor-pointer flex-1 p-2 inline-flex items-center justify-center text-sm font-medium text-black relative ${selectedOption === option.value
                ? "text-cyan-600 border-b-2 border-cyan-600 bg-cyan-100"
                : ""
                }`}
            >
              <input
                type="radio"
                value={option.value}
                checked={selectedOption === option.value}
                onChange={handleChange}
                className="sr-only"
                {...restRegister}
                ref={ref}
              />
              <span className="flex-1 text-center">{option.label}</span>
              {selectedOption === option.value && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-cyan-600"></span>
              )}
            </label>
          ))}
        </div>
      </div>
    );
  }
);

export default KRadioButton;