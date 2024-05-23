import React from 'react';
import KButton from '../../shared/Button';
import KCard from '../../shared/Card';
import KSelect from '../../shared/Select';
import AboutMe from './AboutMe';
import BasicInfo from './BasicInfo';
import CareerHistory from './CareerBackground';
import Contact from './Contact';
import EducationalHistory from './EducationalHistory';
import Languages from './Languages';
import PersonalResume from './PersonalResume';
import Samples from './Samples';
import SoftwareSkills from './SoftwareSkills';

const MyResume: React.FC = () => {
    return (
        <>
            <div className='px-8'>
                <KCard className='flex justify-between'>
                    <div className='flex items-center'>
                        <p className='ml-2'>نحوه نمایش رزومه به</p>
                        <span>
                            <KSelect defaultValue="jobseeker" id='How to display resume'>
                                <option value="jobseeker">خودم</option>
                                <option value="employer">کارفرما</option>
                            </KSelect>
                        </span>
                    </div>
                    <div id='actions' className='flex'>
                        <KButton className='flex ml-6 transition duration-300 ease-in-out transform hover:scale-105' color='tertiary'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                            </svg>
                            <p className='mr-2'>دانلود رزومه</p>
                        </KButton>
                        <KButton className='flex transition duration-300 ease-in-out transform hover:scale-105' color='tertiary'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
                            </svg>
                            <p className='mr-2'>اشتراک گذاری رزومه</p>
                        </KButton>
                    </div>
                </KCard>
            </div>
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
                        <CareerHistory />
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
                        <Contact />
                    </div>
                    <div className='mt-6'>
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
