import { useState } from 'react';
import { DegreeLevel, DegreeLevelDescriptions } from '../../../../../models/enums';
import KLabel from '../../../../shared/Label';
import KRadioButton from '../../../../shared/RadioButton';

const NewEducationalRecord = () => {
    const options = Object.keys(DegreeLevelDescriptions).map((key) => ({
        label: DegreeLevelDescriptions[key as DegreeLevel],
        value: key,
    }));

    const [selectedOption, setSelectedOption] = useState<string>('')

    return (
        <div className='mt-4'>
            <div className='w-1/3'>
                <KLabel>مقطع تحصیلی</KLabel>
                <KRadioButton
                    groupName='degreeLevel'
                    options={options}
                    selectedOption={selectedOption}
                    onOptionChange={(value) => {
                        setSelectedOption(value);
                        console.log('Selected degree level:', value);
                    }}
                />
            </div>
        </div>
    );
};

export default NewEducationalRecord;
