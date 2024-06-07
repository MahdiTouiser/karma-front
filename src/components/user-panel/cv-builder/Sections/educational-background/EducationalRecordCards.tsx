import React from 'react';
import { toast } from 'react-toastify';
import Add from '../../../../../assets/icons/Add';
import Delete from '../../../../../assets/icons/Delete';
import Edit from '../../../../../assets/icons/Edit';
import useApi from '../../../../../hooks/useApi';
import useConfirm from '../../../../../hooks/useConfirm';
import { EducationalRecord } from '../../../../../models/cvbuilder.models';
import { DegreeLevelDescriptions } from '../../../../../models/enums';
import { BaseResponse } from '../../../../../models/shared.models';
import KCard from '../../../../shared/Card';
import NewEducationalRecord from './NewEducationalRecord';

interface EducationalRecordCardsProps {
    records: EducationalRecord[];
    refresh: () => void;
    setIsNewRecordVisible: (value: boolean) => void;
    isNewRecordVisible: boolean;
}

const EducationalRecordCards: React.FC<EducationalRecordCardsProps> = (props) => {
    const { records, refresh, setIsNewRecordVisible, isNewRecordVisible } = props;
    const { sendRequest: deleteRequest } = useApi<null, BaseResponse<null>>();
    const [ConfirmModal, confirmation] = useConfirm(
        "آیا از حذف این آیتم مطمئنید؟",
        "حذف سابقه تحصیلی"
    );

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

    const handleEditRecord = (id: string) => {
        console.log('Editing record with ID:', id);
    };

    const sortedRecords = [...records].sort((a, b) => a.fromYear - b.fromYear);

    return (
        <div>
            <ConfirmModal />
            {sortedRecords.map(record => (
                <KCard key={record.id} className='mt-4'>
                    <div className='flex align-middle items-center'>
                        <div className='flex flex-col ml-4 bg-gray-200 p-3 rounded'>
                            <button onClick={() => handleEditRecord(record.id)}>
                                <Edit />
                            </button>
                            <button onClick={() => handleDeleteRecord(record.id)}>
                                <Delete />
                            </button>
                        </div>
                        <div>
                            <p className='font-extrabold m-2 text-lg'>{getDegreeLabel(record.degreeLevel)} - {record.major.title}</p>
                            <p className='m-2'>{record.university.title}</p>
                            <p className='m-2'>{record.fromYear} - {record.toYear}</p>
                            <p className='m-2'>معدل : {record.gpa}</p>
                        </div>
                    </div>
                </KCard>
            ))}
            <div className='mt-4'>
                {isNewRecordVisible ? (
                    <NewEducationalRecord
                        setIsNewRecordVisible={setIsNewRecordVisible}
                        refresh={refresh}
                    />
                ) : (
                    <button onClick={() => setIsNewRecordVisible(true)}>
                        <span className='flex'>
                            <Add />
                            <p className='mr-2 text-blue-500 text-sm'>
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
