import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate } from "react-router-dom";
const BackButton = () => {
    const navigate = useNavigate();
    function handleClick() {
        navigate(-1);
    }
    return (_jsxs("button", { onClick: handleClick, className: "pt-8 pr-8 flex", children: [_jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "currentColor", className: "w-6 h-6", children: _jsx("path", { fillRule: "evenodd", d: "M16.72 7.72a.75.75 0 011.06 0l3.75 3.75a.75.75 0 010 1.06l-3.75 3.75a.75.75 0 11-1.06-1.06l2.47-2.47H3a.75.75 0 010-1.5h16.19l-2.47-2.47a.75.75 0 010-1.06z", clipRule: "evenodd" }) }), _jsx("span", { children: "\u0628\u0627\u0632\u06AF\u0634\u062A" })] }));
};
export default BackButton;
