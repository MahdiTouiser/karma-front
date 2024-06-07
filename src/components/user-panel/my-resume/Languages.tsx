import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Add from '../../../assets/icons/Add';
import Delete from '../../../assets/icons/Delete';
import useApi from '../../../hooks/useApi';
import useConfirm from '../../../hooks/useConfirm';
import { LanguagesData } from '../../../models/cvbuilder.models';
import { BaseResponse } from '../../../models/shared.models';
import KCard from '../../shared/Card';
import KSpinner from '../../shared/Spinner';
import LanguagesModal from '../cv-builder/sections/additional-skills/languages/LanguagesModal';

const Languages: React.FC = () => {
    const { sendRequest: fetch, isPending } = useApi<null, LanguagesData[]>();
    const [languages, setLanguages] = useState<LanguagesData[]>([]);
    const { sendRequest: deleteRequest } = useApi<null, BaseResponse<null>>();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    const [ConfirmModal, confirmation] = useConfirm(
        "آیا از حذف این آیتم مطمئنید؟",
        "حذف مهارت زبان خارجی"
    );

    const handleDeleteItem = async (id: number) => {
        const confirm = await confirmation();
        if (confirm) {
            deleteRequest(
                {
                    url: `/Resumes/RemoveLanguage/${id}`,
                    method: 'delete'
                },
                (response) => {
                    toast.success(response?.message);
                    fetchLanguages()
                },
                (error) => {
                    toast.error(error?.message);
                }
            );
        }
    }

    const fetchLanguages =
        () => {
            fetch(
                {
                    url: '/Resumes/Languages',
                },
                (response) => {
                    setLanguages(response);
                },
            );
        };

    useEffect(() => {
        fetchLanguages();
    }, []);

    return (
        <>
            <ConfirmModal />
            <LanguagesModal show={isModalOpen} onClose={closeModal} onSuccess={fetchLanguages} />

            <KCard className='flex flex-col justify-between w-full'>
                <div className="flex items-center justify-between">
                    <h1 className='text-xl font-extrabold'>زبان ها</h1>
                    <button className="text-sm text-blue-500 flex items-center" onClick={openModal}>
                        <Add />
                        افزودن
                    </button>
                </div>
                {isPending ? (
                    <div className='flex justify-center'>
                        <KSpinner color='primary' size={10} />
                    </div>
                ) : (
                    <div className="grid grid-cols-4 gap-2 mt-5">
                        {languages.map((info, index) => (
                            <div key={index} className="flex items-center px-2 py-1 bg-gray-200 rounded">
                                <button onClick={() => handleDeleteItem(info.id)} className="ml-4">
                                    <Delete />
                                </button>
                                <p className='text-black text-sm'>{info.Language.title} | {info.languageLevel}</p>
                            </div>
                        ))}
                    </div>
                )}
            </KCard>

        </>

    );
}

export default Languages