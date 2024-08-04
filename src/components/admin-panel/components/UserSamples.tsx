import React from 'react';

import { Link } from 'react-router-dom';

import KCard from '../../shared/Card';

interface WorkSample {
    title: string;
    link: string;
}

interface UserSamplesProps {
    workSamples: WorkSample[];
}

const UserSamples: React.FC<UserSamplesProps> = ({ workSamples }) => {
    return (
        <KCard className='flex flex-col justify-between w-full'>
            <h1 className='text-xl font-extrabold'>نمونه کارها</h1>
            <div className="mt-5">
                {workSamples.length > 0 ? (
                    workSamples.map((sample, index) => (
                        <div key={index} className="mb-3">
                            <div className="flex items-center justify-between bg-gray-200 rounded px-2 py-1 ltr">
                                <Link to={sample.link} target='_blank' className='flex items-center'>
                                    <p className='text-blue-500 text-sm'>{sample.title}</p> {/* Use title instead */}
                                </Link>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>هیچ نمونه کاری وجود ندارد</p>
                )}
            </div>
        </KCard>
    );
};

export default UserSamples;