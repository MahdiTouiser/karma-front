import { jsx as _jsx } from "react/jsx-runtime";
const KCard = ({ children, className, withPadding = true, ...rest }) => {
    return (_jsx("div", { ...rest, className: `${className || ''} block ${withPadding ? 'p-6' : ''} bg-white rounded-lg shadow-md dark:bg-gray-800`, children: children }));
};
export default KCard;
