import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useAppDispatch } from "../../hooks/reduxHooks";
import useApi, { axiosIntance } from "../../hooks/useApi";
import { authActions } from "../../store/auth";
import { setAuthDataInLocal } from "../../utils/authUtils";
import OTPBox from "./OTPBox";
const ResetPasswordOtp = ({ phone, onOtpConfirm, }) => {
    const dispatch = useAppDispatch();
    const { sendRequest, errors } = useApi();
    function onFinish(code) {
        sendRequest({
            url: "/Users/OtpRequestConfirmation",
            method: "post",
            data: {
                phone: phone,
                code: code,
            },
        }, (response) => {
            setAuthDataInLocal(response.value);
            dispatch(authActions.setToken(response.value));
            onOtpConfirm();
        });
    }
    function onOTPRefresh() {
        return axiosIntance.post("/Users/OtpRequest", { phone: phone });
    }
    return (_jsxs("form", { className: "p-8 pt-4", children: [_jsx(OTPBox, { codeLength: 6, onFinish: onFinish, phone: phone, durationSeconds: 120, onRefresh: onOTPRefresh }), errors && (_jsx("p", { className: "text-red-600 text-sm pr-2 mt-2 text-center", children: errors.message }))] }));
};
export default ResetPasswordOtp;
