import React from 'react';
import OtherSkills from './OtherSkills';
import SoftwareSkills from './SoftwareSkills';
import Languages from './languages/Languages';

const AdditionalSkills: React.FC = () => {


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
                    <OtherSkills />
                </div>
            </div>
        </div>
    );
};

export default AdditionalSkills;
