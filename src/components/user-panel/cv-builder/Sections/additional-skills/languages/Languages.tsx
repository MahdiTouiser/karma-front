import React, { useEffect, useState } from 'react';
import Add from '../../../../../../assets/icons/Add';
import Delete from '../../../../../../assets/icons/Delete';
import useApi from '../../../../../../hooks/useApi';
import { LanguagesData } from '../../../../../../models/cvbuilder.models';
import { SkillLevels, skillLevelLabels } from '../../../../../../models/enums';
import KCard from '../../../../../shared/Card';
import KCheckbox from '../../../../../shared/Checkbox';
import KSpinner from '../../../../../shared/Spinner';
import LanguagesModal from './LanguagesModal';

const Languages: React.FC = () => {
    const [isChecked, setIsChecked] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [languages, setLanguages] = useState<LanguagesData[]>([]);
    const closeModal = () => setIsModalOpen(false);
    const openModal = () => setIsModalOpen(true);
    const { sendRequest: fetch, isPending } = useApi<null, LanguagesData[]>();
    console.log(languages.length);

    const fetchLanguages = () => {
        fetch(
            {
                url: "/Resumes/Languages",
            },
            (response) => {
                console.log(response);
                setLanguages(response);
            },
        );
    };

    useEffect(() => {
        fetchLanguages();
    }, []);

    const handleOnChange = (checked: boolean) => {
        setIsChecked(checked);
    };

    return (
        <>
            <LanguagesModal show={isModalOpen} onClose={closeModal} />
            {isPending ? <KSpinner color='primary' /> :
                <KCard>
                    <h1 className="text-2xl font-extrabold">زبان ها</h1>
                    {languages.length === 0 || isChecked ? (
                        <div className='flex mt-4'>
                            <p className='text-sm'>مهارت زبان خارجی ندارم.</p>
                            <button className='text-blue-500 text-sm mr-2' onClick={() => setIsChecked(!isChecked)}>تغییر</button>
                        </div>
                    ) : (
                        <>
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
                            <div className="grid grid-cols-4 gap-2 mt-5">
                                {languages.map((info, index) => (
                                    <div key={index} className="flex items-center px-2 py-1 bg-gray-200 rounded">
                                        <span className='ml-4'>
                                            <Delete />
                                        </span>
                                        <p className='text-black text-sm'>{info.Language.title} | {skillLevelLabels[info.languageLevel as SkillLevels]}</p>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </KCard>
            }
        </>
    );
};

export default Languages;
