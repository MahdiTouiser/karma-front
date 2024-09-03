import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from 'react-router-dom';
import KCard from '../../shared/Card';
const UserSamples = ({ workSamples }) => {
    return (_jsxs(KCard, { className: 'flex flex-col justify-between w-full', children: [_jsx("h1", { className: 'text-xl font-extrabold', children: "\u0646\u0645\u0648\u0646\u0647 \u06A9\u0627\u0631\u0647\u0627" }), _jsx("div", { className: "mt-5", children: workSamples.length > 0 ? (workSamples.map((sample, index) => (_jsx("div", { className: "mb-3", children: _jsx("div", { className: "flex items-center justify-between bg-gray-200 rounded px-2 py-1 ltr", children: _jsxs(Link, { to: sample.link, target: '_blank', className: 'flex items-center', children: [_jsx("p", { className: 'text-blue-500 text-sm', children: sample.title }), " "] }) }) }, index)))) : (_jsx("p", { children: "\u0647\u06CC\u0686 \u0646\u0645\u0648\u0646\u0647 \u06A9\u0627\u0631\u06CC \u0648\u062C\u0648\u062F \u0646\u062F\u0627\u0631\u062F" })) })] }));
};
export default UserSamples;
