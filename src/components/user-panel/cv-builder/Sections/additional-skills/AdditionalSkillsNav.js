import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import KButton from '../../../../shared/Button';
import AdditionalSkills from './additional-skills/AdditionalSkills';
import Languages from './languages/Languages';
import SoftwareSkills from './software-skills/SoftwareSkills';
const AdditionalSkillsNav = (props) => {
    const { goToPreviousStep, onSubmitSuccess } = props;
    return (_jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-bold", children: "\u0645\u0647\u0627\u0631\u062A \u0647\u0627\u06CC \u062A\u06A9\u0645\u06CC\u0644\u06CC" }), _jsxs("div", { className: 'mt-10 p-5', children: [_jsx("div", { children: _jsx(Languages, {}) }), _jsx("div", { className: 'mt-5', children: _jsx(SoftwareSkills, {}) }), _jsx("div", { className: 'mt-5', children: _jsx(AdditionalSkills, {}) })] }), _jsxs("div", { className: 'flex justify-end p-2', children: [_jsx(KButton, { color: 'secondary', className: 'ml-4', onClick: goToPreviousStep, children: "\u0645\u0631\u062D\u0644\u0647 \u0642\u0628\u0644\u06CC" }), _jsx(KButton, { color: 'primary', type: "button", onClick: () => onSubmitSuccess(), children: "\u0646\u0647\u0627\u06CC\u06CC \u0633\u0627\u0632\u06CC" })] })] }));
};
export default AdditionalSkillsNav;
