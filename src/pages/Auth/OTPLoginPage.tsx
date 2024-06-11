import { useEffect, useState } from "react";
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
  const { sendRequest } = useApi<{ phone: string; OtpCode: string }, BaseResponse<AuthData>>();
  const { sendRequest: sendOtpRequest } = useApi<{ phone: string }, BaseResponse<AuthData>>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!enteredUsername) {
      navigate("/auth");
    }
    sendOtpRequest(
      {
        url: '/Users/OtpRequest',
        method: 'post',
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
        setErrorMessage(error?.message ?? '');
      }
    );
  }, [enteredUsername, navigate, dispatch, sendOtpRequest]);

  const onFinish = (code: string): void => {
    sendRequest(
      {
        url: '/Users/OtpLogin',
        method: 'post',
        data: {
          phone: enteredUsername,
          OtpCode: code,
        },
      },
      (response) => {
        setAuthDataInLocal(response.value as unknown as AuthData);
        dispatch(authActions.setToken(response.value as unknown as AuthData));
        toast.success(response.message);
        navigate("/");
      },
      (error) => {
        setErrorMessage(error?.message ?? '');
      }
    );
  }

  const onOTPRefresh = () => {
    return axiosIntance.post('/Users/OtpRequest', {
      phone: enteredUsername,
    });
  }

  return (
    <section className="w-full">
      <BackButton />
      <form className="p-8 pt-4 border-b">
        <OTPBox
          codeLength={6}
          onFinish={onFinish}
          phone={enteredUsername}
          durationSeconds={60}
          onRefresh={onOTPRefresh}
        />
        {errorMessage && (
          <p className="text-red-600 text-sm pr-2 mt-2 text-center">
            {errorMessage}
          </p>
        )}
      </form>
    </section>
  );
};

export default OTPLoginPage;
