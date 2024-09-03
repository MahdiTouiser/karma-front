import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { forwardRef, } from 'react';
const KRadioButton = forwardRef(({ options, selectedOption, onOptionChange, register }, ref) => {
    const handleChange = (e) => {
        onOptionChange(e.target.value);
        register.onChange?.(e);
    };
    const { onChange, ...restRegister } = register;
    return (_jsxs("div", { className: "flow-root bg-white border border-gray-300 rounded-md", children: [_jsx("div", { className: "relative z-10 lg:hidden", children: _jsx("select", { className: "block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500", value: selectedOption, onChange: handleChange, ...restRegister, children: options.map(option => (_jsx("option", { value: option.value, children: option.label }, option.value))) }) }), _jsx("div", { className: "hidden w-full lg:flex lg:flex-row", children: options.map((option) => (_jsxs("label", { className: `cursor-pointer flex-1 p-2 inline-flex items-center justify-center text-sm font-medium text-black relative ${selectedOption === option.value
                        ? "text-cyan-600 border-b-2 border-cyan-600 bg-cyan-100"
                        : ""}`, children: [_jsx("input", { type: "radio", value: option.value, checked: selectedOption === option.value, onChange: handleChange, className: "sr-only", ...restRegister, ref: ref }), _jsx("span", { className: "flex-1 text-center", children: option.label }), selectedOption === option.value && (_jsx("span", { className: "absolute bottom-0 left-0 w-full h-0.5 bg-cyan-600" }))] }, option.value))) })] }));
});
export default KRadioButton;
