import React, { useState } from 'react';
import Add from '../../../../../assets/icons/Add';
import KCard from '../../../../shared/Card';
import KCheckbox from '../../../../shared/Checkbox';

const SoftwareSkills: React.FC = () => {
    const [isChecked, setIsChecked] = useState(false);

    const handleOnChange = (checked: boolean) => {
        setIsChecked(checked);
        console.log('Checkbox is checked:', checked);
    };
    return (
        <KCard>
            <h1 className="text-2xl font-extrabold">مهارت های نرم افزاری</h1>
            {isChecked ? (
                <div className='flex mt-4'>
                    <p className='text-sm'>مهارت های نرم افزاری ندارم.</p>
                    <button className='text-blue-500 text-sm mr-2' onClick={(checked) => setIsChecked(!checked)}>تغییر</button>
                </div>
            ) : (
                <div className='mt-6'>
                    <KCheckbox content={'مهارت زبان خارجی ندارم .'} onChange={handleOnChange} checked={isChecked} />
                    <div className='border-b-2 mt-4'></div>
                    <div className='mt-4'>
                        <button className="text-sm text-blue-500 flex items-center">
                            <Add />
                            افزودن
                        </button>
                    </div>
                </div>
            )}
        </KCard>
    )
}

export default SoftwareSkills