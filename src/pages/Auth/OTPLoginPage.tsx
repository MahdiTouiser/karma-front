import { useEffect } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import OTPBox from "../../components/auth/OTPBox";
import BackButton from "../../components/shared/BackButton";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import useApi, { axiosIntance } from "../../hooks/useApi";
import { AuthData } from "../../models/auth.models";
import { BaseResponse } from "../../models/shared.models";
import { authActions } from "../../store/auth";
import { setAuthDataInLocal } from "../../utils/authUtils";

const OTPLoginPage: React.FC = () => {
  const enteredUsername = useAppSelector((state) => state.auth.enteredUsername);
  const { sendRequest, errors } = useApi<
    { phone: string; OtpCode: string },
    BaseResponse<AuthData>
  >();

  const { sendRequest: sendOtpRequest } = useApi<
    { phone: string; },
    BaseResponse<AuthData>
  >();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!enteredUsername) {
      navigate("/auth");
    }
    sendOtpRequest(
      {
        url: "/Users/OtpRequest",
        method: "post",
        data: {
          phone: enteredUsername,
        },
      },
      (response) => {
        setAuthDataInLocal(response.value as unknown as AuthData);
        dispatch(authActions.setToken(response.value as unknown as AuthData));
        navigate("/");
      },
      (error) => {
        toast.error(error?.message);
      });

  }, [enteredUsername, navigate]);

  const onFinish = (code: string): void => {
    sendRequest(
      {
        url: "/Users/OtpLogin",
        method: "post",
        data: {
          phone: enteredUsername,
          OtpCode: code,
        },
      },
      (response) => {
        setAuthDataInLocal(response.value as unknown as AuthData);
        dispatch(authActions.setToken(response.value as unknown as AuthData));
        toast.success(response.message);
        // if (response.content.isAdmin) {
        //   navigate("/admin");
        //   return;
        // }
        // if (!response.content.personalInformationCompleted) {
        //   navigate("/auth/signup/personal");
        //   return;
        // }
        // if (!response.content.securityInformationCompleted) {
        //   navigate("/auth/signup/user-info");
        //   return;
        // }
        navigate("/");
      }
    );
  }

  const onOTPRefresh = () => {
    return axiosIntance.post("/Users/OtpRequest", {
      phone: enteredUsername,
    });
  }

  return (
    <section className="w-full">
      <BackButton />
      <form className="p-8 pt-4 border-b">
        <OTPBox
          condLength={6}
          onFinish={onFinish}
          phone={enteredUsername}
          durationSeconds={60}
          onRefresh={onOTPRefresh}
        />
        {errors && (
          <p className="text-red-600 text-sm pr-2 mt-2 text-center">
            {errors.message}
          </p>
        )}
      </form>
      {/* <Link
        to="../password"
        className="flex items-center w-full h-full px-8 py-4"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-8 h-8 ml-2"
        >
          <path
            fillRule="evenodd"
            d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z"
            clipRule="evenodd"
          />
        </svg>

        <p>ورود با رمز عبور</p>
      </Link> */}
    </section>
  );
};

export default OTPLoginPage;
