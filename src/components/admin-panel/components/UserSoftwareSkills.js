import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { skillLevelLabels, } from '../../../models/enums';
import KCard from '../../shared/Card';
const UserSoftwareSkills = ({ softwareSkills }) => {
    return (_jsxs(KCard, { className: 'flex flex-col justify-between w-full', children: [_jsx("h1", { className: 'text-xl font-extrabold', children: "\u0645\u0647\u0627\u0631\u062A \u0647\u0627\u06CC \u0646\u0631\u0645 \u0627\u0641\u0632\u0627\u0631\u06CC" }), _jsx("div", { className: "grid grid-cols-3 gap-2 mt-5", children: softwareSkills.map((info) => (_jsx("div", { className: "flex items-center justify-center px-2 py-1 bg-gray-200 rounded", children: _jsxs("p", { className: 'text-black text-sm flex-1 text-center', children: [info.SoftwareSkill.title, " | ", skillLevelLabels[info.softwareSkillLevel]] }) }, info.id))) })] }));
};
export default UserSoftwareSkills;
