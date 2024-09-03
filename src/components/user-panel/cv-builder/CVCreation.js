import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import KCard from '../../shared/Card';
import InfoSidebar from '../InfoSidebar';
import AdditionalSkills from './sections/additional-skills/AdditionalSkillsNav';
import EducationalBackground from './sections/educational-background/EducationalBackground';
import InitialInformation from './sections/InitialInformation';
import WorkExperience from './sections/work-experience/WorkExperience';
const CVCreation = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const progressValues = [0, 30, 60, 90];
    const navigate = useNavigate();
    const handleFormSubmitSuccess = () => {
        setActiveIndex((prevIndex) => Math.min(prevIndex + 1, links.length - 1));
    };
    const finalizeForm = () => {
        navigate('/cv-builder/finalize');
    };
    const handleLinkClick = (index) => {
        setActiveIndex(index);
    };
    const goToPreviousStep = () => {
        setActiveIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    };
    const links = [
        { title: "اطلاعات اولیه", component: _jsx(InitialInformation, { onSubmitSuccess: handleFormSubmitSuccess }) },
        { title: "سوابق تحصیلی", component: _jsx(EducationalBackground, { goToPreviousStep: goToPreviousStep, onSubmitSuccess: handleFormSubmitSuccess }) },
        { title: "سوابق شغلی", component: _jsx(WorkExperience, { goToPreviousStep: goToPreviousStep, onSubmitSuccess: handleFormSubmitSuccess }) },
        { title: "مهارت های تکمیلی", component: _jsx(AdditionalSkills, { goToPreviousStep: goToPreviousStep, onSubmitSuccess: finalizeForm }) },
    ];
    return (_jsxs("div", { className: "flex flex-col md:flex-row", children: [_jsx(KCard, { withPadding: false, className: "w-full overflow-y-auto md:w-1/4 lg:w-1/6 md:h-screen md:m-1", children: _jsx(InfoSidebar, { links: links, activeIndex: activeIndex, progress: progressValues[activeIndex], onLinkClick: handleLinkClick }) }), _jsx("div", { className: "flex-1 p-4 overflow-auto lg:p-10", children: links[activeIndex].component })] }));
};
export default CVCreation;
