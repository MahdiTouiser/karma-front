import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import KButton from "../../../components/shared/Button";
import KSpinner from "../../../components/shared/Spinner";
import { useAppDispatch } from "../../../hooks/reduxHooks";
import useApi from "../../../hooks/useApi";
import { OTPRequest, OTPResponse } from "../../../models/auth.models";
import { BaseResponse } from "../../../models/shared.models";
import { authActions } from "../../../store/auth";
import { Regexes } from "../../../utils/shared";
import { phoneInputValidator } from "../../../utils/validations";

const SignUpMobilePage: React.FC = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<{ phone: string }>({
    mode: "onTouched",
  });

  const { sendRequest, errors: apiErrors } = useApi<
    { phone: string },
    BaseResponse<string>
  >();

  const { sendRequest: sendOtpRequest, errors: otpErrors } = useApi<
    OTPRequest,
    OTPResponse
  >();


  const [finalPending, setFinalPending] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const navigate = useNavigate();


  const navigateToNextPage = () => {
    navigate("otp");
  }

  const requestOtp = (phone: string) => {
    sendOtpRequest(
      {
        url: "/Users/OtpRequest",
        method: "post",
        data: { phone: phone },
      },
      () => {
        setFinalPending(false);
        navigateToNextPage(), () => setFinalPending(false);
      }
    );
  }

  const onSubmit = (data: { phone: string }) => {
    setFinalPending(true);
    sendRequest(
      {
        url: "/Users/Register",
        method: "post",
        data: data,
      },
      (reponse) => {
        dispatch(
          authActions.signUpPhone({ phone: data.phone, id: reponse.content })
        );
        requestOtp(data.phone);
      },
      () => setFinalPending(false)
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-8 w-full">
      <h1 className="mb-6 text-lg font-semibold">ایجاد حساب کاربری</h1>
      <div className="flex w-full gap-1">
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
            {...phoneInputValidator}
            {...register("phone", {
              required: "لطفا شماره موبایل خود را وارد کنید.",
              pattern: {
                value: Regexes.mobile,
                message: "شماره موبایل صحیح نیست.",
              },
            })}
            type="text"
            id="input-group-1"
            maxLength={14}
            className={`${errors.phone
              ? "border-red-500 focus:ring-red-500 focus:border-red-500"
              : "border-gray-300 focus:border-blue-500"
              } ltr placeholder:text-right w-full h-10 bg-gray-50 border  text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block pr-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
            placeholder="شماره موبایل خود را وارد کنید"
          />
        </div>
        <div className="">
          <KButton
            className="w-full"
            type="submit"
            color="primary"
            disabled={finalPending}
          >
            {finalPending && <KSpinner />}
            ادامه
          </KButton>
        </div>
      </div>
      <div className="flex items-center mr-4 mt-2">
        <label
          className="mr-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          ورود شما به معنای پذیرش شرایط کارما و قوانین حریم‌ خصوصی است.
        </label>
      </div>
      {errors.phone?.message && (
        <p className="text-red-600 text-sm pr-2 mt-2">{errors.phone.message}</p>
      )}

      {apiErrors && (
        <p className="text-red-600 text-sm pr-2 mt-2">{apiErrors.message}</p>
      )}

      {otpErrors && (
        <p className="text-red-600 text-sm pr-2 mt-2">{otpErrors.message}</p>
      )}

      <div className="flex items-center gap-2 mt-6 justify-center ">
        <p>حساب کاربری دارید؟</p>
        <Link to="../">
          <KButton color="primary" className="w-full">
            ورود
          </KButton>
        </Link>
      </div>
    </form>
  );
};

export default SignUpMobilePage;
