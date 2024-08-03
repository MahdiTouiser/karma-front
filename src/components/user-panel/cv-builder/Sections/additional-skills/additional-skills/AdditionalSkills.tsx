import React, {
    useEffect,
    useState,
} from 'react';

import { toast } from 'react-toastify';

import Add from '../../../../../../assets/icons/Add';
import Delete from '../../../../../../assets/icons/Delete';
import useApi from '../../../../../../hooks/useApi';
import useConfirm from '../../../../../../hooks/useConfirm';
import {
    AdditionalSkillsData,
} from '../../../../../../models/cvbuilder.models';
import { BaseResponse } from '../../../../../../models/shared.models';
import KCard from '../../../../../shared/Card';
import KCheckbox from '../../../../../shared/Checkbox';
import KSpinner from '../../../../../shared/Spinner';
import AdditionalSkillsModal from './AdditionalSkillsModal';

const AdditionalSkills: React.FC = () => {
    const [isChecked, setIsChecked] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [skills, setSkills] = useState<AdditionalSkillsData[]>([]);
    const closeModal = () => setIsModalOpen(false);
    const openModal = () => setIsModalOpen(true);
    const { sendRequest: fetch, isPending } = useApi<null, AdditionalSkillsData[]>();
    const { sendRequest: deleteRequest } = useApi<null, BaseResponse<null>>();

    const fetchSkills = () => {
        fetch(
            {
                url: '/Resumes/AdditionalSkills',
            },
            (response) => {
                setSkills(response);
            },
        );
    };

    useEffect(() => {
        fetchSkills();
    }, []);

    const handleOnChange = (checked: boolean) => {
        setIsChecked(checked);
    };

    const [ConfirmModal, confirmation] = useConfirm(
        "آیا از حذف این آیتم مطمئنید؟",
        "حذف مهارت تکمیلی"
    );

    const handleDeleteItem = async (id: number) => {
        const confirm = await confirmation();
        if (confirm) {
            deleteRequest(
                {
                    url: `/Resumes/RemoveAdditionalSkill/${id}`,
                    method: 'delete'
                },
                (response) => {
                    toast.success(response?.message);
                    fetchSkills();
                },
                (error) => {
                    toast.error(error?.message);
                }
            );
        }
    };

    return (
        <>
            <ConfirmModal />
            <KCard>
                <AdditionalSkillsModal show={isModalOpen} onClose={closeModal} onSuccess={fetchSkills} />
                <h1 className="text-2xl font-extrabold">مهارت های تکمیلی</h1>
                {isPending ? (
                    <div className='flex justify-center'>
                        <KSpinner color='primary' size={10} />
                    </div>
                ) : (
                    <>
                        {skills.length > 0 ? (
                            <>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-5"> {/* Responsive grid */}
                                    {skills.map((info, index) => (
                                        <div key={index} className="flex justify-between items-center p-2 bg-gray-200 rounded">
                                            <button onClick={() => handleDeleteItem(info.id)} className="ml-4">
                                                <Delete strokeColor='red' />
                                            </button>
                                            <div className="flex-grow">
                                                <p className='text-black text-sm text-center'>{info.title}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className='mt-4 text-center'>
                                    <button className="text-sm text-blue-500 flex items-center justify-center mx-auto" onClick={openModal}>
                                        <Add />
                                        افزودن
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                {isChecked ? (
                                    <div className='flex mt-4 justify-center'>
                                        <p className='text-sm'>مهارت تکمیلی ندارم.</p>
                                        <button className='text-blue-500 text-sm mr-2' onClick={() => setIsChecked(!isChecked)}>تغییر</button>
                                    </div>
                                ) : (
                                    <>
                                        <div className='mt-6'>
                                            <KCheckbox content={'مهارت تکمیلی ندارم .'} onChange={handleOnChange} checked={isChecked} />
                                            <div className='border-b-2 mt-4'></div>
                                            <div className='mt-4 text-center'>
                                                <button className="text-sm text-blue-500 flex items-center justify-center mx-auto" onClick={openModal}>
                                                    <Add />
                                                    افزودن
                                                </button>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </>
                        )}
                    </>
                )}
            </KCard>
        </>
    );
};

export default AdditionalSkills;