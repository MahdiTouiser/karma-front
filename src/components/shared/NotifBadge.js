import { jsx as _jsx } from "react/jsx-runtime";
const NotifBadge = ({ value, className = '', }) => {
    return (_jsx("div", { className: `${className} bg-red-500 text-white rounded-full w-5 h-5 text-sm flex items-center justify-center  shadow`, children: value }));
};
export default NotifBadge;
