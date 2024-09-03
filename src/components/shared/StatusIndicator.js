import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const StatusIndicator = ({ isActive }) => {
    const getStatusClass = () => {
        if (isActive) {
            return 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-300';
        }
        else {
            return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
        }
    };
    const getStatusText = () => {
        return isActive ? 'فعال' : 'غیر فعال';
    };
    return (_jsx("ul", { role: "list", className: `max-w-sm divide-y divide-gray-200 dark:divide-gray-700 ${getStatusClass()}`, children: _jsx("li", { className: "py-2", children: _jsx("div", { className: "flex items-center space-x-3", children: _jsxs("span", { className: "inline-flex items-center text-xs font-medium mr-2 px-3 py-1 rounded-full", children: [_jsx("span", { className: `w-3 h-3 mr-1 rounded-full ml-2 ${isActive ? 'bg-cyan-500' : 'bg-red-500'}` }), getStatusText()] }) }) }) }));
};
export default StatusIndicator;
