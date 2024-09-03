import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import CircularProgress from '../shared/CircularProgress';
const InfoSidebar = ({ links, activeIndex, progress, onLinkClick, }) => {
    const handleLinkClick = (index) => {
        onLinkClick(index);
    };
    return (_jsxs("div", { className: "p-4 bg-white rounded-lg", children: [_jsx("div", { className: "mb-5", children: _jsx(CircularProgress, { progress: progress }) }), links.map((link, index) => (_jsx("div", { className: `flex items-center justify-center 
            font-bold ${activeIndex === index
                    ? "text-cyan-500 border-cyan-500 border-b-4 md:border-b-0 md:border-r-4 rounded"
                    : "text-gray-600 border-b-0 border-transparent"} 
            transition-colors duration-300 ease-in-out mt-3 p-3 m-1 cursor-pointer text-lg md:text-xl hover:text-cyan-500 hover:bg-gray-100 rounded`, onClick: () => handleLinkClick(index), children: _jsx("span", { className: "sm:text-center md:text-right", children: link.title }) }, index)))] }));
};
export default InfoSidebar;
