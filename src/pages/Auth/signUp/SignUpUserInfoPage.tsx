import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import KAlert from "../../../components/shared/Alert";
import KButton from "../../../components/shared/Button";
import KLabel from "../../../components/shared/Label";
import PasswordInput from "../../../components/shared/PasswordInput";
import KSpinner from "../../../components/shared/Spinner";
import KTextInput from "../../../components/shared/TextInput";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import useAPi from "../../../hooks/useApi";
import { UserSecurityInformation } from "../../../models/auth.models";
import { authActions } from "../../../store/auth";
import { updateAuthDataInLocal } from "../../../utils/authUtils";
import { Regexes } from "../../../utils/shared";

interface UserInfoFormData {
  username: string;
  password: string;
  repeatPassword: string;
}
const SignUpUserInfoPage: React.FC = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<UserInfoFormData>({
    mode: "onTouched",
  });

  const {
    sendRequest,
    errors: apiErrors,
    isPending,
  } = useAPi<UserSecurityInformation>();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const passwordRef = useRef<string | undefined>();
  passwordRef.current = watch("password", "");

  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth");
    }
  }, [isAuthenticated, navigate]);

  function onSubmit(data: UserInfoFormData) {
    sendRequest(
      {
        url: "/Users/UserSecurityInformationCompletion",
        method: "post",
        data: {
          username: data.username,
          password: data.password,
        },
      },
      () => {
        updateAuthDataInLocal({ securityInformationCompleted: true });
        dispatch(authActions.completeSecurityInformation());
        navigate("/");
      }
    );
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-8 w-full">
      <div className="mb-6">
        <h1 className="text-lg font-semibold">اطلاعات کاربری</h1>
        <p className="text-slate-400">
          برای تکمیل ثبت نام، اطلاعات خود را کامل کنید.
        </p>
      </div>
      {apiErrors && (
        <KAlert color="red" className="my-2">
          {apiErrors.message}
        </KAlert>
      )}
      <div>
        <div className="mb-6">
          <KLabel htmlFor="nationalId">نام کاربری</KLabel>
          <KTextInput
            {...register("username", {
              required: "فیلد الزامی است.",
              pattern: {
                value: Regexes.username,
                message: "نام کاربری فقط باید شامل اعداد و حروف انگلیسی باشد.",
              },
              minLength: {
                value: 5,
                message: "نام کاربری حداقل باید 5 کاراکتر باشد.",
              },
            })}
            type="text"
            id="nationalId"
            invalid={!!errors.username}
          />
          {errors.username?.message && (
            <p className="text-red-600 text-sm pr-2 mt-2">
              {errors.username.message}
            </p>
          )}
        </div>
        <div className="mb-6">
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
        <div className="mb-6">
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
        <div>
          <KButton
            type="submit"
            color="primary2"
            className="w-full"
            disabled={isPending}
          >
            {isPending && <KSpinner />}
            ثبت اطلاعات
          </KButton>
        </div>
      </div>
    </form>
  );
};

export default SignUpUserInfoPage;
