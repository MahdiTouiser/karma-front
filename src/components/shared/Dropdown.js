import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
const KDropdown = ({ items, children, buttonClassName, chevronClassName, withChevron = true, }) => {
    const [show, setShow] = useState(false);
    const menuRef = useRef(null);
    const containerRef = useRef(null);
    const buttonRef = useRef(null);
    function toggleShow() {
        // event.stopPropagation();
        setShow((show) => !show);
    }
    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current &&
                !menuRef.current.contains(event.target) &&
                !buttonRef.current?.contains(event.target)) {
                setShow(false);
            }
        }
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);
    useEffect(() => {
        function calculateMenuRect() {
            if (menuRef.current && containerRef.current) {
                const list = menuRef.current.querySelector("ul");
                const height = list.offsetHeight;
                menuRef.current.style.height = `${height}px`;
                const containerRect = containerRef.current.getBoundingClientRect();
                const windowHeight = window.innerHeight;
                const offset = 40;
                let topOffset = containerRect.top + offset;
                const isOverflow = topOffset + height > windowHeight;
                if (isOverflow) {
                    topOffset = containerRect.top - height + offset;
                }
                menuRef.current.style.top = `${topOffset}px`;
                menuRef.current.style.left = `${containerRect.left}px`;
            }
        }
        if (show) {
            calculateMenuRect();
        }
    }, [show]);
    return (_jsxs("div", { className: "relative", ref: containerRef, children: [_jsxs("button", { onClick: toggleShow, id: "dropdownDividerButton", "data-dropdown-toggle": "dropdownDivider", className: `${buttonClassName || ""} font-medium rounded-lg  px-4 py-2.5 text-center inline-flex items-center  h-[40px]`, type: "button", ref: buttonRef, children: [children, withChevron && (_jsx("svg", { className: `${chevronClassName || ""} w-4 h-4 mr-2`, "aria-hidden": "true", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M19 9l-7 7-7-7" }) }))] }), _jsx("div", { id: "dropdownDivider", className: `${!show && "hidden"} z-20 fixed top-[43px] left-0 inset-y-1 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600 overflow-y-auto`, ref: menuRef, children: _jsx("ul", { className: "py-2 text-sm rounded-sm text-gray-700 dark:text-gray-200", "aria-labelledby": "dropdownDividerButton", children: items.map((item, index) => {
                        return (_jsx(KDropDownItem, { handleLiClick: () => setShow(false), ...item }, index));
                    }) }) })] }));
};
export const KDropDownItem = ({ handleLiClick, onClick, mode = "Link", href, title, icon, disabled = false, }) => {
    return (_jsx("li", { onClick: handleLiClick, className: `${!disabled
            ? " hover:bg-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
            : "opacity-70"} block  `, children: mode === "Link" ? (_jsx(Link, { to: href || "", onClick: (event) => disabled && event.preventDefault(), children: _jsxs("div", { className: "flex gap-2 items-center px-4 py-3", children: [icon ? icon : "", title] }) })) : (_jsxs("button", { className: "flex gap-2 items-center px-4 py-3 w-full", onClick: onClick, disabled: disabled, children: [icon ? icon : "", title] })) }));
};
export default KDropdown;
