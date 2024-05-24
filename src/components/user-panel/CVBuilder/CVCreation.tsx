import React, { useState } from 'react';
import useAPi from '../../../hooks/useApi';
import { BaseResponse } from '../../../models/shared.models';
import KButton from '../../shared/Button';
import KCard from '../../shared/Card';
import KSpinner from '../../shared/Spinner';
import InfoSidebar from '../InfoSidebar';
import AdditionalSkills from './Sections/AdditionalSkills/AdditionalSkills';
import EducationalBackground from './Sections/EducationalBackground/EducationalBackground';
import InitialInformation from './Sections/InitialInformation';
import WorkExperience from './Sections/WorkExperience';

const CVCreation: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const progressValues = [0, 30, 60, 90];

    const handleFormSubmitSuccess = () => {
        setActiveIndex((prevIndex) => Math.min(prevIndex + 1, links.length - 1));
    };

    const handleLinkClick = (index: number) => {
        setActiveIndex(index);
    };

    const handlePreviousClick = () => {
        setActiveIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    };

    const { isPending } = useAPi<null, BaseResponse<null>>();

    const links = [
        { title: "اطلاعات اولیه", component: <InitialInformation onSubmitSuccess={handleFormSubmitSuccess} /> },
        { title: "سوابق تحصیلی", component: <EducationalBackground /> },
        { title: "سوابق شغلی", component: <WorkExperience /> },
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
                <div className='flex justify-end p-5'>
                    {activeIndex > 0 && (
                        <KButton color='secondary' className='ml-4' onClick={handlePreviousClick}>
                            مرحله قبلی
                        </KButton>
                    )}
                    {isPending ? <KSpinner color='primary' /> :
                        <KButton color='primary' type="submit" onClick={handleFormSubmitSuccess}>
                            {activeIndex === links.length - 1 ? "نهایی سازی رزومه" : "ذخیره و مرحله بعد"}
                        </KButton>
                    }
                </div>
            </div>
        </div>
    );
};

export default CVCreation;
