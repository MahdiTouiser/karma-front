import { jsx as _jsx } from "react/jsx-runtime";
const HamburgerButton = (props) => {
    return (_jsx("button", { onClick: props.toggleMenu, className: "mr-5", children: _jsx("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", className: `${props.className || ''}  w-10 h-10`, children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" }) }) }));
};
export default HamburgerButton;
