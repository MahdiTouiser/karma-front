import React from 'react';
import AdditionalSkills from './additional-skills/AdditionalSkills';
import Languages from './languages/Languages';
import SoftwareSkills from './software-skills/SoftwareSkills';

const AdditionalSkillsNav: React.FC = () => {

    return (
        <div>
            <h1 className="text-2xl font-bold">مهارت های تکمیلی</h1>
            <div className='mt-10 p-5'>
                <div>
                    <Languages />
                </div>
                <div className='mt-5'>
                    <SoftwareSkills />
                </div>
                <div className='mt-5'>
                    <AdditionalSkills />
                </div>
            </div>
        </div>
    );
};

export default AdditionalSkillsNav;
