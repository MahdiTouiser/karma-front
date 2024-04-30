import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SDButton from "../../components/shared/Button";
import SDSpinner from "../../components/shared/Spinner";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import useAPi from "../../hooks/useApi";
import { authActions } from "../../store/auth";
import { replacePersianArabicsNumbers } from "../../utils/shared";

export default function UsernameLoginPage() {
  const username = useAppSelector((state) => state.auth.enteredUsername);
  const dispatch = useAppDispatch();
  const [submitted, setSubmitted] = useState<boolean>(false);
  const navigate = useNavigate();
  const { sendRequest, errors, isPending } = useAPi();

  const onChangeUsername = (event: FormEvent<HTMLInputElement>) => {
    const input: string = replacePersianArabicsNumbers(event.currentTarget.value);
    dispatch(authActions.setUsername(input));
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
    if (!username) return;

    try {
      await sendRequest({
        url: `/Users/CheckUserExistence/${username}`,
      });
      () => navigate("password", { state: { username } })
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form onSubmit={onSubmit} className="p-8">
      <h1 className="mb-6 text-lg font-semibold flex justify-center">ورود کارجو</h1>
      <div className="flex w-full gap-1 flex-wrap sm:flex-nowrap">
        <div className="relative w-full mb-0">
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 fill-gray-950"
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
              } ltr placeholder:text-right w-full bg-gray-50 border text-gray-900 text-sm focus:ring-blue-500 mr-1 focus:border-blue-500 block pr-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 pl-36 rounded`}
            placeholder="نام کاربری یا شماره موبایل"
          />
          <div className="absolute left-0 h-10 top-1 py-1 w-28">
            <div className="bg-gray-300 h-4/5 top-0.5 absolute -right-4 w-px"></div>
            <Link to="forget-password" className="text-primary2 text-sm mr-2">
              فراموش کردید؟
            </Link>
          </div>
        </div>
        <div className="w-full sm:w-auto mt-2 mr-2 sm:mt-0">
          <SDButton
            className="w-full"
            type="submit"
            color="primary2"
            disabled={isPending}
          >
            {isPending ? <SDSpinner /> : "ورود"}
          </SDButton>
        </div>
      </div>
      {submitted && !username && (
        <p className="text-red-600 text-sm pr-2">
          لطفا نام کاربری خود را وارد کنید.
        </p>
      )}
      {errors && <p className="text-red-600 text-sm pr-2">{errors.message}</p>}
      <div className="flex flex-wrap items-center gap-2 mt-6">
        <p>حساب کاربری ندارید؟ ثبت نام کنید: </p>
        <Link to="signup" className="w-full xs:w-auto">
          <SDButton color="primary2" className="w-full">
            ایجاد حساب کاربری
          </SDButton>
        </Link>
      </div>
    </form>
  );
}
