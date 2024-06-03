import { useRef } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import useApi from "../../hooks/useApi";
import { Regexes } from "../../utils/shared";
import KAlert from "../shared/Alert";
import KButton from "../shared/Button";
import KLabel from "../shared/Label";
import PasswordInput from "../shared/PasswordInput";
import KSpinner from "../shared/Spinner";

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
  } = useApi<{ password: string }>();

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
        <KAlert color="red" className="my-3">
          {apiErrors.message}
        </KAlert>
      )}
      <div>
        <KLabel htmlFor="password">
          رمز عبور مورد نظر خود را وارد کنید.
        </KLabel>
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
        <KLabel htmlFor="repeatPassword">
          رمز عبور مورد نظر خود را مجدد وارد کنید.
        </KLabel>
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
      <KButton
        className="mt-4 w-full"
        color="primary"
        type="submit"
        disabled={isPending}
      >
        {isPending && <KSpinner />}
        تغییر رمزعبور
      </KButton>
    </form>
  );
};
export default ResetPasswordFinalComponent;
