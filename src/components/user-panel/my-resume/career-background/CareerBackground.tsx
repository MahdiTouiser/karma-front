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
import {
  CareerRecordModel,
  WorkExperienceFormData,
} from '../../../../models/cvbuilder.models';
import { BaseResponse } from '../../../../models/shared.models';
import KCard from '../../../shared/Card';
import KSpinner from '../../../shared/Spinner';
import CareerBackgroundModal from './CareerBackgroundModal';

const CareerBackground: React.FC = () => {
    const { sendRequest: fetch, isPending } = useApi<WorkExperienceFormData, CareerRecordModel[]>();
    const [careerRecords, setCareerRecords] = useState<CareerRecordModel[]>([]);
    const { sendRequest: deleteRequest } = useApi<null, BaseResponse<null>>();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [editingRecord, setEditingRecord] = useState<CareerRecordModel | null>(null);

    const openModal = (record?: CareerRecordModel) => {
        if (record) {
            setEditMode(true);
            setEditingRecord(record);
        } else {
            setEditMode(false);
            setEditingRecord(null);
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingRecord(null);
    };

    const [ConfirmModal, confirmation] = useConfirm(
        "آیا از حذف این آیتم مطمئنید؟",
        "حذف سابقه شغلی"
    );

    const fetchCareerRecords = () => {
        fetch(
            {
                url: "/Resumes/CareerRecords",
            },
            (response) => {
                setCareerRecords(response);
            },
        );
    };

    useEffect(() => {
        fetchCareerRecords();
    }, []);

    const handleDeleteRecord = async (id: string) => {
        const confirm = await confirmation();
        if (confirm) {
            deleteRequest(
                {
                    url: `/Resumes/RemoveCareerRecord/${id}`,
                    method: 'delete'
                },
                (response) => {
                    toast.success(response?.message);
                    fetchCareerRecords();
                },
                (error) => {
                    toast.error(error?.message);
                }
            );
        }
    };

    const sortedRecords = [...careerRecords].sort((a, b) => a.fromYear - b.fromYear);

    return (
        <>
            <ConfirmModal />
            <CareerBackgroundModal
                show={isModalOpen}
                onClose={closeModal}
                fetch={fetchCareerRecords}
                editMode={editMode}
                record={editingRecord}
            />

            <KCard className='flex flex-col justify-between w-full'>
                <div className="flex items-center justify-between">
                    <h1 className='text-xl font-extrabold'>سوابق شغلی</h1>
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
                                    <p className='font-extrabold text-black'>{info.jobTitle}</p>
                                    <p className='mt-4'>{info.companyName}</p>
                                    <p className='mt-4'>{`${info.fromYear} - ${info.toYear ? info.toYear : 'تا کنون'}`}</p>
                                </div>
                            </div>
                        ))}
                        <p className="mt-6 text-center">
                            مجموع سوابق شغلی: {sortedRecords.reduce((total, record) => total + record.workTotalMonths, 0)} ماه
                        </p>
                    </div>
                )}
            </KCard>
        </>
    );
}

export default CareerBackground;
