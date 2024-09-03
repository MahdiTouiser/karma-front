import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ResetPasswordOtpComponent from "../../../components/auth/ResetPasswordOtp";
import BackButton from "../../../components/shared/BackButton";
import { useAppSelector } from "../../../hooks/reduxHooks";
const ForgetPasswordOtpPage = () => {
    const phone = useAppSelector((state) => state.auth.enteredPhone);
    const navigate = useNavigate();
    useEffect(() => {
        if (!phone) {
            navigate("/auth/forget-password");
        }
    }, [phone, navigate]);
    function onOtpConfirm() {
        navigate("/auth/forget-password/change");
    }
    return (_jsxs("section", { className: "w-full", children: [_jsx(BackButton, {}), _jsx(ResetPasswordOtpComponent, { phone: phone, onOtpConfirm: onOtpConfirm })] }));
};
export default ForgetPasswordOtpPage;
