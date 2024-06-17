import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Add from '../../../../assets/icons/Add';
import Delete from '../../../../assets/icons/Delete';
import LinkIcon from '../../../../assets/icons/Link';
import useApi from '../../../../hooks/useApi';
import useConfirm from '../../../../hooks/useConfirm';
import { SamplesData } from '../../../../models/cvbuilder.models';
import { BaseResponse } from '../../../../models/shared.models';
import KCard from '../../../shared/Card';
import SamplesModal from './SamplesModal';

const Samples: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    const { sendRequest: fetch, isPending } = useApi<null, SamplesData>();
    const [sampleData, setSampleData] = useState<SamplesData[]>([]);
    const { sendRequest: deleteRequest } = useApi<null, BaseResponse<null>>();


    const fetchData = async () => {
        fetch(
            {
                url: "/Resumes/WorkSamples",
            },
            (response: any) => {
                console.log(response);
                setSampleData(response)
            }
        );
    };

    useEffect(() => {
        fetchData();
    }, []);

    const [ConfirmModal, confirmation] = useConfirm(
        "آیا از حذف این آیتم مطمئنید؟",
        "حذف نمونه کار"
    );


    const handleDeleteButton = async (id: string) => {
        const confirm = await confirmation();
        if (confirm) {
            deleteRequest(
                {
                    url: `/Resumes/RemoveWorkSample/${id}`,
                    method: 'delete'
                },
                (response) => {
                    toast.success(response?.message);
                    fetchData()
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
            <SamplesModal show={isModalOpen} onClose={closeModal} fetch={fetchData} />
            <KCard className='flex flex-col justify-between w-full'>
                <div className="flex items-center justify-between">
                    <h1 className='text-xl font-extrabold'>نمونه کارها</h1>
                    <button className="text-sm text-blue-500 flex items-center" onClick={openModal}>
                        <Add />
                        <span className='mr-1'>
                            افزودن
                        </span>
                    </button>
                </div>
                <div className="mt-5">
                    {sampleData.map((info, index) => (
                        <div key={index} className="mb-3">
                            <div className="flex items-center justify-between bg-gray-200 rounded px-2 py-1 ltr">
                                <Link to={info.link} target='_blank' className='flex items-center'>
                                    <LinkIcon />
                                    <p className='text-blue-500 text-sm'>{info.link}</p>
                                </Link>
                                <button onClick={() => handleDeleteButton(info.id)}>
                                    <Delete />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </KCard>
        </>
    )
}

export default Samples