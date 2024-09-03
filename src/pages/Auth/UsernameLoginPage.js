import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, } from 'react';
import { Link, useNavigate, } from 'react-router-dom';
import { toast } from 'react-toastify';
import BackButton from '../../components/shared/BackButton';
import KButton from '../../components/shared/Button';
import KSpinner from '../../components/shared/Spinner';
import { useAppDispatch, useAppSelector, } from '../../hooks/reduxHooks';
import useApi from '../../hooks/useApi';
import { authActions } from '../../store/auth';
import { setAuthDataInLocal } from '../../utils/authUtils';
import { replacePersianArabicsNumbers } from '../../utils/shared';
const UsernameLoginPage = () => {
    const username = useAppSelector((state) => state.auth.enteredUsername);
    const password = useAppSelector((state) => state.auth.enteredPassword);
    const dispatch = useAppDispatch();
    const [submitted, setSubmitted] = useState(false);
    const [usernameSubmitted, setUsernameSubmitted] = useState(false);
    const navigate = useNavigate();
    const { sendRequest, errors, isPending } = useApi();
    const onChangeUsername = (event) => {
        const input = replacePersianArabicsNumbers(event.currentTarget.value);
        dispatch(authActions.setUsername(input));
    };
    const onChangePassword = (event) => {
        const input = replacePersianArabicsNumbers(event.currentTarget.value);
        dispatch(authActions.setPassword(input));
    };
    const onSubmitUsername = (event) => {
        event.preventDefault();
        setSubmitted(true);
        if (username) {
            setUsernameSubmitted(true);
        }
    };
    const onSubmitPassword = async (event) => {
        event.preventDefault();
        setSubmitted(true);
        if (!username || !password)
            return;
        const data = {
            username: username,
            password: password
        };
        sendRequest({
            method: 'post',
            url: `/Users/Login`,
            data: data
        }, (response) => {
            setAuthDataInLocal(response.value);
            dispatch(authActions.setToken(response.value));
            toast.success(response.message);
            if (response.value.isAdmin) {
                navigate("/admin/resumes");
                return;
            }
            navigate("/");
        }, (error) => {
            console.error("Error:", error);
        });
    };
    const handlePreviousClick = () => {
        setUsernameSubmitted(false);
    };
    return (_jsxs("form", { onSubmit: usernameSubmitted ? onSubmitPassword : onSubmitUsername, className: "p-8", children: [_jsxs("div", { className: "relative flex items-center justify-between", children: [usernameSubmitted && (_jsx("span", { className: "absolute bottom-0 right-0", onClick: handlePreviousClick, children: _jsx(BackButton, {}) })), _jsx("h1", { className: "mx-auto text-lg font-semibold", children: "\u0648\u0631\u0648\u062F \u06A9\u0627\u0631\u062C\u0648" })] }), _jsxs("div", { className: "flex flex-col items-center mt-2", children: [!usernameSubmitted ? (_jsxs(_Fragment, { children: [_jsxs("div", { className: "relative w-full mb-4", children: [_jsx("div", { className: "absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none", children: _jsx("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", className: "w-6 h-6", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" }) }) }), _jsx("input", { type: "text", value: username, onInput: onChangeUsername, id: "input-group-1", className: `${submitted && !username
                                            ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                                            : "border-gray-300 focus:border-blue-500"} ltr placeholder:text-center w-full bg-gray-50 border text-gray-900 text-sm focus:ring-blue-500 mr-1 focus:border-blue-500 block pr-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 pl-12 rounded`, placeholder: "\u0646\u0627\u0645 \u06A9\u0627\u0631\u0628\u0631\u06CC \u06CC\u0627 \u0634\u0645\u0627\u0631\u0647 \u0645\u0648\u0628\u0627\u06CC\u0644" })] }), submitted && !username && (_jsx("p", { className: "mb-3 text-sm text-red-600", children: "\u0644\u0637\u0641\u0627 \u0646\u0627\u0645 \u06A9\u0627\u0631\u0628\u0631\u06CC \u062E\u0648\u062F \u0631\u0627 \u0648\u0627\u0631\u062F \u06A9\u0646\u06CC\u062F." }))] })) : (_jsxs(_Fragment, { children: [_jsxs("div", { className: "relative w-full mb-4", children: [_jsx("div", { className: "absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none", children: _jsx("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", className: "w-6 h-6", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z" }) }) }), _jsx("input", { type: "password", value: password, onInput: onChangePassword, id: "input-group-2", className: `${!submitted && !password
                                            ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                                            : "border-gray-300 focus:border-blue-500"} ltr placeholder:text-center w-full bg-gray-50 border text-gray-900 text-sm focus:ring-blue-500 mr-1 focus:border-blue-500 block pr-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 pl-12 rounded`, placeholder: "\u0631\u0645\u0632 \u0639\u0628\u0648\u0631" })] }), !submitted && !password && (_jsx("p", { className: "pr-2 mb-3 text-sm text-red-600", children: "\u0644\u0637\u0641\u0627 \u0631\u0645\u0632 \u0639\u0628\u0648\u0631 \u062E\u0648\u062F \u0631\u0627 \u0648\u0627\u0631\u062F \u06A9\u0646\u06CC\u062F." })), _jsxs(Link, { to: "otp", className: "flex items-center mb-4 text-blue-500", children: [_jsx("p", { children: "\u0648\u0631\u0648\u062F \u0628\u0627 \u0631\u0645\u0632 \u06CC\u06A9\u0628\u0627\u0631 \u0645\u0635\u0631\u0641" }), _jsx("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", className: "w-4 h-4", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M15.75 19.5 8.25 12l7.5-7.5" }) })] })] })), _jsx("div", { className: "w-full mr-1", children: _jsx(KButton, { className: "!w-full", type: "submit", color: "primary", disabled: isPending, children: isPending ? _jsx(KSpinner, {}) : "ورود" }) })] }), errors && _jsx("p", { className: "pr-2 text-sm text-red-600", children: errors.message }), _jsxs("div", { className: "flex flex-wrap items-center justify-center gap-2 mt-6", children: [_jsx("p", { children: "\u062D\u0633\u0627\u0628 \u06A9\u0627\u0631\u0628\u0631\u06CC \u0646\u062F\u0627\u0631\u06CC\u062F\u061F \u062B\u0628\u062A \u0646\u0627\u0645 \u06A9\u0646\u06CC\u062F: " }), _jsx(Link, { to: "signup", className: "w-full xs:w-auto", children: _jsx(KButton, { color: "primary", className: "justify-center", children: "\u0627\u06CC\u062C\u0627\u062F \u062D\u0633\u0627\u0628 \u06A9\u0627\u0631\u0628\u0631\u06CC" }) })] })] }));
};
export default UsernameLoginPage;
