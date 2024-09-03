import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import OTPBox from "../../components/auth/OTPBox";
import BackButton from "../../components/shared/BackButton";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import useApi, { axiosIntance } from "../../hooks/useApi";
import { authActions } from "../../store/auth";
import { setAuthDataInLocal } from "../../utils/authUtils";
const OTPLoginPage = () => {
    const enteredUsername = useAppSelector((state) => state.auth.enteredUsername);
    const { sendRequest } = useApi();
    const { sendRequest: sendOtpRequest } = useApi();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState(null);
    useEffect(() => {
        if (!enteredUsername) {
            navigate("/auth");
        }
        sendOtpRequest({
            url: '/Users/OtpRequest',
            method: 'post',
            data: {
                phone: enteredUsername,
            },
        }, (response) => {
            setAuthDataInLocal(response.value);
            dispatch(authActions.setToken(response.value));
            navigate("/");
        }, (error) => {
            setErrorMessage(error?.message ?? '');
        });
    }, [enteredUsername, navigate, dispatch, sendOtpRequest]);
    const onFinish = (code) => {
        sendRequest({
            url: '/Users/OtpLogin',
            method: 'post',
            data: {
                phone: enteredUsername,
                OtpCode: code,
            },
        }, (response) => {
            setAuthDataInLocal(response.value);
            dispatch(authActions.setToken(response.value));
            toast.success(response.message);
            navigate('/cv-builder/create');
        }, (error) => {
            setErrorMessage(error?.message ?? '');
        });
    };
    const onOTPRefresh = () => {
        return axiosIntance.post('/Users/OtpRequest', {
            phone: enteredUsername,
        });
    };
    return (_jsxs("section", { className: "w-full", children: [_jsx(BackButton, {}), _jsxs("form", { className: "p-8 pt-4 border-b", children: [_jsx(OTPBox, { codeLength: 6, onFinish: onFinish, phone: enteredUsername, durationSeconds: 120, onRefresh: onOTPRefresh }), errorMessage && (_jsx("p", { className: "text-red-600 text-sm pr-2 mt-2 text-center", children: errorMessage }))] })] }));
};
export default OTPLoginPage;
