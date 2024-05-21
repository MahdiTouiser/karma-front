import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import BackButton from "../../components/shared/BackButton";
import KButton from "../../components/shared/Button";
import KSpinner from "../../components/shared/Spinner";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import useAPi from "../../hooks/useApi";
import { AuthData, UserSecurityInformation } from "../../models/auth.models";
import { authActions } from "../../store/auth";
import { setAuthDataInLocal } from "../../utils/authUtils";
import { replacePersianArabicsNumbers } from "../../utils/shared";

const UsernameLoginPage = () => {
  const username = useAppSelector((state) => state.auth.enteredUsername);
  const password = useAppSelector((state) => state.auth.enteredPassword);

  const dispatch = useAppDispatch();
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [usernameSubmitted, setUsernameSubmitted] = useState<boolean>(false);
  const navigate = useNavigate();
  const { sendRequest, errors, isPending } = useAPi();

  const onChangeUsername = (event: FormEvent<HTMLInputElement>) => {
    const input: string = replacePersianArabicsNumbers(event.currentTarget.value);
    dispatch(authActions.setUsername(input));
  };

  const onChangePassword = (event: FormEvent<HTMLInputElement>) => {
    const input: string = replacePersianArabicsNumbers(event.currentTarget.value);
    dispatch(authActions.setPassword(input));
  };

  const onSubmitUsername = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
    if (username) {
      console.log("Username submitted:", username);
      setUsernameSubmitted(true);
    }
  };

  const onSubmitPassword = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
    if (!username || !password) return;

    const data: UserSecurityInformation = {
      username: username,
      password: password
    };

    sendRequest(
      {
        method: 'post',
        url: `/Users/Login`,
        data: data
      },
      (response) => {
        setAuthDataInLocal(response.value as unknown as AuthData);
        dispatch(authActions.setToken(response.value as unknown as AuthData));
        toast.success(response.message);
        navigate("/");
      },
      (error) => {
        console.error("Error:", error);
      }
    );
  };

  const handlePreviousClick = () => {
    setUsernameSubmitted(false);
  };

  return (
    <form onSubmit={usernameSubmitted ? onSubmitPassword : onSubmitUsername} className="p-8">
      <div className="flex justify-between items-center relative">
        {usernameSubmitted && (
          <span className="absolute right-0 bottom-0" onClick={handlePreviousClick}>
            <BackButton />
          </span>
        )}
        <h1 className="mx-auto text-lg font-semibold">ورود کارجو</h1>
      </div>

      <div className="flex flex-col items-center mt-2">
        {!usernameSubmitted ? (
          <>
            <div className="relative w-full mb-4">
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                  />
                </svg>
              </div>
              <input
                type="text"
                value={username}
                onInput={onChangeUsername}
                id="input-group-1"
                className={`${submitted && !username
                  ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                  : "border-gray-300 focus:border-blue-500"
                  } ltr placeholder:text-center w-full bg-gray-50 border text-gray-900 text-sm focus:ring-blue-500 mr-1 focus:border-blue-500 block pr-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 pl-12 rounded`}
                placeholder="نام کاربری یا شماره موبایل"
              />
            </div>
            {submitted && !username && (
              <p className="text-red-600 text-sm mb-3">
                لطفا نام کاربری خود را وارد کنید.
              </p>
            )}
          </>
        ) : (
          <>
            <div className="relative w-full mb-4">
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z"
                  />
                </svg>
              </div>
              <input
                type="password"
                value={password}
                onInput={onChangePassword}
                id="input-group-2"
                className={`${!submitted && !password
                  ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                  : "border-gray-300 focus:border-blue-500"
                  } ltr placeholder:text-center w-full bg-gray-50 border text-gray-900 text-sm focus:ring-blue-500 mr-1 focus:border-blue-500 block pr-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 pl-12 rounded`}
                placeholder="رمز عبور"
              />
            </div>
            {!submitted && !password && (
              <p className="text-red-600 text-sm pr-2 mb-3">
                لطفا رمز عبور خود را وارد کنید.
              </p>
            )}
            <Link to="otp" className="text-blue-500 flex mb-4 items-center">
              <p>ورود با رمز یکبار مصرف</p>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
              </svg>
            </Link>
          </>
        )}

        <div className="w-full mr-1">
          <KButton
            className="w-full"
            type="submit"
            color="primary"
            disabled={isPending}
          >
            {isPending ? <KSpinner /> : "ورود"}
          </KButton>
        </div>
      </div>

      {errors && <p className="text-red-600 text-sm pr-2">{errors.message}</p>}

      <div className="flex flex-wrap items-center gap-2 mt-6">
        <p>حساب کاربری ندارید؟ ثبت نام کنید: </p>
        <Link to="signup" className="w-full xs:w-auto">
          <KButton color="primary" className="w-full">
            ایجاد حساب کاربری
          </KButton>
        </Link>
      </div>
    </form >
  );
}


export default UsernameLoginPage