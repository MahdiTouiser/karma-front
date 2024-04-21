import { FieldErrors, RegisterOptions, UseFormRegister } from "react-hook-form";
import {  UserRequest } from "../../../models/usermanagement.models";
import SDSelect from "../../shared/Select";

interface UserFormSelectProps {
  register: UseFormRegister<UserRequest>;
  options?: RegisterOptions;
  errors: FieldErrors<UserRequest>;
  name: keyof UserRequest;
  children: React.ReactNode;
}

const UserFormSelect: React.FC<UserFormSelectProps> = ({
  register,
  errors,
  name,
  options = { required: "فیلد اجباری است." },
  children,
}) => {
  return (
    <div className="mb-6 h-12 flex flex-col justify-center">
      <SDSelect id={name} {...register(name, options)} invalid={!!errors[name]}>
        {children}
      </SDSelect>
      {errors[name]?.message && (
        <p className="text-red-600 text-xs pr-2">{errors[name]?.message}</p>
      )}
    </div>
  );
};

export default UserFormSelect;
