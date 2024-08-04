import React from 'react';

import {
    skillLevelLabels,
    SkillLevels,
} from '../../../models/enums';
import KCard from '../../shared/Card';

interface SoftwareSkill {
    id: number;
    SoftwareSkill: {
        title: string;
    };
    softwareSkillLevel: SkillLevels;
}

interface UserSoftwareSkillsProps {
    softwareSkills: SoftwareSkill[];
}

const UserSoftwareSkills: React.FC<UserSoftwareSkillsProps> = ({ softwareSkills }) => {
    return (
        <KCard className='flex flex-col justify-between w-full'>
            <h1 className='text-xl font-extrabold'>مهارت های نرم افزاری</h1>
            <div className="grid grid-cols-3 gap-2 mt-5">
                {softwareSkills.map((info) => (
                    <div key={info.id} className="flex items-center justify-center px-2 py-1 bg-gray-200 rounded">
                        <p className='text-black text-sm flex-1 text-center'>
                            {info.SoftwareSkill.title} | {skillLevelLabels[info.softwareSkillLevel]}
                        </p>
                    </div>
                ))}
            </div>
        </KCard>
    );
};

export default UserSoftwareSkills;