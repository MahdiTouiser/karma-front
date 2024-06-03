import React, { useState } from 'react';
import KCard from '../../shared/Card';
import InfoSidebar from '../InfoSidebar';
import InitialInformation from './sections/InitialInformation';
import AdditionalSkills from './sections/additional-skills/AdditionalSkills';
import EducationalBackground from './sections/educational-background/EducationalBackground';
import WorkExperience from './sections/work-experience/WorkExperience';

const CVCreation: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const progressValues = [0, 30, 60, 90];

    const handleFormSubmitSuccess = () => {
        setActiveIndex((prevIndex) => Math.min(prevIndex + 1, links.length - 1));
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
        { title: "مهارت های تکمیلی", component: <AdditionalSkills /> },
    ];

    return (
        <div className="flex">
            <KCard withPadding={false} className="w-1/6 min-h-screen m-2">
                <InfoSidebar
                    links={links}
                    activeIndex={activeIndex}
                    progress={progressValues[activeIndex]}
                    onLinkClick={handleLinkClick}
                />
            </KCard>
            <div className="flex-1 p-10">
                {links[activeIndex].component}
            </div>
        </div>
    );
};

export default CVCreation;
