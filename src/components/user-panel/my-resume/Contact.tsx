import React from 'react';
import Edit from '../../../assets/icons/Edit';
import KCard from '../../shared/Card';

const Contact: React.FC = () => {
    const ContactData = [
        { title: 'آدرس ایمیل', value: 'mahditouiserkani78@gmail.com' },
        { title: 'شماره تماس', value: '09393502695' },
    ];

    return (
        <KCard className='flex flex-col justify-between'>
            <div className="flex items-center justify-between">
                <h1 className='text-xl font-bold'>اطلاعات تماس</h1>
            </div>
            {ContactData.map((contact, index) => (
                <div key={index} className="flex items-center justify-between mr-5 mt-5 bg-gray-50 p-2 rounded-md">
                    <p className='text-sm'>
                        <span className='text-gray-600'>{contact.title}</span> <br />
                        <span className='font-extrabold'>{contact.value}</span>
                    </p>
                    <button className="text-sm text-blue-500 flex items-center">
                        <Edit />
                    </button>
                </div>
            ))}
        </KCard>
    )
}

export default Contact
