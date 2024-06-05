import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Add from '../../../../../../assets/icons/Add';
import Delete from '../../../../../../assets/icons/Delete';
import useApi from '../../../../../../hooks/useApi';
import useConfirm from '../../../../../../hooks/useConfirm';
import { SoftwareSkillsData } from '../../../../../../models/cvbuilder.models';
import { SkillLevels, skillLevelLabels } from '../../../../../../models/enums';
import { BaseResponse } from '../../../../../../models/shared.models';
import KCard from '../../../../../shared/Card';
import KCheckbox from '../../../../../shared/Checkbox';
import KSpinner from '../../../../../shared/Spinner';
import SoftwareSkillsModal from './SoftwareSkillsModal';

const SoftwareSkills: React.FC = () => {
    const [isChecked, setIsChecked] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [skills, setSkills] = useState<SoftwareSkillsData[]>([]);
    const closeModal = () => setIsModalOpen(false);
    const openModal = () => setIsModalOpen(true);
    const { sendRequest: fetch, isPending } = useApi<null, SoftwareSkillsData[]>();
    const { sendRequest: deleteRequest } = useApi<null, BaseResponse<null>>();

    const fetchSkills = () => {
        fetch(
            {
                url: "/Resumes/SoftwareSkills",
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
        "حذف مهارت نرم افزاری"
    );

    const handleDeleteItem = async (id: number) => {
        const confirm = await confirmation();
        if (confirm) {
            deleteRequest(
                {
                    url: `/Resumes/RemoveSoftwareSkill/${id}`,
                    method: 'delete'
                },
                (response) => {
                    toast.success(response?.message);
                    fetchSkills()
                },
                (error) => {
                    toast.error(error?.message);
                }
            );
        }
    }

    return (
        <>
            <ConfirmModal />
            <SoftwareSkillsModal show={isModalOpen} onClose={closeModal} onSuccess={fetchSkills} />
            <KCard>
                <h1 className="text-2xl font-extrabold">مهارت های نرم افزاری</h1>
                {isPending ? (
                    <div className='flex justify-center'>
                        <KSpinner color='primary' size={10} />
                    </div>
                ) : (
                    <>
                        {
                            skills.length > 0 ? (
                                <>
                                    <div className="grid grid-cols-4 gap-2 mt-5">
                                        {skills.map((info, index) => (
                                            <div key={index} className="flex justify-between items-center p-2 bg-gray-200 rounded">
                                                <button onClick={() => handleDeleteItem(info.id)} className="ml-4">
                                                    <Delete />
                                                </button>
                                                <div className="flex-grow">
                                                    <p className='text-black text-sm text-center'>{info.SoftwareSkill.title} | {skillLevelLabels[info.softwareSkillLevel as SkillLevels]}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className='mt-4'>
                                        <button className="text-sm text-blue-500 flex items-center" onClick={openModal}>
                                            <Add />
                                            افزودن
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <>
                                    {isChecked ? (
                                        <div className='flex mt-4'>
                                            <p className='text-sm'>مهارت نرم افزاری ندارم.</p>
                                            <button className='text-blue-500 text-sm mr-2' onClick={() => setIsChecked(!isChecked)}>تغییر</button>
                                        </div>
                                    ) : (
                                        <>
                                            <div className='mt-6'>
                                                <KCheckbox content={'مهارت نرم افزاری ندارم .'} onChange={handleOnChange} checked={isChecked} />
                                                <div className='border-b-2 mt-4'></div>
                                                <div className='mt-4'>
                                                    <button className="text-sm text-blue-500 flex items-center" onClick={openModal}>
                                                        <Add />
                                                        افزودن
                                                    </button>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </>
                            )
                        }
                    </>
                )
                }
            </KCard>
        </>
    );
};

export default SoftwareSkills;
