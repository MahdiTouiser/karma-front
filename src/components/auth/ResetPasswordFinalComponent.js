import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import useApi from "../../hooks/useApi";
import { Regexes } from "../../utils/shared";
import KAlert from "../shared/Alert";
import KButton from "../shared/Button";
import KLabel from "../shared/Label";
import PasswordInput from "../shared/PasswordInput";
import KSpinner from "../shared/Spinner";
const ResetPasswordFinalComponent = ({ onResetPassword }) => {
    const { register, formState: { errors }, handleSubmit, watch, } = useForm({ mode: "onTouched" });
    const { sendRequest, errors: apiErrors, isPending, } = useApi();
    const passwordRef = useRef();
    passwordRef.current = watch("password", "");
    function onSubmit(data) {
        sendRequest({
            url: "/Users/ResetPassword",
            method: "put",
            data: { password: data.password },
        }, (response) => {
            toast.success(response.message);
            onResetPassword();
        });
    }
    return (_jsxs("form", { className: "p-8 pt-4 w-auto min-w-[24rem] ", onSubmit: handleSubmit(onSubmit), children: [apiErrors && (_jsx(KAlert, { color: "red", className: "my-3", children: apiErrors.message })), _jsxs("div", { children: [_jsx(KLabel, { htmlFor: "password", children: "\u0631\u0645\u0632 \u0639\u0628\u0648\u0631 \u0645\u0648\u0631\u062F \u0646\u0638\u0631 \u062E\u0648\u062F \u0631\u0627 \u0648\u0627\u0631\u062F \u06A9\u0646\u06CC\u062F." }), _jsx(PasswordInput, { ...register("password", {
                            required: "لطفا رمزعبور خود را وارد کنید.",
                            pattern: {
                                value: Regexes.password,
                                message: "رمز عبور حداقل 6 کاراکتر و شامل اعداد و حروف انگلیسی باشد.",
                            },
                        }), id: "password", invalid: !!errors.password }), errors.password?.message && (_jsx("p", { className: "text-red-600 text-sm pr-2 mt-2", children: errors.password.message }))] }), _jsxs("div", { className: "mt-6", children: [_jsx(KLabel, { htmlFor: "repeatPassword", children: "\u0631\u0645\u0632 \u0639\u0628\u0648\u0631 \u0645\u0648\u0631\u062F \u0646\u0638\u0631 \u062E\u0648\u062F \u0631\u0627 \u0645\u062C\u062F\u062F \u0648\u0627\u0631\u062F \u06A9\u0646\u06CC\u062F." }), _jsx(PasswordInput, { ...register("repeatPassword", {
                            required: "لطفا رمزعبور خود را مجدد وارد کنید.",
                            validate: (value) => value === passwordRef.current ||
                                "تکرار رمز عبور با رمز عبور مطابقت ندارد.",
                        }), id: "repeatPassword", invalid: !!errors.repeatPassword }), errors.repeatPassword?.message && (_jsx("p", { className: "text-red-600 text-sm pr-2 mt-2", children: errors.repeatPassword.message }))] }), _jsxs(KButton, { className: "mt-4 w-full", color: "primary", type: "submit", disabled: isPending, children: [isPending && _jsx(KSpinner, {}), "\u062A\u063A\u06CC\u06CC\u0631 \u0631\u0645\u0632\u0639\u0628\u0648\u0631"] })] }));
};
export default ResetPasswordFinalComponent;
