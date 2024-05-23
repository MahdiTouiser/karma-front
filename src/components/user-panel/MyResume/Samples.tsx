import React from 'react';
import { Link } from 'react-router-dom';
import KCard from '../../shared/Card';

const Samples: React.FC = () => {

    const SampleData = [
        { link: 'https://github.com/MahdiTouiser' },
    ];

    return (
        <KCard className='flex flex-col justify-between w-full'>
            <div className="flex items-center justify-between">
                <h1 className='text-xl font-extrabold'>نمونه کارها</h1>
                <button className="text-sm text-blue-500 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    افزودن
                </button>
            </div>
            <div className="flex mt-5 ltr">
                {SampleData.map((info, index) => (
                    <div key={index} className="flex justify-center items-center px-2 py-1 bg-gray-200 rounded">
                        <Link to={info.link} target='_blank'>
                            <div className='flex justify-center items-center'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="blue" className="w-4 h-4 mr-2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
                                </svg>
                                <p className='text-blue-500 text-sm '>{info.link}</p>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </KCard>)
}

export default Samples