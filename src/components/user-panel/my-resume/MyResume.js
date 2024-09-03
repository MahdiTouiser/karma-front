import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import AboutMe from './about-me/AboutMe';
import BasicInfo from './basic-info/BasicInfo';
import CareerBackground from './career-background/CareerBackground';
import EducationalHistory from './educational-history.tsx/EducationalHistory';
import Languages from './Languages';
import PersonalResume from './PersonalResume';
import Samples from './samples/Samples';
import SoftwareSkills from './SoftwareSkills';
const MyResume = () => {
    return (_jsxs("div", { className: 'flex flex-col md:flex-row py-16', children: [_jsxs("div", { className: 'flex flex-col w-full md:w-3/5 px-4 md:px-8', children: [_jsx("div", { children: _jsx(AboutMe, {}) }), _jsx("div", { className: 'mt-6', children: _jsx(BasicInfo, {}) }), _jsx("div", { className: 'mt-6', children: _jsx(EducationalHistory, {}) }), _jsx("div", { className: 'mt-6', children: _jsx(CareerBackground, {}) }), _jsx("div", { className: 'mt-6', children: _jsx(Languages, {}) }), _jsx("div", { className: 'mt-6', children: _jsx(SoftwareSkills, {}) })] }), _jsxs("div", { className: 'flex flex-col w-full md:w-2/5 px-4 md:px-8 mt-6 md:mt-0', children: [_jsx("div", { children: _jsx(PersonalResume, {}) }), _jsx("div", { className: 'mt-6', children: _jsx(Samples, {}) })] })] }));
};
export default MyResume;
