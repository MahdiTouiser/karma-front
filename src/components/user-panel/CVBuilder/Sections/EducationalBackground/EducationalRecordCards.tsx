import React from 'react';
import { EducationalRecord } from '../../../../../models/cvbuilder.models';
import KCard from '../../../../shared/Card';

interface EducationalRecordCardsProps {
    records: EducationalRecord[];
}

const EducationalRecordCards: React.FC<EducationalRecordCardsProps> = (props) => {
    const { records } = props;
    console.log(records);

    const degrees = [
        { label: 'دیپلم', value: 'Diploma' },
        { label: 'فوق دیپلم', value: 'Associate' },
        { label: 'کارشناسی', value: 'Bachelor' },
        { label: 'کارشناسی ارشد', value: 'Master' },
        { label: 'دکترا', value: 'Phd' }
    ];

    const getDegreeLabel = (value: string) => {
        const degree = degrees.find(deg => deg.value === value);
        return degree ? degree.label : value;
    };

    const sortedRecords = [...records].sort((a, b) => a.fromYear - b.fromYear);

    return (
        <div>
            {sortedRecords.map(record => (
                <KCard key={record.id} className='mt-5'>
                    <p className='font-extrabold m-2'>{getDegreeLabel(record.degreeLevel)}</p>
                    <p className='m-2'>{record.university.title}</p>
                    <p className='m-2'>{record.fromYear} - {record.toYear}</p>
                    <p className='m-2'>معدل : {record.gpa}</p>
                </KCard>
            ))}
        </div>
    );
};

export default EducationalRecordCards;
