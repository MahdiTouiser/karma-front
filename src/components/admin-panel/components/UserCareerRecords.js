import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import KCard from '../../shared/Card';
const UserCareerBackground = ({ careerRecords }) => {
    const sortedRecords = [...careerRecords].sort((a, b) => a.fromYear - b.fromYear);
    return (_jsx(_Fragment, { children: _jsxs(KCard, { className: 'flex flex-col justify-between w-full', children: [_jsx("div", { className: "flex items-center justify-between", children: _jsx("h1", { className: 'text-xl font-extrabold', children: "\u0633\u0648\u0627\u0628\u0642 \u0634\u063A\u0644\u06CC" }) }), _jsx("div", { className: "flex flex-col mt-5", children: sortedRecords.length === 0 ? (_jsx("p", { className: 'text-gray-600', children: "\u0633\u0627\u0628\u0642\u0647 \u0634\u063A\u0644\u06CC \u0648\u062C\u0648\u062F \u0646\u062F\u0627\u0631\u062F" })) : (sortedRecords.map((info) => (_jsx("div", { className: "flex items-center mr-4 mt-6 text-gray-600 border-l-2 border-blue-500 bg-gray-50 p-5", children: _jsxs("div", { className: "pl-2 mr-4", children: [_jsx("p", { className: 'text-black font-extrabold', children: info.jobTitle }), _jsx("p", { className: 'mt-4', children: info.companyName }), _jsx("p", { className: 'mt-4', children: `${info.fromYear} - ${info.toYear ? info.toYear : 'تا کنون'}` })] }) }, info.id)))) })] }) }));
};
export default UserCareerBackground;
