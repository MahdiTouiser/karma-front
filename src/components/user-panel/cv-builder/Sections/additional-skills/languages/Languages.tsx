import React, { useState } from 'react';
import Add from '../../../../../../assets/icons/Add';
import KCard from '../../../../../shared/Card';
import KCheckbox from '../../../../../shared/Checkbox';
import LanguagesModal from './LanguagesModal';

const Languages: React.FC = () => {
    const [isChecked, setIsChecked] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const closeModal = () => setIsModalOpen(false);
    const openModal = () => setIsModalOpen(true);




    const handleOnChange = (checked: boolean) => {
        setIsChecked(checked);
        console.log('Checkbox is checked:', checked);
    };


    return (
        <>
            <LanguagesModal show={isModalOpen} onClose={closeModal} />
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
                            <button className="text-sm text-blue-500 flex items-center" onClick={openModal}>
                                <Add />
                                افزودن
                            </button>
                        </div>
                    </div>
                )}
            </KCard>
        </>
    );
};

export default Languages;
