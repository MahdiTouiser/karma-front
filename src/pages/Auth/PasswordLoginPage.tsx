import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import SDAlert from "../../components/shared/Alert";
import BackButton from "../../components/shared/BackButton";
import SDButton from "../../components/shared/Button";
import SDSpinner from "../../components/shared/Spinner";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import useAPi from "../../hooks/useApi";
import { AuthData, OTPRequest, OTPResponse } from "../../models/auth.models";
import { BaseResponse } from "../../models/shared.models";
import { authActions } from "../../store/auth";
import { setAuthDataInLocal } from "../../utils/authUtils";
import { replacePersianArabicsNumbers } from "../../utils/shared";

const PasswordLoginPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);
  const enteredUsername = useAppSelector((state) => state.auth.enteredUsername);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { sendRequest, errors, isPending } = useAPi<
    { username: string; password: string },
    BaseResponse<AuthData>
  >();

  const {
    sendRequest: sendOtpRequest,
    errors: otpError,
    isPending: otpPending,
  } = useAPi<OTPRequest, OTPResponse>();

  useEffect(() => {
    if (!enteredUsername) {
      navigate("/auth");
    }
  }, [enteredUsername, navigate]);

  function toggleShowPassword() {
    setShowPassword((showPassword) => !showPassword);
  }

  function onPasswordChange(evenet: FormEvent) {
    const input: string = replacePersianArabicsNumbers(
      (evenet.target as HTMLInputElement).value
    );
    setPassword(input);
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    setSubmitted(true);
    if (!password) {
      return;
    }
    sendRequest(
      {
        url: "/Users/Login",
        method: "post",
        data: { username: enteredUsername, password: password },
      },
      (response) => {
        setAuthDataInLocal(response.content);
        dispatch(authActions.setToken(response.content));
        if (response.content.isAdmin) {
          navigate("/admin");
          return;
        }
        navigate("/");
      }
    );
  }

  function onOTPRequest() {
    sendOtpRequest(
      {
        url: "/Users/OtpRequest",
        method: "post",
        data: { username: enteredUsername },
      },
      (response) => {
        dispatch(authActions.setMobile(response.content));
        navigate("../otp");
      }
    );
  }

  const showPasswordIcon: JSX.Element = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6 mb-1"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  );

  const hidePasswordIcon: JSX.Element = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6 mb-1"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
      />
    </svg>
  );

  return (
    <section>
      <BackButton />
      <form onSubmit={onSubmit} className="p-8 pt-4 border-b">
        {errors && (
          <SDAlert color="red" className="my-2">
            {errors.message}
          </SDAlert>
        )}
        {otpError && (
          <SDAlert color="red" className="my-2">
            {otpError.message}
          </SDAlert>
        )}
        <p className="mb-6 text-lg font-semibold">رمز عبور خود را وارد کنید.</p>
        <div className="flex w-full gap-1 flex-wrap sm:flex-nowrap">
          <div className="relative w-full mb-0">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onInput={onPasswordChange}
              id="input-group-1"
              className={`${submitted && !password
                ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                : "border-gray-300 focus:border-blue-500"
                } ltr placeholder:text-right w-full h-10 bg-gray-50 border  text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block pr-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 pl-40`}
            />
            <button
              type="button"
              onClick={toggleShowPassword}
              tabIndex={10}
              className="absolute inset-y-0  flex items-center left-32"
            >
              {showPassword ? hidePasswordIcon : showPasswordIcon}
            </button>
            <div className="absolute left-0 h-10 top-0.5 py-1 pl-3 w-28">
              <div className="bg-gray-300 h-4/5 top-0.5 absolute -right-3 w-px"></div>
              <Link className="text-primary2 text-sm" to="../forget-password">
                فراموش کردید؟
              </Link>
            </div>
          </div>
          <div className="w-full sm:w-auto mt-2 sm:mt-0">
            <SDButton
              className="w-full"
              type="submit"
              color="primary2"
              disabled={isPending}
            >
              {isPending && <SDSpinner />}
              ورود
            </SDButton>
          </div>
        </div>
        {submitted && !password && (
          <p className="text-red-600 text-sm pr-2">
            لطفا رمز عبور خود را وارد کنید.
          </p>
        )}
      </form>
      <button
        onClick={onOTPRequest}
        disabled={otpPending}
        className="flex items-center w-full h-full px-8 py-4 disabled:text-gray-300"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-8 h-8 ml-2"
        >
          <path
            fillRule="evenodd"
            d="M12 2.25c-2.429 0-4.817.178-7.152.521C2.87 3.061 1.5 4.795 1.5 6.741v6.018c0 1.946 1.37 3.68 3.348 3.97.877.129 1.761.234 2.652.316V21a.75.75 0 001.28.53l4.184-4.183a.39.39 0 01.266-.112c2.006-.05 3.982-.22 5.922-.506 1.978-.29 3.348-2.023 3.348-3.97V6.741c0-1.947-1.37-3.68-3.348-3.97A49.145 49.145 0 0012 2.25zM8.25 8.625a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25zm2.625 1.125a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zm4.875-1.125a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25z"
            clipRule="evenodd"
          />
        </svg>
        <p>ارسال کد یک بار مصرف از طریق پیامک</p>
      </button>
    </section>
  );
};

export default PasswordLoginPage;
