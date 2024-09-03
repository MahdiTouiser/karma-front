import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import OTPBox from '../../../components/auth/OTPBox';
import { useAppDispatch, useAppSelector, } from '../../../hooks/reduxHooks';
import useApi, { axiosIntance } from '../../../hooks/useApi';
import { authActions } from '../../../store/auth';
import { setAuthDataInLocal } from '../../../utils/authUtils';
const SignUpPasswordOtpPage = () => {
    const phone = useAppSelector((state) => state.auth.enteredPhone);
    const dispatch = useAppDispatch();
    const { sendRequest, errors } = useApi();
    const navigate = useNavigate();
    useEffect(() => {
        if (!phone) {
            navigate("/auth/signup");
        }
    }, [phone, navigate]);
    const onFinish = (code) => {
        sendRequest({
            url: "/Users/PhoneConfirmation",
            method: "post",
            data: {
                phone: phone,
                otpCode: code,
            },
        }, (response) => {
            setAuthDataInLocal(response.value);
            dispatch(authActions.setToken(response.value));
            navigate('/cv-builder/create');
            toast.success(response.message);
        });
    };
    const onOTPRefresh = () => {
        return axiosIntance.post("/Users/OtpRequest", { phone: phone });
    };
    return (_jsx("section", { className: "w-full", children: _jsxs("form", { className: "p-8 pt-4 border-b", children: [_jsx(OTPBox, { codeLength: 6, onFinish: onFinish, phone: phone, durationSeconds: 120, onRefresh: onOTPRefresh }), errors && (_jsx("p", { className: "pr-2 mt-2 text-sm text-center text-red-600", children: errors.message }))] }) }));
};
export default SignUpPasswordOtpPage;
