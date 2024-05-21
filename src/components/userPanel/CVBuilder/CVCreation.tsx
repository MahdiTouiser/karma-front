import React, { useState } from 'react';
import KCard from '../../shared/Card';
import InfoSidebar from '../InfoSidebar';
import AdditionalSkills from './Sections/AdditionalSkills';
import EducationalBackground from './Sections/EducationalBackground';
import InitialInformation from './Sections/InitialInformation';
import WorkExperience from './Sections/WorkExperience';

const CVCreation: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const progressValues = [0, 30, 60, 90];

    const handleFormSubmitSuccess = () => {
        setActiveIndex(1);
    };

    const links = [
        { title: "اطلاعات اولیه", component: <InitialInformation onSubmitSuccess={handleFormSubmitSuccess} /> },
        { title: "سوابق تحصیلی", component: <EducationalBackground /> },
        { title: "سوابق شغلی", component: <WorkExperience /> },
        { title: "مهارت های تکمیلی", component: <AdditionalSkills /> },
    ];

    return (
        <div className="flex">
            <KCard withPadding={false} className="w-1/4 h-screen m-5">
                <InfoSidebar
                    links={links}
                    activeIndex={activeIndex}
                    progress={progressValues[activeIndex]}
                />
            </KCard>
            <div className="flex-1 p-10">
                {links[activeIndex].component}
            </div>
        </div>
    );
};

export default CVCreation;