import React from 'react';
import KButton from '../../../../shared/Button';
import AdditionalSkills from './additional-skills/AdditionalSkills';
import Languages from './languages/Languages';
import SoftwareSkills from './software-skills/SoftwareSkills';

interface AdditionalSkillsNavProps {
    goToPreviousStep: () => void
    onSubmitSuccess: () => void
}

const AdditionalSkillsNav: React.FC<AdditionalSkillsNavProps> = (props) => {

    const { goToPreviousStep, onSubmitSuccess } = props

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
            <div className='flex justify-end p-5'>
                <KButton color='secondary' className='ml-4' onClick={goToPreviousStep}>
                    مرحله قبلی
                </KButton>
                <KButton color='primary' type="button" onClick={() => onSubmitSuccess()}>
                    نهایی سازی
                </KButton>
            </div>
        </div>
    );
};

export default AdditionalSkillsNav;
