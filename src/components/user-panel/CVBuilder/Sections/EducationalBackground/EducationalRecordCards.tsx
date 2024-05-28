import React from 'react';
import Add from '../../../../../assets/icons/Add';
import Delete from '../../../../../assets/icons/Delete';
import Edit from '../../../../../assets/icons/Edit';
import { EducationalRecord } from '../../../../../models/cvbuilder.models';
import { DegreeLevelDescriptions } from '../../../../../models/enums';
import KCard from '../../../../shared/Card';

interface EducationalRecordCardsProps {
    records: EducationalRecord[];
}

const EducationalRecordCards: React.FC<EducationalRecordCardsProps> = (props) => {
    const { records } = props;
    console.log(records);

    // const { sendRequest: AddEducationalData, isPending } = useAPi<EducationalBackgroundFormData, BaseResponse<null>>();

    const getDegreeLabel = (value: string) => {
        return DegreeLevelDescriptions[value as keyof typeof DegreeLevelDescriptions] || value;
    };

    const handleDeleteRecord = (id: string) => {
        console.log('Deleting record with ID:', id);
    };

    const handleEditRecord = (id: string) => {
        console.log('Editing record with ID:', id);
    };

    const sortedRecords = [...records].sort((a, b) => a.fromYear - b.fromYear);

    return (
        <div>
            {sortedRecords.map(record => (
                <KCard key={record.id} className='mt-4'>
                    <div className='flex align-middle items-center'>
                        <div className='flex flex-col ml-4 bg-gray-100 p-3 rounded'>
                            <button onClick={() => handleEditRecord(record.id)}>
                                <Edit />
                            </button>
                            <button onClick={() => handleDeleteRecord(record.id)}>
                                <Delete />
                            </button>
                        </div>
                        <div>
                            <p className='font-extrabold m-2 text-lg'>{getDegreeLabel(record.degreeLevel)}</p>
                            <p className='m-2'>{record.university.title}</p>
                            <p className='m-2'>{record.fromYear} - {record.toYear}</p>
                            <p className='m-2'>معدل : {record.gpa}</p>
                        </div>
                    </div>
                </KCard>
            ))}
            <div className='p-4'>
                <button onClick={() => { console.log('mahdi'); }}>
                    <span className='flex'>
                        <Add />
                        <p className='mr-2 text-blue-500 text-sm'>
                            افزودن سابقه تحصیلی جدید
                        </p>
                    </span>
                </button>
            </div>
        </div>
    );
};

export default EducationalRecordCards;
