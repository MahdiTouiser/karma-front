import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { Controller, } from "react-hook-form";
import KTextInput from "./TextInput";
const ThousandSeparatorInput = ({ control, value, allowMinus, name, onChange, required, max, min, ...otherProps }) => {
    const [innerValue, setInnerValue] = useState(value?.toLocaleString() || "");
    const convertValue = (value, allowMinus = false) => {
        let newValue = value.replace(/[^\d-]/g, "");
        if (!allowMinus) {
            newValue = newValue.replace(/^-/g, "");
        }
        return newValue;
    };
    const handleInputChange = (e) => {
        const newValue = convertValue(e.target.value, allowMinus);
        const numericValue = parseFloat(newValue);
        if (newValue === "-" || newValue === "") {
            onChange && onChange("");
            setInnerValue(newValue);
            return;
        }
        if (isNaN(numericValue)) {
            onChange && onChange("");
            setInnerValue("");
        }
        onChange && onChange(numericValue);
        const formattedValue = numericValue.toLocaleString();
        setInnerValue(formattedValue);
        // register(name).onChange({ target: { value: e.target.value } });
    };
    const shardAttrs = {
        ...otherProps,
        numeric: true,
        name: name,
        allowMinus: allowMinus,
        className: `ltr ${otherProps.className || ""}`,
    };
    const rules = {
        validate: (value) => value !== "-",
        ...(required ? { required: required } : {}),
        ...(max ? { max: max } : {}),
        ...(min ? { min: min } : {})
    };
    return control ? (_jsx(Controller, { control: control, name: name, rules: rules, render: ({ field: { onChange, value, onBlur }, fieldState: { isTouched, error }, }) => {
            return (_jsx(_Fragment, { children: _jsx(KTextInput, { ...shardAttrs, value: value?.toLocaleString() || "", onBlur: onBlur, onChange: (event) => {
                        const newValue = convertValue(event.target.value, allowMinus);
                        if (newValue === "" || newValue === "-") {
                            onChange(newValue);
                            return;
                        }
                        const numeric = +newValue;
                        onChange(isNaN(numeric) ? "" : numeric);
                    }, invalid: !!error && isTouched }) }));
        } })) : (_jsx(KTextInput, { ...shardAttrs, value: innerValue, onChange: handleInputChange, required: !!required, ...(typeof min === 'number' ? { min } : { min: min?.value } || {}), ...(typeof max === 'number' ? { max } : { max: max?.value } || {}) }));
};
export default ThousandSeparatorInput;
