import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import BackButton from "../../../components/shared/BackButton";
import KButton from "../../../components/shared/Button";
import KSpinner from "../../../components/shared/Spinner";
import { useAppDispatch } from "../../../hooks/reduxHooks";
import useApi from "../../../hooks/useApi";
import { authActions } from "../../../store/auth";
import { Regexes } from "../../../utils/shared";
import { phoneInputValidator } from "../../../utils/validations";
const ForgetPasswordFirstPage = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { sendRequest, isPending, errors: apiErrors, } = useApi();
    const { register, formState: { errors }, handleSubmit, } = useForm({ mode: "onTouched" });
    function onSubmit(data) {
        const phone = data.phone;
        dispatch(authActions.setMobile(phone));
        sendRequest({
            url: "/Users/OtpRequest",
            method: "post",
            data: { phone: phone },
        }, () => navigate("otp"));
        return;
    }
    return (_jsxs("section", { className: "w-full", children: [_jsx(BackButton, {}), _jsxs("form", { onSubmit: handleSubmit(onSubmit), className: "p-8 pt-4 border-b", children: [_jsxs("div", { className: "relative w-full mb-0", children: [_jsx("div", { className: "absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none", children: _jsx("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", className: "w-6 h-6", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" }) }) }), _jsx("input", { ...register("phone", {
                                    required: "لطفا شماره موبایل خود را وارد کنید.",
                                    pattern: {
                                        value: Regexes.mobile,
                                        message: "شماره موبایل صحیح نیست.",
                                    },
                                }), type: "text", maxLength: 14, ...phoneInputValidator, id: "input-group-1", className: `${errors.phone
                                    ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                                    : "border-gray-300 focus:border-blue-500"} ltr placeholder:text-right w-full h-10 bg-gray-50 border  text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block pr-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`, placeholder: "\u0634\u0645\u0627\u0631\u0647 \u0645\u0648\u0628\u0627\u06CC\u0644 \u062E\u0648\u062F \u0631\u0627 \u0648\u0627\u0631\u062F \u06A9\u0646\u06CC\u062F" })] }), errors.phone?.message && (_jsx("p", { className: "text-red-600 text-sm pr-2 mt-2", children: errors.phone.message })), apiErrors && (_jsx("p", { className: "text-red-600 text-sm pr-2 mt-2", children: apiErrors.message })), _jsxs(KButton, { type: "submit", className: "w-full mt-3", color: "primary", disabled: isPending, children: [isPending && _jsx(KSpinner, {}), "\u0628\u0627\u0632\u06CC\u0627\u0628\u06CC \u0631\u0645\u0632 \u0639\u0628\u0648\u0631"] })] })] }));
};
export default ForgetPasswordFirstPage;
