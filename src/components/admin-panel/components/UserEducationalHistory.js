import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { DegreeLevelDescriptions } from '../../../models/enums';
import KCard from '../../shared/Card';
const UserEducationalHistory = ({ educationalData }) => {
    const sortedRecords = [...educationalData].sort((a, b) => a.fromYear - b.fromYear);
    return (_jsxs(KCard, { className: 'flex flex-col justify-between w-full', children: [_jsx("div", { className: "flex items-center justify-between", children: _jsx("h1", { className: 'text-xl font-extrabold', children: "\u0633\u0648\u0627\u0628\u0642 \u062A\u062D\u0635\u06CC\u0644\u06CC" }) }), _jsx("div", { className: "flex flex-col mt-5", children: sortedRecords.map((info, index) => (_jsx("div", { className: "flex items-center p-5 mt-6 mr-4 text-gray-600 border-l-2 border-blue-500 bg-gray-50", children: _jsxs("div", { className: "pl-2 mr-4", children: [_jsxs("p", { className: 'font-extrabold text-black', children: [DegreeLevelDescriptions[info.degreeLevel], " - ", info.major.title] }), _jsx("p", { className: 'mt-4', children: info.university.title }), _jsx("p", { className: 'mt-4', children: `${info.fromYear} - ${info.toYear}` })] }) }, index))) })] }));
};
export default UserEducationalHistory;
