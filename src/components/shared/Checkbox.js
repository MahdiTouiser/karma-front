import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Checkbox, Label } from "flowbite-react";
const KCheckbox = (props) => {
    const handleChange = (event) => {
        props.onChange(event.target.checked);
    };
    return (_jsx("div", { className: "flex max-w-md flex-col gap-4", id: "checkbox", children: _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Checkbox, { id: "accept", onChange: handleChange, checked: props.checked, className: "focus:ring-0 focus:ring-offset-0 text-cyan-500" }), _jsx(Label, { className: "flex", children: props.content })] }) }));
};
export default KCheckbox;
