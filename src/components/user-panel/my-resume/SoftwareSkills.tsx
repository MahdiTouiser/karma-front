import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Add from '../../../assets/icons/Add';
import Delete from '../../../assets/icons/Delete';
import useApi from '../../../hooks/useApi';
import useConfirm from '../../../hooks/useConfirm';
import { SoftwareSkillsData } from '../../../models/cvbuilder.models';
import { BaseResponse } from '../../../models/shared.models';
import KCard from '../../shared/Card';
import KSpinner from '../../shared/Spinner';
import SoftwareSkillsModal from '../cv-builder/sections/additional-skills/software-skills/SoftwareSkillsModal';

const SoftwareSkills: React.FC = () => {
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

            <KCard className='flex flex-col justify-between w-full'>
                <div className="flex items-center justify-between">
                    <h1 className='text-xl font-extrabold'>مهارت های نرم افزاری</h1>
                    <button className="text-sm text-blue-500 flex items-center" onClick={openModal}>
                        <Add />
                        <span className='mr-1'>
                            افزودن
                        </span>
                    </button>
                </div>
                {isPending ? (
                    <div className='flex justify-center'>
                        <KSpinner color='primary' size={10} />
                    </div>
                ) : (
                    <div className="grid grid-cols-3 gap-2 mt-5">
                        {skills.map((info, index) => (
                            <div key={index} className="flex items-center justify-center px-2 py-1 bg-gray-200 rounded" onClick={() => handleDeleteItem(info.id)}>
                                <span className='ml-4'>
                                    <Delete />
                                </span>
                                <p className='text-black text-sm flex-1 text-center'>{info.SoftwareSkill.title} | {info.softwareSkillLevel}</p>
                            </div>
                        ))}
                    </div>

                )}
            </KCard >
        </>
    );
}

export default SoftwareSkills;
