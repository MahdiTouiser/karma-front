import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { skillLevelLabels, } from '../../../models/enums';
import KCard from '../../shared/Card';
const UserLanguages = ({ languages }) => {
    return (_jsxs(KCard, { className: 'flex flex-col justify-between w-full', children: [_jsx("h1", { className: 'text-xl font-extrabold', children: "\u0632\u0628\u0627\u0646 \u0647\u0627" }), _jsx("div", { className: "grid grid-cols-4 gap-2 mt-5", children: languages.map((info) => (_jsx("div", { className: "flex items-center px-2 py-1 bg-gray-200 rounded", children: _jsxs("p", { className: 'text-black text-sm', children: [info.Language.title, " | ", skillLevelLabels[info.languageLevel]] }) }, info.id))) })] }));
};
export default UserLanguages;
