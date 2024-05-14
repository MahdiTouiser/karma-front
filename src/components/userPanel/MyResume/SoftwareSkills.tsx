import React from 'react';
import KCard from '../../shared/Card';

const SoftwareSkills: React.FC = () => {
    const SkillsData = [
        { skill: 'HTML & CSS', level: 'پیشرفته' },
        { skill: 'Javascript', level: 'پیشرفته' },
        { skill: 'Typescript', level: 'پیشرفته' },
        { skill: 'React', level: 'پیشرفته' },
        { skill: 'Next.js', level: 'پیشرفته' },
        { skill: 'Javascript', level: 'پیشرفته' },
        { skill: 'docker', level: 'مقدماتی' },
        { skill: 'Angular', level: 'مقدماتی' },
    ];

    return (
        <KCard className='flex flex-col justify-between w-full'>
            <div className="flex items-center justify-between">
                <h1 className='text-xl font-extrabold'>مهارت های نرم افزاری</h1>
                <button className="text-sm text-blue-500 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    افزودن
                </button>
            </div>
            <div className="grid grid-cols-4 gap-2 mt-5">
                {SkillsData.map((info, index) => (
                    <div key={index} className="flex items-center px-2 py-1 bg-gray-400 rounded">
                        <span className='ml-4'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                            </svg>
                        </span>
                        <p className='text-black text-sm'>{info.skill} | {info.level}</p>
                    </div>
                ))}
            </div>
        </KCard >
    );
}

export default SoftwareSkills;
