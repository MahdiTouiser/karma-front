import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import useApi from "../../../hooks/useApi";
import useConfirm from "../../../hooks/useConfirm";
import { authActions } from "../../../store/auth";
import { removeAuthDataFromLocal } from "../../../utils/authUtils";
import KLabel from "../../shared/Label";
import KTextInput from "../../shared/TextInput";
import KTooltip from "../../shared/Tooltip";
import UserStatusLabel from "../../shared/UserStatusLabel";
import ChangePasswordModal from "./ChangePasswordModal";
const AccountInfo = () => {
    const { 
    // register,
    formState: { errors },
    // handleSubmit,
    // watch,
     } = useForm({
        mode: "onTouched",
    });
    const authState = useAppSelector((state) => state.auth);
    const userStatusInfo = useAppSelector((state) => state.generalSettings.generalSettings?.userStatusInfo);
    const [statusDescription, setStatusDescription] = useState("");
    const [ConfirmModal, confirmation] = useConfirm("حساب کاربری شما غیر فعال خواهد شد. آیا مطمئن هستید؟ ", "غیرفعال کردن حساب کاربری");
    const { sendRequest: sendInactivate } = useApi();
    const [startChangePassword, setStartChangePassword] = useState(false);
    const { sendRequest: sendOtpRequest, isPending: otpPending } = useApi();
    const dispatch = useAppDispatch();
    async function onInactiveAccount() {
        const confirm = await confirmation();
        if (confirm) {
            sendInactivate({
                url: "/Users/Inactivate",
                method: "put",
            }, (response) => {
                toast.success(response.message);
                removeAuthDataFromLocal();
                dispatch(authActions.logOut());
            }, (error) => {
                toast.error(error?.message);
            });
        }
    }
    function onStartChangePassword() {
        sendOtpRequest({
            url: "/Users/OtpRequest",
            method: "post",
            data: { phone: authState.mobile },
        }, () => {
            setStartChangePassword(true);
        }, (error) => toast.error(error?.message));
    }
    useEffect(() => {
        const statusInfo = userStatusInfo?.find((item) => item.status === authState.userStatus);
        setStatusDescription(statusInfo?.description || "");
    }, [userStatusInfo, authState.userStatus]);
    return (_jsxs("div", { className: "flex flex-col items-center", children: [_jsx(ConfirmModal, {}), _jsx(ChangePasswordModal, { phone: authState.mobile, show: startChangePassword, onClose: () => setStartChangePassword(false) }), _jsxs("div", { className: "flex flex-col items-center mb-10", children: [_jsxs("div", { className: "flex gap-4 mb-3", children: [_jsx("p", { className: "text-slate-500", children: "\u0648\u0636\u0639\u06CC\u062A \u062D\u0633\u0627\u0628 \u06A9\u0627\u0631\u0628\u0631\u06CC" }), _jsx(UserStatusLabel, { status: authState.userStatus, display: authState.userStatusDisplay }), _jsx(KTooltip, { content: statusDescription, trigger: "hover", placement: "bottom", children: _jsx("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 2, stroke: "currentColor", className: "w-6 h-6", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" }) }) })] }), _jsxs("div", { className: "flex gap-4", children: [_jsx("p", { className: "text-slate-500", children: "\u0646\u0648\u0639 \u062D\u0633\u0627\u0628 \u06A9\u0627\u0631\u0628\u0631\u06CC" }), _jsx("p", { className: "font-semibold", children: authState.userType })] })] }), _jsxs("form", { className: "flex flex-wrap max-w-2xl", children: [_jsxs("div", { className: "mb-6 w-full sm:w-1/2 sm:pl-12", children: [_jsx(KLabel, { htmlFor: "userId", children: "\u06A9\u062F \u06A9\u0627\u0631\u0628\u0631\u06CC" }), _jsx(KTextInput, { value: authState.code, disabled: true, type: "text", id: "userId", className: "ltr" })] }), _jsxs("div", { className: "mb-6 w-full sm:w-1/2 sm:pl-12", children: [_jsx(KLabel, { htmlFor: "username", children: "\u0646\u0627\u0645 \u06A9\u0627\u0631\u0628\u0631\u06CC" }), _jsx(KTextInput
                            // {...register("username", {
                            //   required: "فیلد الزامی است.",
                            //   pattern: {
                            //     value: /^[\da-zA-z]*$/,
                            //     message: "نام کاربری فقط باید شامل اعداد و حروف انگلیسی باشد.",
                            //   },
                            //   maxLength: {
                            //     value: 10,
                            //     message: "کد ملی باید 10 رقم باشد.",
                            //   },
                            //   minLength: {
                            //     value: 5,
                            //     message: "نام کاربری حداقل باید 5 کاراکتر باشد.",
                            //   },
                            // })}
                            , { 
                                // {...register("username", {
                                //   required: "فیلد الزامی است.",
                                //   pattern: {
                                //     value: /^[\da-zA-z]*$/,
                                //     message: "نام کاربری فقط باید شامل اعداد و حروف انگلیسی باشد.",
                                //   },
                                //   maxLength: {
                                //     value: 10,
                                //     message: "کد ملی باید 10 رقم باشد.",
                                //   },
                                //   minLength: {
                                //     value: 5,
                                //     message: "نام کاربری حداقل باید 5 کاراکتر باشد.",
                                //   },
                                // })}
                                type: "text", id: "username", disabled: true, invalid: !!errors.username, value: authState.username, className: "ltr" }), errors.username?.message && (_jsx("p", { className: "text-red-600 text-sm pr-2 mt-2", children: errors.username.message }))] }), _jsxs("div", { className: "mb-6 w-full sm:w-1/2 sm:pl-12", children: [_jsxs("div", { className: "flex justify-between", children: [_jsx(KLabel, { htmlFor: "phone", children: "\u0631\u0645\u0632 \u0648\u0631\u0648\u062F" }), _jsx("button", { type: "button", className: "text-cyan-500 mb-2 font-semibold text-sm pl-2", disabled: otpPending, onClick: onStartChangePassword, children: "\u0648\u06CC\u0631\u0627\u06CC\u0634" })] }), _jsx(KTextInput, { type: "password", disabled: true, id: "phone", value: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022" })] }), _jsxs("div", { className: "mb-6 w-full sm:w-1/2 sm:pl-12", children: [_jsx("div", { className: "flex justify-between", children: _jsx(KLabel, { htmlFor: "phone", children: "\u0645\u0648\u0628\u0627\u06CC\u0644" }) }), _jsx(KTextInput, { type: "text", 
                                // {...register("phone", {
                                //   required: "لطفا شماره موبایل خود را وارد کنید.",
                                //   pattern: {
                                //     value: /(\+98|0|0098)9\d{9}$/,
                                //     message: "فرمت شماره موبایل صحیح نیست.",
                                //   },
                                // })}
                                disabled: true, value: authState.mobile, className: "ltr", id: "phone" }), errors.phone?.message && (_jsx("p", { className: "text-red-600 text-sm pr-2 mt-2", children: errors.phone.message }))] }), _jsx("div", { className: "w-full sm:w-1/2 sm:pl-12", children: _jsx("button", { type: "button", className: "text-red-600 font-semibold text-sm", onClick: onInactiveAccount, children: "\u063A\u06CC\u0631 \u0641\u0639\u0627\u0644 \u06A9\u0631\u062F\u0646 \u062D\u0633\u0627\u0628 \u06A9\u0627\u0631\u0628\u0631\u06CC" }) })] })] }));
};
export default AccountInfo;
