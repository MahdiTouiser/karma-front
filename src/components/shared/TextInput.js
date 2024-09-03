import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { forwardRef, } from 'react';
import { replacePersianArabicsNumbers } from '../../utils/shared';
import KButton from './Button';
import KSpinner from './Spinner';
const KTextInput = forwardRef((props, ref) => {
    const inputProps = { ...props };
    delete inputProps.invalid;
    delete inputProps.numeric;
    delete inputProps.allowMinus;
    delete inputProps.magnifier;
    delete inputProps.className;
    delete inputProps.isPending;
    delete inputProps.allowDecimal;
    const inputHandler = (event) => {
        let value = event.target.value;
        value = replacePersianArabicsNumbers(value);
        if (props.numeric) {
            if (!props.allowMinus) {
                value = value.replace(/[^0-9.]/g, "");
            }
            else {
                value = value.replace(/[^0-9.-]/g, "");
                value = value.replace(/--/g, "-");
            }
            if (props.allowDecimal && !value.includes('.')) {
                if (value.length === 2) {
                    value = value.slice(0, 2) + '.' + value.slice(2);
                }
            }
            if (value.startsWith("-")) {
                value = "-" + value.replace(/-/g, "");
            }
            if (value && !isNaN(Number(value))) {
                event.target.value = props.allowDecimal ? parseFloat(value).toString() : parseInt(value).toString();
            }
        }
    };
    return (_jsxs("div", { className: "relative", children: [_jsx("input", { ...inputProps, id: props.id, onInput: inputProps.onInput ? inputProps.onInput : inputHandler, ref: ref, className: `${props.invalid
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:border-blue-500"} ${props.className || ""} block h-10 w-full rounded-sm border  bg-gray-50 p-2.5 text-sm text-gray-900 placeholder:text-gray-300 placeholder:text-right focus:border-blue-500  focus:ring-blue-500 disabled:cursor-not-allowed disabled:text-gray-400  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500` }), props.isPending ? (_jsx("div", { className: "absolute inset-y-0 flex items-center pr-3 left-1", children: _jsx(KSpinner, {}) })) : (props.magnifier && (_jsx("div", { className: "absolute inset-y-0 flex items-center pr-3 left-1", children: _jsx(KButton, { className: "!h-8 w-8 bg-white font-extrabold  hover:bg-gray-300", onClick: props.onButtonClick, children: _jsx("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", className: "w-8 h-8 stroke-cyan-500", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M15.75 15.75l-2.489-2.489m0 0a3.375 3.375 0 10-4.773-4.773 3.375 3.375 0 004.774 4.774zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" }) }) }) })))] }));
});
export default KTextInput;
