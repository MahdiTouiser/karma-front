import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { forwardRef } from "react";
const KSelect = forwardRef((props, ref) => {
    const { invalid, className, placeholder, children, ...rest } = props;
    return (_jsxs("select", { ...rest, ref: ref, className: `${invalid ? "border-red-500 focus:ring-red-500 focus:border-red-500" : "border-gray-300 focus:border-blue-500"} ${className || ""} placeholder:text-right w-full h-10 bg-gray-50 border text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block p-2.5 disabled:text-gray-400 disabled:cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`, children: [placeholder && _jsx("option", { value: "", disabled: true, children: placeholder }), children] }));
});
export default KSelect;
