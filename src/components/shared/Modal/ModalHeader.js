import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useModalContext } from "./ModalContext";
const KModalHeader = ({ children, color = "primary", withClose = true, }) => {
    const { onClose } = useModalContext();
    const classNames = {
        primary: "bg-cyan-800",
        warning: "bg-gray-300",
    };
    return (_jsxs("div", { className: `border-b text-lg flex justify-between px-6 py-4 text-white rounded-t-md -m-[1px] ${classNames[color]}`, children: [_jsx("div", { children: children }), withClose && (_jsx("button", { type: "button", onClick: onClose, children: _jsx("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", className: "w-6 h-6", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" }) }) }))] }));
};
export default KModalHeader;
