import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import OTPBox from "../../../components/auth/OTPBox";
import { useAppSelector, useAppDispatch } from "../../../hooks/reduxHooks";
import useAPi, { axiosIntance } from "../../../hooks/useApi";
import { AuthData } from "../../../models/auth.models";
import { BaseResponse } from "../../../models/shared.models";
import { authActions } from "../../../store/auth";
import { setAuthDataInLocal } from "../../../utils/authUtils";

const SignUpPasswordOtpPage: React.FC = () => {
  const phone = useAppSelector((state) => state.auth.enteredPhone);
  const dispatch = useAppDispatch();
  const { sendRequest, errors } = useAPi<
    { phone: string; code: string },
    BaseResponse<AuthData>
  >();
  const navigate = useNavigate();
  useEffect(() => {
    if (!phone) {
      navigate("/auth/signup");
    }
  }, [phone, navigate]);
  function onFinish(code: string): void {
    sendRequest(
      {
        url: "/Users/OtpRegisterConfirmation",
        method: "post",
        data: {
          phone: phone,
          code: code,
        },
      },
      (response) => {
        setAuthDataInLocal(response.content);
        dispatch(authActions.setToken(response.content));
        navigate("/auth/signup/personal");
      }
    );
  }

  function onOTPRefresh() {
    return axiosIntance.post("/Users/OtpRequest", { username: phone });
  }

  return (
    <section className="w-full">
      <form className="p-8 pt-4 border-b">
        <OTPBox
          condLength={6}
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
