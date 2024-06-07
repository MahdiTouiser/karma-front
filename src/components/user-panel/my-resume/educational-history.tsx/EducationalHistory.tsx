import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Add from '../../../../assets/icons/Add';
import Delete from '../../../../assets/icons/Delete';
import Edit from '../../../../assets/icons/Edit';
import useApi from '../../../../hooks/useApi';
import useConfirm from '../../../../hooks/useConfirm';
import { EducationalRecord } from '../../../../models/cvbuilder.models';
import { DegreeLevel, DegreeLevelDescriptions } from '../../../../models/enums';
import { BaseResponse } from '../../../../models/shared.models';
import KCard from '../../../shared/Card';
import KSpinner from '../../../shared/Spinner';
import EducationalHistoryModal from './EducationalHistoryModal';

const EducationalHistory: React.FC = () => {
    const [educationalData, setEducationalData] = useState<EducationalRecord[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [editingRecord, setEditingRecord] = useState<EducationalRecord | null>(null);

    const { sendRequest: deleteRequest } = useApi<null, BaseResponse<null>>();
    const { sendRequest: fetch, isPending } = useApi<null, EducationalRecord[]>();
    const openModal = (record?: EducationalRecord) => {
        setEditMode(!!record);
        setEditingRecord(record || null);
        setIsModalOpen(true);
    };
    const closeModal = () => {
        setEditMode(false);
        setEditingRecord(null);
        setIsModalOpen(false);
    };
    const [ConfirmModal, confirmation] = useConfirm(
        "آیا از حذف این آیتم مطمئنید؟",
        "حذف سابقه تحصیلی"
    );

    const fetchEducationalRecords = () => {
        fetch(
            {
                url: '/Resumes/EducationalRecords',
            },
            (response) => {
                setEducationalData(response);
            },
        );
    };
    useEffect(() => {
        fetchEducationalRecords();
    }, []);

    const handleDeleteRecord = async (id: string) => {
        const confirm = await confirmation();
        if (confirm) {
            deleteRequest(
                {
                    url: `/Resumes/RemoveEducationalRecord/${id}`,
                    method: 'delete'
                },
                (response) => {
                    toast.success(response?.message);
                    fetchEducationalRecords()
                },
                (error) => {
                    toast.error(error?.message);
                }
            );
        }
    };

    const sortedRecords = [...educationalData].sort((a, b) => a.fromYear - b.fromYear);

    return (
        <>
            <ConfirmModal />
            <EducationalHistoryModal
                show={isModalOpen}
                onClose={closeModal}
                fetch={fetchEducationalRecords}
                editMode={editMode}
                record={editingRecord}
            />
            <KCard className='flex flex-col justify-between w-full'>
                <div className="flex items-center justify-between">
                    <h1 className='text-xl font-extrabold'>سوابق تحصیلی</h1>
                    <button className="text-sm text-blue-500 flex items-center" onClick={() => openModal()}>
                        <Add />
                        <span className='mr-1'>
                            افزودن
                        </span>
                    </button>
                </div>
                {isPending ? (
                    <span className='flex justify-center items-center'>
                        <KSpinner color='primary' size={20} />
                    </span>
                ) : (
                    <div className="flex flex-col mt-5">
                        {sortedRecords.map((info, index) => (
                            <div key={index} className="flex items-center mr-4 mt-6 text-gray-600 border-l-2 border-blue-500 bg-gray-50 p-5">
                                <div className='flex flex-col' id='icons'>
                                    <button className="mr-2" onClick={() => openModal(info)}>
                                        <Edit />
                                    </button>
                                    <button className="mr-2 mt-4" onClick={() => handleDeleteRecord(info.id)}>
                                        <Delete />
                                    </button>
                                </div>
                                <div className="pl-2 mr-4">
                                    <p className='text-black font-extrabold'>
                                        {DegreeLevelDescriptions[info.degreeLevel as DegreeLevel]} - {info.major.title}
                                    </p>
                                    <p className='mt-4'>{info.university.title}</p>
                                    <p className='mt-4'>{`${info.fromYear} - ${info.toYear}`}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </KCard>
        </>
    );
}

export default EducationalHistory;
