import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import KCard from '../../shared/Card';
import InfoSidebar from '../InfoSidebar';
import AdditionalSkills from './sections/additional-skills/AdditionalSkillsNav';
import EducationalBackground from './sections/educational-background/EducationalBackground';
import InitialInformation from './sections/InitialInformation';
import WorkExperience from './sections/work-experience/WorkExperience';

const CVCreation: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const progressValues = [0, 30, 60, 90];
    const navigate = useNavigate();

    const handleFormSubmitSuccess = () => {
        setActiveIndex((prevIndex) => Math.min(prevIndex + 1, links.length - 1));
    };

    const finalizeForm = () => {
        navigate('/cv-builder/finalize');
    };

    const handleLinkClick = (index: number) => {
        setActiveIndex(index);
    };

    const goToPreviousStep = () => {
        setActiveIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    };

    const links = [
        { title: "اطلاعات اولیه", component: <InitialInformation onSubmitSuccess={handleFormSubmitSuccess} /> },
        { title: "سوابق تحصیلی", component: <EducationalBackground goToPreviousStep={goToPreviousStep} onSubmitSuccess={handleFormSubmitSuccess} /> },
        { title: "سوابق شغلی", component: <WorkExperience goToPreviousStep={goToPreviousStep} onSubmitSuccess={handleFormSubmitSuccess} /> },
        { title: "مهارت های تکمیلی", component: <AdditionalSkills goToPreviousStep={goToPreviousStep} onSubmitSuccess={finalizeForm} /> },
    ];

    return (
        <div className="flex flex-col md:flex-row">
            <KCard
                withPadding={false}
                className="w-full md:w-1/4 md:h-screen m-0 md:m-1">
                <InfoSidebar
                    links={links}
                    activeIndex={activeIndex}
                    progress={progressValues[activeIndex]}
                    onLinkClick={handleLinkClick}
                />
            </KCard>
            <div className="flex-1 p-4 lg:p-10 lg:max-h-screen">
                {links[activeIndex].component}
            </div>
        </div>
    );
};

export default CVCreation;