import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import KButton from "../../components/shared/Button";
import KSpinner from "../../components/shared/Spinner";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import useApi from "../../hooks/useApi";
import { authActions } from "../../store/auth";
import { replacePersianArabicsNumbers } from "../../utils/shared";
const EmployerLoginPage = () => {
    const username = useAppSelector((state) => state.auth.enteredUsername);
    const dispatch = useAppDispatch();
    const [submitted, setSubmitted] = useState(false);
    const navigate = useNavigate();
    const { sendRequest, errors, isPending } = useApi();
    const onChangeUsername = (event) => {
        const input = replacePersianArabicsNumbers(event.currentTarget.value);
        dispatch(authActions.setUsername(input));
    };
    const onSubmit = async (event) => {
        event.preventDefault();
        setSubmitted(true);
        if (!username)
            return;
        try {
            await sendRequest({
                url: `/Users/CheckUserExistence/${username}`,
            });
            () => navigate("password", { state: { username } });
        }
        catch (error) {
            console.error("Error:", error);
        }
    };
    return (_jsxs("form", { onSubmit: onSubmit, className: "p-8", children: [_jsx("h1", { className: "mb-6 text-lg font-semibold flex justify-center", children: "\u0648\u0631\u0648\u062F \u06A9\u0627\u0631\u0641\u0631\u0645\u0627" }), _jsxs("div", { className: "flex w-full gap-1 flex-wrap sm:flex-nowrap", children: [_jsxs("div", { className: "relative w-full mb-0", children: [_jsx("div", { className: "absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none", children: _jsx("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", className: "w-6 h-6 fill-gray-950", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" }) }) }), _jsx("input", { type: "text", value: username, onInput: onChangeUsername, id: "input-group-1", className: `${submitted && !username
                                    ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                                    : "border-gray-300 focus:border-blue-500"} ltr  placeholder:text-right w-full bg-gray-50 border  text-gray-900 text-sm focus:ring-blue-500 mr-1 focus:border-blue-500 block pr-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 pl-36 rounded`, placeholder: "\u0646\u0627\u0645 \u06A9\u0627\u0631\u0628\u0631\u06CC \u06CC\u0627 \u0634\u0645\u0627\u0631\u0647 \u0645\u0648\u0628\u0627\u06CC\u0644" }), _jsxs("div", { className: "absolute left-0 h-10 top-1 py-1 w-28", children: [_jsx("div", { className: "bg-gray-300 h-4/5 top-0.5 absolute -right-4 w-px" }), _jsx(Link, { className: "text-primary text-sm mr-2", to: "forget-password", children: "\u0641\u0631\u0627\u0645\u0648\u0634 \u06A9\u0631\u062F\u06CC\u062F\u061F" })] })] }), _jsx("div", { className: "w-full sm:w-auto mt-2 mr-2 sm:mt-0", children: _jsxs(KButton, { className: "w-full", type: "submit", color: "primary", disabled: isPending, children: [isPending && _jsx(KSpinner, {}), "\u0648\u0631\u0648\u062F"] }) })] }), submitted && !username && (_jsx("p", { className: "text-red-600 text-sm pr-2", children: "\u0644\u0637\u0641\u0627 \u0646\u0627\u0645 \u06A9\u0627\u0631\u0628\u0631\u06CC \u062E\u0648\u062F \u0631\u0627 \u0648\u0627\u0631\u062F \u06A9\u0646\u06CC\u062F." })), errors && _jsx("p", { className: "text-red-600 text-sm pr-2", children: errors.message }), _jsxs("div", { className: "flex flex-wrap items-center gap-2 mt-6  ", children: [_jsx("p", { children: "\u062D\u0633\u0627\u0628 \u06A9\u0627\u0631\u0628\u0631\u06CC \u0646\u062F\u0627\u0631\u06CC\u062F\u061F \u062B\u0628\u062A \u0646\u0627\u0645 \u06A9\u0646\u06CC\u062F: " }), _jsx(Link, { to: "signup", className: "w-full xs:w-auto", children: _jsx(KButton, { color: "primary", className: "w-full", children: "\u0627\u06CC\u062C\u0627\u062F \u062D\u0633\u0627\u0628 \u06A9\u0627\u0631\u0628\u0631\u06CC" }) })] })] }));
};
export default EmployerLoginPage;
