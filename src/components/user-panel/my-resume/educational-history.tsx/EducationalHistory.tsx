import React, {
  useEffect,
  useState,
} from 'react';

import { toast } from 'react-toastify';

import Add from '../../../../assets/icons/Add';
import Delete from '../../../../assets/icons/Delete';
import Edit from '../../../../assets/icons/Edit';
import useApi from '../../../../hooks/useApi';
import useConfirm from '../../../../hooks/useConfirm';
import { EducationalRecordModel } from '../../../../models/cvbuilder.models';
import {
  DegreeLevel,
  DegreeLevelDescriptions,
} from '../../../../models/enums';
import { BaseResponse } from '../../../../models/shared.models';
import KCard from '../../../shared/Card';
import KSpinner from '../../../shared/Spinner';
import EducationalHistoryModal from './EducationalHistoryModal';

const EducationalHistory: React.FC = () => {
    const [educationalData, setEducationalData] = useState<EducationalRecordModel[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [editingRecord, setEditingRecord] = useState<EducationalRecordModel | null>(null);

    const { sendRequest: deleteRequest } = useApi<null, BaseResponse<null>>();
    const { sendRequest: fetch, isPending } = useApi<null, EducationalRecordModel[]>();
    const openModal = (record?: EducationalRecordModel) => {
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
                    <button className="flex items-center text-sm text-blue-500" onClick={() => openModal()}>
                        <Add />
                        <span className='mr-1'>
                            افزودن
                        </span>
                    </button>
                </div>
                {isPending ? (
                    <span className='flex items-center justify-center'>
                        <KSpinner color='primary' size={20} />
                    </span>
                ) : (
                    <div className="flex flex-col mt-5">
                        {sortedRecords.map((info, index) => (
                            <div key={index} className="flex items-center p-5 mt-6 mr-4 text-gray-600 border-l-2 border-blue-500 bg-gray-50">
                                <div className='flex flex-col' id='icons'>
                                    <button className="mr-2" onClick={() => openModal(info)}>
                                        <Edit />
                                    </button>
                                    <button className="mt-4 mr-2" onClick={() => handleDeleteRecord(info.id)}>
                                        <Delete />
                                    </button>
                                </div>
                                <div className="pl-2 mr-4">
                                    <p className='font-extrabold text-black'>
                                        {DegreeLevelDescriptions[info.degreeLevel as DegreeLevel]} - {info.major.title}
                                    </p>
                                    <p className='mt-4'>{info.university.title}</p>
                                    <p className='mt-4'>
                                        {`${info.fromYear} - ${info.toYear === null ? 'در حال تحصیل' : info.toYear}`}
                                    </p>
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
