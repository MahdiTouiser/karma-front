import React, { useState } from 'react';
import KCard from '../../shared/Card';

const JobsCards: React.FC = () => {
    const JobsData = [
        { label: 'برنامه نویس فرانت', companyName: 'سعادت رنت', salary: '۸۰ میلیون تومان', date: 'امروز' },
        { label: 'برنامه نویس', companyName: 'رایانش ابری یکتا شیوه', salary: '۸۰ میلیون تومان', date: 'دیروز' },
        { label: 'برنامه نویس بک', companyName: 'رایانش ابری یکتا شیوه', salary: '۸۰ میلیون تومان', date: '۲ روز پیش' },
        { label: 'برنامه نویس فول استک', companyName: 'رایانش ابری یکتا شیوه', salary: '۸۰ میلیون تومان', date: 'هفته پیش' },
        { label: 'تستر ', companyName: 'رایانش ابری یکتا شیوه', salary: '۸۰ میلیون تومان', date: 'امروز' },
        { label: 'مدیر فنی ', companyName: 'رایانش ابری یکتا شیوه', salary: '۸۰ میلیون تومان', date: 'دیروز' },
        { label: 'مدیر عامل', companyName: 'رایانش ابری یکتا شیوه', salary: '۸۰ میلیون تومان', date: 'امروز' },
        { label: 'آبدارچی', companyName: 'رایانش ابری یکتا شیوه', salary: '۸۰ میلیون تومان', date: 'امروز' },
        { label: 'متخصصی دواپس', companyName: 'رایانش ابری یکتا شیوه', salary: '۸۰ میلیون تومان', date: 'ماه گذشته' },
        { label: 'UI/UX designer', companyName: 'رایانش ابری یکتا شیوه', salary: '۸۰ میلیون تومان', date: 'امروز' },
    ];

    const [liked, setLiked] = useState(Array(10).fill(false));

    const toggleLike = (index: number) => {
        const newLiked = [...liked];
        newLiked[index] = !newLiked[index];
        setLiked(newLiked);
    };
    return (
        <div className='flex flex-col p-40'>
            <KCard className='w-1/4 text-gray-500'>
                <p>4302 فرصت شغلی</p>
            </KCard>
            {JobsData.map((item, index) => (
                <KCard key={index} className='mt-5 w-1/4 border-r-4 border-sky-500'>
                    <div className='flex justify-end'>
                        <button>
                            <svg
                                onClick={() => toggleLike(index)}
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill={liked[index] ? 'red' : 'gray'}
                                width="24px"
                                height="24px"
                                style={{ cursor: 'pointer' }}
                            >
                                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                            </svg>
                        </button>
                    </div>
                    <p className='font-bold'>{item.label}</p>
                    <div className='flex text-gray-500'>
                        <p className='ml-2'>{item.companyName}</p> | <p className='mr-2'>{item.salary}</p>
                    </div>
                    <p className='text-gray-500'>{item.date}</p>

                </KCard>
            ))}
        </div>
    );
};

export default JobsCards;
