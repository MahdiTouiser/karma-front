import React, { useState } from 'react';

import { toast } from 'react-toastify';

import Add from '../../../../../assets/icons/Add';
import Delete from '../../../../../assets/icons/Delete';
import Edit from '../../../../../assets/icons/Edit';
import useApi from '../../../../../hooks/useApi';
import useConfirm from '../../../../../hooks/useConfirm';
import { EducationalRecordModel } from '../../../../../models/cvbuilder.models';
import { DegreeLevelDescriptions } from '../../../../../models/enums';
import { BaseResponse } from '../../../../../models/shared.models';
import KCard from '../../../../shared/Card';
import EducationalRecord from './EducationalRecord';

interface EducationalRecordCardsProps {
    records: EducationalRecordModel[];
    refresh: () => void;
    setIsRecordVisible: (visible: boolean) => void;
    isRecordVisible: boolean
}

const EducationalRecordCards: React.FC<EducationalRecordCardsProps> = (props) => {
    const { records, refresh, setIsRecordVisible, isRecordVisible } = props
    const { sendRequest: deleteRequest } = useApi<null, BaseResponse<null>>();
    const [ConfirmModal, confirmation] = useConfirm(
        "آیا از حذف این آیتم مطمئنید؟",
        "حذف سابقه تحصیلی"
    );

    const [selectedRecord, setSelectedRecord] = useState<EducationalRecordModel | null>(null);
    const [formKey, setFormKey] = useState(0);

    const getDegreeLabel = (value: string) => {
        return DegreeLevelDescriptions[value as keyof typeof DegreeLevelDescriptions] || value;
    };

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
                    refresh();
                },
                (error) => {
                    toast.error(error?.message);
                }
            );
        }
    };

    const handleEditRecord = (record: EducationalRecordModel) => {
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
            <div className="flex items-center justify-between">
                <h1 className='text-2xl font-extrabold'>سوابق تحصیلی</h1>
            </div>
            {sortedRecords.map(record => (
                <KCard key={record.id} className='mt-4'>

                    <div className='flex items-center align-middle'>
                        <div className='flex flex-col p-3 ml-4 bg-gray-200 rounded'>
                            <button onClick={() => handleEditRecord(record)}>
                                <Edit className='w-5 h-5 mb-4' />
                            </button>
                            <button onClick={() => handleDeleteRecord(record.id)}>
                                <Delete className='w-5 h-5' strokeColor='red' />
                            </button>
                        </div>
                        <div>
                            <p className='m-2 text-lg font-extrabold'>{getDegreeLabel(record.degreeLevel)} - {record.major.title}</p>
                            <p className='m-2'>{record.university.title}</p>
                            <p className='m-2'>{record.fromYear} - {record.toYear}</p>
                            {record.gpa && <p className='m-2'>معدل : {record.gpa}</p>}
                        </div>
                    </div>
                </KCard>
            ))}
            <div className='mt-4'>
                {isRecordVisible ? (
                    <EducationalRecord
                        key={formKey}
                        setIsRecordVisible={setIsRecordVisible}
                        refresh={refresh}
                        record={selectedRecord}
                    />
                ) : (
                    <button onClick={handleAddNewRecord}>
                        <span className='flex'>
                            <Add />
                            <p className='mr-2 text-sm text-blue-500'>
                                افزودن سابقه تحصیلی جدید
                            </p>
                        </span>
                    </button>
                )}
            </div>
        </div>
    );
};

export default EducationalRecordCards;
