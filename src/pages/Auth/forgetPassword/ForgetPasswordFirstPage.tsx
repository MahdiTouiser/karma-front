import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import BackButton from "../../../components/shared/BackButton";
import SDButton from "../../../components/shared/Button";
import SDSpinner from "../../../components/shared/Spinner";
import { useAppDispatch } from "../../../hooks/reduxHooks";
import useAPi from "../../../hooks/useApi";
import { OTPRequest, OTPResponse } from "../../../models/auth.models";
import { authActions } from "../../../store/auth";
import { Regexes } from "../../../utils/shared";
import { phoneInputValidator } from "../../../utils/validations";
const ForgetPasswordFirstPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    sendRequest,
    isPending,
    errors: apiErrors,
  } = useAPi<OTPRequest, OTPResponse>();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<{ phone: string }>({ mode: "onTouched" });
  function onSubmit(data: { phone: string }) {
    const phone = data.phone;
    dispatch(authActions.setMobile(phone));
    sendRequest(
      {
        url: "/Users/OtpRequest",
        method: "post",
        data: { username: phone },
      },
      () => navigate("otp")
    );
    return;
  }

  return (
    <section className="w-full">
      <BackButton />
      <form onSubmit={handleSubmit(onSubmit)} className="p-8 pt-4 border-b">
        <div className="relative w-full mb-0">
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
                d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
              />
            </svg>
          </div>
          <input
            {...register("phone", {
              required: "لطفا شماره موبایل خود را وارد کنید.",
              pattern: {
                value: Regexes.mobile,
                message: "شماره موبایل صحیح نیست.",
              },
            })}
            type="text"
            maxLength={14}
            {...phoneInputValidator}
            id="input-group-1"
            className={`${errors.phone
                ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                : "border-gray-300 focus:border-blue-500"
              } ltr placeholder:text-right w-full h-10 bg-gray-50 border  text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block pr-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
            placeholder="شماره موبایل خود را وارد کنید"
          />
        </div>
        {errors.phone?.message && (
          <p className="text-red-600 text-sm pr-2 mt-2">
            {errors.phone.message}
          </p>
        )}
        {apiErrors && (
          <p className="text-red-600 text-sm pr-2 mt-2">{apiErrors.message}</p>
        )}
        <SDButton
          type="submit"
          className="w-full mt-3"
          color="primary2"
          disabled={isPending}
        >
          {isPending && <SDSpinner></SDSpinner>}
          بازیابی رمز عبور
        </SDButton>
      </form>
    </section>
  );
};

export default ForgetPasswordFirstPage;
