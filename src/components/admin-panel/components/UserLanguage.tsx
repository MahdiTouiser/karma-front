import React from 'react';

import {
    skillLevelLabels,
    SkillLevels,
} from '../../../models/enums';
import KCard from '../../shared/Card';

interface Language {
    id: number;
    Language: {
        title: string;
    };
    languageLevel: SkillLevels;
}

interface UserLanguagesProps {
    languages: Language[];
}

const UserLanguages: React.FC<UserLanguagesProps> = ({ languages }) => {
    return (
        <KCard className='flex flex-col justify-between w-full'>
            <h1 className='text-xl font-extrabold'>زبان ها</h1>
            <div className="grid grid-cols-4 gap-2 mt-5">
                {languages.map((info) => (
                    <div key={info.id} className="flex items-center px-2 py-1 bg-gray-200 rounded">
                        <p className='text-black text-sm'>{info.Language.title} | {skillLevelLabels[info.languageLevel as SkillLevels]}</p>
                    </div>
                ))}
            </div>
        </KCard>
    );
};

export default UserLanguages;