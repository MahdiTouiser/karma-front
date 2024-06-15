import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import OTPBox from "../../../components/auth/OTPBox";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import useApi, { axiosIntance } from "../../../hooks/useApi";
import { AuthData } from "../../../models/auth.models";
import { BaseResponse } from "../../../models/shared.models";
import { authActions } from "../../../store/auth";
import { setAuthDataInLocal } from "../../../utils/authUtils";

const SignUpPasswordOtpPage: React.FC = () => {
  const phone = useAppSelector((state) => state.auth.enteredPhone);
  const dispatch = useAppDispatch();
  const { sendRequest, errors } = useApi<
    { phone: string; otpCode: string },
    BaseResponse<AuthData>
  >();
  const navigate = useNavigate();
  useEffect(() => {
    if (!phone) {
      navigate("/auth/signup");
    }
  }, [phone, navigate]);
  const onFinish = (code: string): void => {
    sendRequest(
      {
        url: "/Users/PhoneConfirmation",
        method: "post",
        data: {
          phone: phone,
          otpCode: code,
        },
      },
      (response) => {
        setAuthDataInLocal(response.value as unknown as AuthData);
        dispatch(authActions.setToken(response.value as unknown as AuthData));
        navigate('/cv-builder');
      }
    );
  }

  const onOTPRefresh = () => {
    return axiosIntance.post("/Users/OtpRequest", { phone: phone });
  }

  return (
    <section className="w-full">
      <form className="p-8 pt-4 border-b">
        <OTPBox
          codeLength={6}
          onFinish={onFinish}
          phone={phone}
          durationSeconds={60}
          onRefresh={onOTPRefresh}
        />
        {errors && (
          <p className="text-red-600 text-sm pr-2 mt-2 text-center">
            {errors.message}
          </p>
        )}
      </form>
    </section>
  );
};

export default SignUpPasswordOtpPage;
