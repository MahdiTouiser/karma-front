import { jsx as _jsx } from "react/jsx-runtime";
const NumberWithSeperator = ({ value }) => {
    const formattedNumber = value.toLocaleString();
    return (_jsx("span", { className: "ltr inline-block", children: formattedNumber }));
};
export default NumberWithSeperator;
