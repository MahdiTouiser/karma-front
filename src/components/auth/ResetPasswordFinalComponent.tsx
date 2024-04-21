import { useRef } from "react";
import { useForm } from "react-hook-form";
import useAPi from "../../hooks/useApi";
import SDAlert from "../shared/Alert";
import SDLabel from "../shared/Label";
import PasswordInput from "../shared/PasswordInput";
import SDButton from "../shared/Button";
import SDSpinner from "../shared/Spinner";
import { toast } from "react-toastify";
import { Regexes } from "../../utils/shared";

interface ChangePasswordFormData {
  password: string;
  repeatPassword: string;
}
interface ResetPasswordFinalComponentProps {
  onResetPassword: () => void;
}
const ResetPasswordFinalComponent: React.FC<
  ResetPasswordFinalComponentProps
> = ({ onResetPassword }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<ChangePasswordFormData>({ mode: "onTouched" });

  const {
    sendRequest,
    errors: apiErrors,
    isPending,
  } = useAPi<{ password: string }>();

  const passwordRef = useRef<string | undefined>();
  passwordRef.current = watch("password", "");

  function onSubmit(data: ChangePasswordFormData) {
    sendRequest(
      {
        url: "/Users/ResetPassword",
        method: "put",
        data: { password: data.password },
      },
      (response) => {
        toast.success(response.message);
        onResetPassword();
      }
    );
  }

  return (
    <form
      className="p-8 pt-4 w-auto min-w-[24rem] "
      onSubmit={handleSubmit(onSubmit)}
    >
      {apiErrors && (
        <SDAlert color="red" className="my-3">
          {apiErrors.message}
        </SDAlert>
      )}
      <div>
        <SDLabel htmlFor="password">
          رمز عبور مورد نظر خود را وارد کنید.
        </SDLabel>
        <PasswordInput
          {...register("password", {
            required: "لطفا رمزعبور خود را وارد کنید.",
            pattern: {
              value: Regexes.password,
              message:
                "رمز عبور حداقل 6 کاراکتر و شامل اعداد و حروف انگلیسی باشد.",
            },
          })}
          id="password"
          invalid={!!errors.password}
        />
        {errors.password?.message && (
          <p className="text-red-600 text-sm pr-2 mt-2">
            {errors.password.message}
          </p>
        )}
      </div>
      <div className="mt-6">
        <SDLabel htmlFor="repeatPassword">
          رمز عبور مورد نظر خود را مجدد وارد کنید.
        </SDLabel>
        <PasswordInput
          {...register("repeatPassword", {
            required: "لطفا رمزعبور خود را مجدد وارد کنید.",
            validate: (value) =>
              value === passwordRef.current ||
              "تکرار رمز عبور با رمز عبور مطابقت ندارد.",
          })}
          id="repeatPassword"
          invalid={!!errors.repeatPassword}
        />
        {errors.repeatPassword?.message && (
          <p className="text-red-600 text-sm pr-2 mt-2">
            {errors.repeatPassword.message}
          </p>
        )}
      </div>
      <SDButton
        className="mt-4 w-full"
        color="primary"
        type="submit"
        disabled={isPending}
      >
        {isPending && <SDSpinner />}
        تغییر رمزعبور
      </SDButton>
    </form>
  );
};
export default ResetPasswordFinalComponent;
