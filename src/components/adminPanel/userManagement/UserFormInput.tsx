import { HTMLInputTypeAttribute } from "react";
import {
  Control,
  FieldErrors,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";
import { UserRequest } from "../../../models/usermanagement.models";
import KDatepicker, { BaseNowValidationOptions } from "../../shared/DatePicker";
import PasswordInput from "../../shared/PasswordInput";
import KTextInput, { KTextInputProps } from "../../shared/TextInput";

interface UserFormInputProps extends KTextInputProps {
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
        <KTextInput
          {...inputProps}
          id={name}
          type={type}
          className={ltr ? "ltr" : ""}
        />
      )}
      {["text", "number", "email"].includes(type) && register && (
        <KTextInput
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
        <KDatepicker
          name={castedName}
          control={control}
          id={name}
          required={required}
          baseNowValidationOptions={baseNowValidation}
        ></KDatepicker>
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
