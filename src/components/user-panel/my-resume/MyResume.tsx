import React from 'react';
import Languages from './Languages';
import PersonalResume from './PersonalResume';
import SoftwareSkills from './SoftwareSkills';
import AboutMe from './about-me/AboutMe';
import BasicInfo from './basic-info/BasicInfo';
import CareerBackground from './career-background/CareerBackground';
import EducationalHistory from './educational-history.tsx/EducationalHistory';
import Samples from './samples/Samples';

const MyResume: React.FC = () => {
    return (
        <>
            <div className='flex py-16'>
                <div className='flex flex-col w-3/5 px-8'>
                    <div>
                        <AboutMe />
                    </div>
                    <div className='mt-6'>
                        <BasicInfo />
                    </div>
                    <div className='mt-6'>
                        <EducationalHistory />
                    </div>
                    <div className='mt-6'>
                        <CareerBackground />
                    </div>
                    <div className='mt-6'>
                        <Languages />
                    </div>
                    <div className='mt-6'>
                        <SoftwareSkills />
                    </div>
                </div>
                <div className='flex flex-col w-2/5 px-8'>
                    <div>
                        <PersonalResume />
                    </div>
                    <div className='mt-6'>
                        <Samples />
                    </div>
                </div>
            </div>
        </>
    );
};

export default MyResume;
