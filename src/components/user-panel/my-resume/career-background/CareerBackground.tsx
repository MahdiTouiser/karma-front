import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Add from '../../../../assets/icons/Add';
import Delete from '../../../../assets/icons/Delete';
import Edit from '../../../../assets/icons/Edit';
import useApi from '../../../../hooks/useApi';
import useConfirm from '../../../../hooks/useConfirm';
import { CareerRecord, WorkExperienceFormData } from '../../../../models/cvbuilder.models';
import { BaseResponse } from '../../../../models/shared.models';
import KCard from '../../../shared/Card';
import KSpinner from '../../../shared/Spinner';
import CareerBackgroundModal from './CareerBackgroundModal';

const CareerBackground: React.FC = () => {
    const { sendRequest: fetch, isPending } = useApi<WorkExperienceFormData, CareerRecord[]>();
    const [careerRecords, setCareerRecords] = useState<CareerRecord[]>([]);
    const { sendRequest: deleteRequest } = useApi<null, BaseResponse<null>>();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

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
                setCareerRecords(response)

            },
        );
    };
    useEffect(() => {
        fetchCareerRecords()
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
                    fetchCareerRecords()
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
            <CareerBackgroundModal show={isModalOpen} onClose={closeModal} fetch={fetchCareerRecords} />

            <KCard className='flex flex-col justify-between w-full'>
                <div className="flex items-center justify-between">
                    <h1 className='text-xl font-extrabold'>سوابق شغلی</h1>
                    <button className="text-sm text-blue-500 flex items-center" onClick={openModal}>
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
                                    <div className="mr-2">
                                        <Edit />
                                    </div>
                                    <button className="mr-2 mt-4" onClick={() => handleDeleteRecord(info.id)}>
                                        <Delete />
                                    </button>
                                </div>
                                <div className="pl-2 mr-4">
                                    <p className='text-black font-extrabold'>{info.jobTitle}</p>
                                    <p className='mt-4'>{info.companyName}</p>
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

export default CareerBackground