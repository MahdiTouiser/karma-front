import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
const PanelShell = (props) => {
    const [isMenuOpen, setISMenuOpen] = useState(window.innerWidth > 640 ? true : false);
    function toggleMenu() {
        setISMenuOpen((open) => !open);
    }
    return (_jsxs("div", { className: "w-screen h-screen flex flex-col", children: [_jsx("header", { className: "w-full", children: _jsx(props.header, { isMenuOpen: isMenuOpen, toggleMenu: toggleMenu }) }), _jsx("div", { className: "w-full flex flex-1 relative overflow-hidden", children: _jsx("main", { className: `${props.mainContainerClassName || ''} flex-auto  overflow-auto`, children: props.children }) })] }));
};
export default PanelShell;
