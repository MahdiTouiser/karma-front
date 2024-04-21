import { useAppDispatch } from "../../hooks/reduxHooks";
import useAPi, { axiosIntance } from "../../hooks/useApi";
import { AuthData } from "../../models/auth.models";
import { BaseResponse } from "../../models/shared.models";
import { authActions } from "../../store/auth";
import { setAuthDataInLocal } from "../../utils/authUtils";
import OTPBox from "./OTPBox";

interface ResetPasswordOtpComponentProps {
  phone: string;
  onOtpConfirm: () => void;
}

const ResetPasswordOtpComponent: React.FC<ResetPasswordOtpComponentProps> = ({
  phone,
  onOtpConfirm,
}) => {
  const dispatch = useAppDispatch();
  const { sendRequest, errors } = useAPi<
    { phone: string; code: string },
    BaseResponse<AuthData>
  >();

  function onFinish(code: string): void {
    sendRequest(
      {
        url: "/Users/OtpRequestConfirmation",
        method: "post",
        data: {
          phone: phone,
          code: code,
        },
      },
      (response) => {
        setAuthDataInLocal(response.content);
        dispatch(authActions.setToken(response.content));
        onOtpConfirm();
      }
    );
  }

  function onOTPRefresh() {
    return axiosIntance.post("/Users/OtpRequest", { username: phone });
  }

  return (
    <form className="p-8 pt-4">
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
  );
};

export default ResetPasswordOtpComponent;
