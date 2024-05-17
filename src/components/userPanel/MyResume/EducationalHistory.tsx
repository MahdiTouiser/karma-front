import React from 'react';
import KCard from '../../shared/Card';

const EducationalHistory: React.FC = () => {
    const EducationalData = [
        { label: 'کارشناسی : مهندسی مکانیک', university: 'دانشگاه بین المللی امام خمینی - قزوین', date: '۱۴۰۱-۱۳۹۷' },
        { label: 'کارشناسی ارشد: مهندسی کامپیوتر', university: 'دانشگاه شهید بهشتی', date: '1402 تا کنون' },
    ];

    return (
        <KCard className='flex flex-col justify-between w-full'>
            <div className="flex items-center justify-between">
                <h1 className='text-xl font-extrabold'>سوابق تحصیلی</h1>
                <button className="text-sm text-blue-500 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    افزودن
                </button>
            </div>
            <div className="flex flex-col mt-5">
                {EducationalData.map((info, index) => (
                    <div key={index} className="flex items-center mr-4 mt-6 text-gray-600 border-l-2 border-blue-500 bg-gray-50">
                        <div className='flex flex-col' id='icons'>
                            <div className="mr-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                                </svg>
                            </div>
                            <div className="mr-2 mt-4">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                </svg>
                            </div>
                        </div>
                        <div className="pl-2 mr-4">
                            <p className='text-black font-extrabold'>{info.label}</p>
                            <p className='mt-4'>{info.university}</p>
                            <p className='mt-4'>{info.date}</p>
                        </div>
                    </div>
                ))}
            </div>
        </KCard>
    );
}

export default EducationalHistory;
