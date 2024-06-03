import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import useApi from '../../../../../../hooks/useApi';
import { Languages } from '../../../../../../models/cvbuilder.models';
import { SeniorityLevels, seniorityLevelLabels } from '../../../../../../models/enums';
import { BaseResponse, OptionType } from '../../../../../../models/shared.models';
import KButton from '../../../../../shared/Button';
import KLabel from '../../../../../shared/Label';
import KModal from '../../../../../shared/Modal/Modal';
import KSelect from '../../../../../shared/Select';

const LanguagesModal: React.FC<{ show: boolean; onClose: () => void }> = ({ show, onClose }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { sendRequest: fetchLangs } = useApi<null, BaseResponse<null>>();
    const [languages, setLanguages] = useState<OptionType[]>([]);


    const fetchLanguages = async () => {
        fetchLangs(
            {
                url: "/Languages",
                params: {
                    pageSize: 10000,
                    pageIndex: 1,
                },
            },
            (response) => {
                if (response) {
                    const languagesOptions: any = response.map((Languages: Languages) => ({
                        value: Languages.id,
                        label: Languages.title,
                    }));
                    setLanguages(languagesOptions);

                }
            }
        );
    };

    useEffect(() => {
        fetchLanguages()
    }, []);

    return (
        <KModal show={show} onClose={onClose} containerClass="!w-full !max-w-[40vw] !md:max-w-[70vw] !lg:max-w-[60vw] !pb-2">
            <KModal.Header>
                <h2>زبان ها</h2>
            </KModal.Header>
            <div className='p-4'>
                <KModal.Body>
                    <div className='m-5'>
                        <KLabel>زبان</KLabel>
                        <KSelect {...register('languageId', { required: true })}>
                            {languages.map((language) => (
                                <option key={language.value} value={language.value}>{language.label}</option>
                            ))}
                        </KSelect>
                    </div>
                    <div className='m-5'>
                        <KLabel>سطح مهارت</KLabel>
                        <KSelect {...register('seniorityLevel', { required: true })}>
                            {Object.values(SeniorityLevels).map((seniorityValue) => (
                                <option key={seniorityValue} value={seniorityValue}>
                                    {seniorityLevelLabels[seniorityValue as SeniorityLevels]}
                                </option>
                            ))}
                        </KSelect>
                    </div>
                </KModal.Body>
            </div>
            <div className='flex justify-end mx-4'>
                <KButton color="primary">
                    ذخیره
                </KButton>
            </div>
        </KModal>
    );
};

export default LanguagesModal;
