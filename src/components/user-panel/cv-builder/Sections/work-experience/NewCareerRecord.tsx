import React from 'react';
import KCard from '../../../../shared/Card';


interface NewCareerRecordProps {
    setIsNewRecordVisible: (visible: boolean) => void;
    refresh: () => void;
}
const NewCareerRecord: React.FC<NewCareerRecordProps> = ({ setIsNewRecordVisible, refresh }) => {
    return (
        <KCard>NewCareerRecord</KCard>
    )
}

export default NewCareerRecord