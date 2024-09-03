import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import KButton from "../../../components/shared/Button";
import KSpinner from "../../../components/shared/Spinner";
import { useAppDispatch } from "../../../hooks/reduxHooks";
import useApi from "../../../hooks/useApi";
import { authActions } from "../../../store/auth";
import { Regexes } from "../../../utils/shared";
import { phoneInputValidator } from "../../../utils/validations";
const SignUpMobilePage = () => {
    const { register, formState: { errors }, handleSubmit, } = useForm({
        mode: "onTouched",
    });
    const { sendRequest, errors: apiErrors } = useApi();
    const { sendRequest: sendOtpRequest, errors: otpErrors } = useApi();
    const [finalPending, setFinalPending] = useState(false);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const navigateToNextPage = () => {
        navigate("otp");
    };
    const requestOtp = (phone) => {
        sendOtpRequest({
            url: "/Users/OtpRequest",
            method: "post",
            data: { phone: phone },
        }, () => {
            setFinalPending(false);
            navigateToNextPage(), () => setFinalPending(false);
        });
    };
    const onSubmit = (data) => {
        setFinalPending(true);
        sendRequest({
            url: "/Users/Register",
            method: "post",
            data: data,
        }, (reponse) => {
            dispatch(authActions.signUpPhone({ phone: data.phone, id: reponse.content }));
            requestOtp(data.phone);
        }, () => setFinalPending(false));
    };
    return (_jsxs("form", { onSubmit: handleSubmit(onSubmit), className: "p-8 w-full", children: [_jsx("h1", { className: "mb-6 text-lg font-semibold", children: "\u0627\u06CC\u062C\u0627\u062F \u062D\u0633\u0627\u0628 \u06A9\u0627\u0631\u0628\u0631\u06CC" }), _jsxs("div", { className: "flex w-full gap-1", children: [_jsxs("div", { className: "relative w-full mb-0", children: [_jsx("div", { className: "absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none", children: _jsx("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", className: "w-6 h-6", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" }) }) }), _jsx("input", { ...phoneInputValidator, ...register("phone", {
                                    required: "لطفا شماره موبایل خود را وارد کنید.",
                                    pattern: {
                                        value: Regexes.mobile,
                                        message: "شماره موبایل صحیح نیست.",
                                    },
                                }), type: "text", id: "input-group-1", maxLength: 14, className: `${errors.phone
                                    ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                                    : "border-gray-300 focus:border-blue-500"} ltr placeholder:text-right w-full h-10 bg-gray-50 border  text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block pr-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`, placeholder: "\u0634\u0645\u0627\u0631\u0647 \u0645\u0648\u0628\u0627\u06CC\u0644 \u062E\u0648\u062F \u0631\u0627 \u0648\u0627\u0631\u062F \u06A9\u0646\u06CC\u062F" })] }), _jsx("div", { className: "", children: _jsxs(KButton, { className: "w-full", type: "submit", color: "primary", disabled: finalPending, children: [finalPending && _jsx(KSpinner, {}), "\u0627\u062F\u0627\u0645\u0647"] }) })] }), _jsx("div", { className: "flex items-center mr-4 mt-2", children: _jsx("label", { className: "mr-2 text-sm font-medium text-gray-900 dark:text-gray-300", children: "\u0648\u0631\u0648\u062F \u0634\u0645\u0627 \u0628\u0647 \u0645\u0639\u0646\u0627\u06CC \u067E\u0630\u06CC\u0631\u0634 \u0634\u0631\u0627\u06CC\u0637 \u06A9\u0627\u0631\u0645\u0627 \u0648 \u0642\u0648\u0627\u0646\u06CC\u0646 \u062D\u0631\u06CC\u0645\u200C \u062E\u0635\u0648\u0635\u06CC \u0627\u0633\u062A." }) }), errors.phone?.message && (_jsx("p", { className: "text-red-600 text-sm pr-2 mt-2", children: errors.phone.message })), apiErrors && (_jsx("p", { className: "text-red-600 text-sm pr-2 mt-2", children: apiErrors.message })), otpErrors && (_jsx("p", { className: "text-red-600 text-sm pr-2 mt-2", children: otpErrors.message })), _jsxs("div", { className: "flex items-center gap-2 mt-6 justify-center ", children: [_jsx("p", { children: "\u062D\u0633\u0627\u0628 \u06A9\u0627\u0631\u0628\u0631\u06CC \u062F\u0627\u0631\u06CC\u062F\u061F" }), _jsx(Link, { to: "../", children: _jsx(KButton, { color: "primary", className: "w-full", children: "\u0648\u0631\u0648\u062F" }) })] })] }));
};
export default SignUpMobilePage;
