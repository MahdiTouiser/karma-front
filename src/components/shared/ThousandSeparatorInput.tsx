import React, { ChangeEvent, useState } from "react";
import {
  RegisterOptions,
  Control,
  Controller,
  ValidationRule,
  Message,
} from "react-hook-form";
import SDTextInput, { SDTextInputProps } from "./TextInput";

interface ThousandSeparatorInputProps
  extends Omit<SDTextInputProps, "onChange" | "required" | "min" | "max"> {
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control?: Control<any>;
  onChange?: (value: number | "") => void;
  required?: ValidationRule<boolean> | Message;
  min?: number | {value:number, message:string};
  max?:  number | {value:number, message:string}
}

const ThousandSeparatorInput: React.FC<ThousandSeparatorInputProps> = ({
  control,
  value,
  allowMinus,
  name,
  onChange,
  required,
  max,
  min,
  ...otherProps
}) => {
  const [innerValue, setInnerValue] = useState<string>(
    value?.toLocaleString() || ""
  );

  const convertValue = (value: string, allowMinus = false) => {
    let newValue = value.replace(/[^\d-]/g, "");

    if (!allowMinus) {
      newValue = newValue.replace(/^-/g, "");
    }

    return newValue;
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = convertValue(e.target.value, allowMinus);

    const numericValue = parseFloat(newValue);
    if (newValue === "-" || newValue === "") {
      onChange && onChange("");
      setInnerValue(newValue);
      return;
    }
    if (isNaN(numericValue)) {
      onChange && onChange("");
      setInnerValue("");
    }
    onChange && onChange(numericValue);
    const formattedValue = numericValue.toLocaleString();
    setInnerValue(formattedValue);

    // register(name).onChange({ target: { value: e.target.value } });
  };

  const shardAttrs: Partial<SDTextInputProps> = {
    ...otherProps,
    numeric: true,
    name: name,
    allowMinus: allowMinus,
    className: `ltr ${otherProps.className || ""}`,
  };
  const rules : RegisterOptions = {
    validate: (value) => value !== "-",
    ...(required ? {required:required} : {}),
    ...(max ? {max:max} : {}),
    ...(min ? {min:min} : {})
  }
  return control ? (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({
        field: { onChange, value, onBlur },
        fieldState: { isTouched,error }, 
      }) => {
        return (
          <>
            <SDTextInput
              {...shardAttrs}
              value={value?.toLocaleString() || ""}
              onBlur={onBlur}
              onChange={(event) => {
                const newValue = convertValue(event.target.value, allowMinus);
                if (newValue === "" || newValue === "-") {
                  onChange(newValue);
                  return;
                }
                const numeric = +newValue;
                onChange(isNaN(numeric) ? "" : numeric);
              }}
              invalid={!!error && isTouched}
            />
          </>
        );
      }}
    />
  ) : (
    <SDTextInput
      {...shardAttrs}
      value={innerValue}
      onChange={handleInputChange}
      required={!!required}
      {...(typeof min === 'number' ? {min} : {min:min?.value} || {} )}
      {...(typeof max === 'number' ? {max} : {max:max?.value} || {} )}
    />
  );
};

export default ThousandSeparatorInput;
