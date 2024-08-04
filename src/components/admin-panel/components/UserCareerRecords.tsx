import React from 'react';

import KCard from '../../shared/Card';

interface CareerRecord {
    id: string;
    jobTitle: string;
    companyName: string;
    fromYear: number;
    toYear?: number | null;
}

interface UserCareerBackgroundProps {
    careerRecords: CareerRecord[];
}

const UserCareerBackground: React.FC<UserCareerBackgroundProps> = ({ careerRecords }) => {
    const sortedRecords = [...careerRecords].sort((a, b) => a.fromYear - b.fromYear);
    return (
        <>
            <KCard className='flex flex-col justify-between w-full'>
                <div className="flex items-center justify-between">
                    <h1 className='text-xl font-extrabold'>سوابق شغلی</h1>
                </div>
                <div className="flex flex-col mt-5">
                    {sortedRecords.length === 0 ? (
                        <p className='text-gray-600'>سابقه شغلی وجود ندارد</p>
                    ) : (
                        sortedRecords.map((info) => (
                            <div key={info.id} className="flex items-center mr-4 mt-6 text-gray-600 border-l-2 border-blue-500 bg-gray-50 p-5">
                                <div className="pl-2 mr-4">
                                    <p className='text-black font-extrabold'>{info.jobTitle}</p>
                                    <p className='mt-4'>{info.companyName}</p>
                                    <p className='mt-4'>{`${info.fromYear} - ${info.toYear ? info.toYear : 'تا کنون'}`}</p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </KCard>
        </>
    );
}

export default UserCareerBackground;