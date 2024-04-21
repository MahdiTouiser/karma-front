import {
  Control,
  FieldErrors,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";
import { UserRequest } from "../../../models/usermanagement.models";
import SDTextInput, { SDTextInputProps } from "../../shared/TextInput";
import { HTMLInputTypeAttribute } from "react";
import PasswordInput from "../../shared/PasswordInput";
import SDDatepicker, { BaseNowValidationOptions } from "../../shared/DatePicker";

interface UserFormInputProps extends SDTextInputProps {
  register?: UseFormRegister<UserRequest>;
  options?: RegisterOptions;
  errors: FieldErrors<UserRequest>;
  name: keyof UserRequest | "userCode";
  type?: HTMLInputTypeAttribute;
  ltr?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control?: Control<any>;
  required?: boolean;
  baseNowValidationOptions?: BaseNowValidationOptions
}

const UserFormInput: React.FC<UserFormInputProps> = ({
  register,
  errors,
  name,
  options = { required: "فیلد اجباری است." },
  type = "text",
  ltr = false,
  control,
  required,
  baseNowValidationOptions: baseNowValidation,
  ...inputProps
}) => {
  const registerOptions = { ...options };
  const castedName = name as keyof UserRequest;
  if (type === "number") {
    registerOptions.valueAsNumber = true;
  }
  return (
    <div className="mb-6 h-12 flex flex-col justify-center">
      {!register && !control && (
        <SDTextInput
          {...inputProps}
          id={name}
          type={type}
          className={ltr ? "ltr" : ""}
        />
      )}
      {["text", "number", "email"].includes(type) && register && (
        <SDTextInput
          {...inputProps}
          id={name}
          {...register(
            castedName,
            registerOptions
          )}
          invalid={!!errors[castedName]}
          type={type}
          className={ltr ? "ltr" : ""}
        />
      )}
      {type === "password" && register && (
        <PasswordInput
          id={name}
          {...register(castedName, registerOptions)}
          invalid={!!errors[castedName]}
          type={type}
          className={ltr ? "ltr" : ""}
        />
      )}
      {type === "date" && control && (
        <SDDatepicker
          name={castedName}
          control={control}
          id={name}
          required={required}
          baseNowValidationOptions={baseNowValidation}
        ></SDDatepicker>
      )}
      {errors[castedName]?.message && (
        <p className="text-red-600 text-xs pr-2 inline-block w-44">
          {errors[castedName]?.message}
        </p>
      )}
    </div>
  );
};

export default UserFormInput;
