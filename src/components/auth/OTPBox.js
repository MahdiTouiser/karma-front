import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import OtpInput from "react-otp-input";
import Timer from "../shared/Timer";
const OTPBox = (props) => {
    const phone = `${props.phone.slice(0, -7)}*****${props.phone.slice(-2)}`;
    const [code, setCode] = useState("");
    const [canRefresh, setCanRefresh] = useState(false);
    function renderInput(props) {
        return (_jsx("input", { ...props, className: `ltr text-2xl !w-1/6 !max-w-[3rem] h-14 border-gray-300 focus:border-blue-500 placeholder:text-right  bg-gray-50 border  text-gray-900  rounded-md focus:ring-blue-500  block   dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ` }));
    }
    function handleChange(value) {
        setCode(value);
        if (value.length === props.codeLength) {
            props.onFinish(value);
        }
    }
    function onTimerEnd() {
        setCanRefresh(true);
    }
    function handleRefresh() {
        setCode("");
        props.onRefresh().then(() => {
            setCanRefresh(false);
        });
    }
    return (_jsxs("div", { children: [_jsxs("p", { className: "mb-6 text-lg font-semibold flex justify-center", children: ["\u06A9\u062F \u0641\u0631\u0633\u062A\u0627\u062F\u0647 \u0634\u062F\u0647 \u0628\u0631\u0627\u06CC ", _jsxs("span", { dir: "auto", children: ["(", phone, ")"] }), " \u0631\u0627 \u0648\u0627\u0631\u062F \u06A9\u0646\u06CC\u062F."] }), _jsxs("div", { className: "flex flex-col items-center", children: [_jsx(OtpInput, { value: code, onChange: handleChange, numInputs: props.codeLength, renderSeparator: _jsx("span", { className: "p-1" }), renderInput: renderInput, containerStyle: "ltr justify-center w-full mb-3", shouldAutoFocus: true, inputType: "number" }), _jsx("div", { className: "text-sm", children: canRefresh ? (_jsx("button", { className: "text-primary2", type: "button", onClick: handleRefresh, children: "\u0627\u0631\u0633\u0627\u0644 \u0645\u062C\u062F\u062F" })) : (_jsx(Timer, { durationSeconds: props.durationSeconds, onEnd: onTimerEnd })) })] })] }));
};
export default OTPBox;
