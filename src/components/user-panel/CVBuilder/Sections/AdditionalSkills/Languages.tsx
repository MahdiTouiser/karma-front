import React, { useState } from 'react';
import KCard from '../../../../shared/Card';
import KCheckbox from '../../../../shared/Checkbox';

const Languages: React.FC = () => {
    const [isChecked, setIsChecked] = useState(false);

    const handleOnChange = (checked: boolean) => {
        setIsChecked(checked);
        console.log('Checkbox is checked:', checked);
    };

    return (
        <KCard>
            <h1 className="text-2xl font-extrabold">زبان ها</h1>
            {isChecked ? (
                <div className='flex mt-4'>
                    <p className='text-sm'>مهارت زبان خارجی ندارم.</p>
                    <button className='text-blue-500 text-sm mr-2' onClick={(checked) => setIsChecked(!checked)}>تغییر</button>
                </div>
            ) : (
                <div className='mt-6'>
                    <KCheckbox content={'مهارت زبان خارجی ندارم .'} onChange={handleOnChange} checked={isChecked} />
                    <div className='border-b-2 mt-4'></div>
                    <div className='mt-4'>
                        <button className="text-sm text-blue-500 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                            افزودن
                        </button>
                    </div>
                </div>
            )}
        </KCard>
    );
};

export default Languages;
