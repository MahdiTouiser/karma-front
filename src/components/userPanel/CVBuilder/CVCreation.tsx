import React, { useState } from 'react';
import KCard from '../../shared/Card';
import SignupSidebar from '../SignupSidebar';
import AdditionalSkills from './Sections/AdditionalSkills';
import EducationalBackground from './Sections/EducationalBackground';
import InitialInformation from './Sections/InitialInformation';
import WorkExperience from './Sections/WorkExperience';

const CVCreation: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState<number>(0);

    const links = [
        { title: "اطلاعات اولیه", component: <InitialInformation /> },
        { title: "سوابق تحصیلی", component: <EducationalBackground /> },
        { title: "سوابق شغلی", component: <WorkExperience /> },
        { title: "مهارت های تکمیلی", component: <AdditionalSkills /> },
    ];

    const handleLinkClick = (index: number) => {
        setActiveIndex(index);
    };

    return (
        <div className="flex">
            <KCard withPadding={false} className="w-1/4 h-screen m-5">
                <SignupSidebar links={links} activeIndex={activeIndex} onLinkClick={handleLinkClick} />
            </KCard>
            <div className="flex-1 p-10">
                {links[activeIndex].component}
            </div>
        </div>
    );
};

export default CVCreation;
