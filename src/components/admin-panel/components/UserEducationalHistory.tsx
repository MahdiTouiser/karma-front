import React from 'react';

import { EducationalRecordModel } from '../../../models/cvbuilder.models';
import { DegreeLevelDescriptions } from '../../../models/enums';
import KCard from '../../shared/Card';

interface UserEducationalHistoryProps {
    educationalData: EducationalRecordModel[];
}

const UserEducationalHistory: React.FC<UserEducationalHistoryProps> = ({ educationalData }) => {
    const sortedRecords = [...educationalData].sort((a, b) => a.fromYear - b.fromYear);

    return (
        <KCard className='flex flex-col justify-between w-full'>
            <div className="flex items-center justify-between">
                <h1 className='text-xl font-extrabold'>سوابق تحصیلی</h1>
            </div>

            <div className="flex flex-col mt-5">
                {sortedRecords.map((info, index) => (
                    <div key={index} className="flex items-center mr-4 mt-6 text-gray-600 border-l-2 border-blue-500 bg-gray-50 p-5">
                        <div className="pl-2 mr-4">
                            <p className='text-black font-extrabold'>
                                {DegreeLevelDescriptions[info.degreeLevel as keyof typeof DegreeLevelDescriptions]} - {info.major.title}
                            </p>
                            <p className='mt-4'>{info.university.title}</p>
                            <p className='mt-4'>{`${info.fromYear} - ${info.toYear}`}</p>
                        </div>
                    </div>
                ))}
            </div>
        </KCard>
    );
};

export default UserEducationalHistory;