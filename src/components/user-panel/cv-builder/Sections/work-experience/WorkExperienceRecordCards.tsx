import React, { useState } from 'react'
import { toast } from 'react-toastify'
import Add from '../../../../../assets/icons/Add'
import Delete from '../../../../../assets/icons/Delete'
import Edit from '../../../../../assets/icons/Edit'
import useApi from '../../../../../hooks/useApi'
import useConfirm from '../../../../../hooks/useConfirm'
import { CareerRecordModel } from '../../../../../models/cvbuilder.models'
import { BaseResponse, OptionType } from '../../../../../models/shared.models'
import KCard from '../../../../shared/Card'
import CareerRecord from './CareerRecord'

interface WorkExperienceRecordCardsProps {
    records: CareerRecordModel[];
    refresh: () => void;
    setIsRecordVisible: (value: boolean) => void;
    isRecordVisible: boolean;
    countries: OptionType[],
    cities: OptionType[],
    jobCategories: OptionType[]
}

const WorkExperienceRecordCards: React.FC<WorkExperienceRecordCardsProps> = (props) => {
    const { records, refresh, setIsRecordVisible, isRecordVisible, cities, countries, jobCategories } = props;
    const [selectedRecord, setSelectedRecord] = useState<CareerRecordModel | null>(null);
    const [ConfirmModal, confirmation] = useConfirm(
        "آیا از حذف این آیتم مطمئنید؟",
        "حذف سابقه شغلی"
    );
    const [formKey, setFormKey] = useState(0);
    const { sendRequest: deleteRequest } = useApi<null, BaseResponse<null>>();


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
                    refresh();
                },
                (error) => {
                    toast.error(error?.message);
                }
            );
        }
    };

    const handleEditRecord = (record: CareerRecordModel) => {
        setSelectedRecord(record);
        setIsRecordVisible(true);
    };

    const handleAddNewRecord = () => {
        setSelectedRecord(null);
        setIsRecordVisible(true);
        setFormKey(prevKey => prevKey + 1);
    };

    const sortedRecords = [...records].sort((a, b) => a.fromYear - b.fromYear);

    return (
        <div>
            <ConfirmModal />
            {sortedRecords.map(record => (
                <KCard key={record.id} className='mt-4'>
                    <div className='flex align-middle items-center'>
                        <div className='flex flex-col ml-4 bg-gray-200 p-3 rounded'>
                            <button onClick={() => handleEditRecord(record)}>
                                <Edit className='w-5 h-5 mb-4' />
                            </button>
                            <button onClick={() => handleDeleteRecord(record.id)}>
                                <Delete className='w-5 h-5' strokeColor='red' />
                            </button>
                        </div>
                        <div>
                            <p className='font-extrabold m-2 text-lg'>{record.jobTitle}</p>
                            <p className='m-2'>{record.companyName}</p>
                            <p className='m-2'>{record.fromYear} - {record.toYear}</p>
                        </div>
                    </div>
                </KCard>
            ))}
            <div className='mt-4'>
                {isRecordVisible ? (
                    <CareerRecord
                        key={formKey}
                        setIsRecordVisible={setIsRecordVisible}
                        refresh={refresh}
                        cities={cities}
                        countries={countries}
                        jobCategories={jobCategories}
                        record={selectedRecord}
                    />
                ) : (
                    <button onClick={handleAddNewRecord}>
                        <span className='flex'>
                            <Add />
                            <p className='mr-2 text-blue-500 text-sm'>
                                افزودن سابقه شغلی جدید
                            </p>
                        </span>
                    </button>
                )}
            </div>
        </div>
    )
}

export default WorkExperienceRecordCards