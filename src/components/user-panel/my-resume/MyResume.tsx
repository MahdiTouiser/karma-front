import React from 'react';

import AboutMe from './about-me/AboutMe';
import BasicInfo from './basic-info/BasicInfo';
import CareerBackground from './career-background/CareerBackground';
import EducationalHistory from './educational-history.tsx/EducationalHistory';
import Languages from './Languages';
import PersonalResume from './PersonalResume';
import Samples from './samples/Samples';
import SoftwareSkills from './SoftwareSkills';

const MyResume: React.FC = () => {
    return (
        <div className='flex flex-col md:flex-row py-16'>
            <div className='flex flex-col w-full md:w-3/5 px-4 md:px-8'>
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
            <div className='flex flex-col w-full md:w-2/5 px-4 md:px-8 mt-6 md:mt-0'>
                <div>
                    <PersonalResume />
                </div>
                <div className='mt-6'>
                    <Samples />
                </div>
            </div>
        </div>
    );
};

export default MyResume;