import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import useApi from '../../../../../../hooks/useApi';
import { AddLanguageFormData, Languages } from '../../../../../../models/cvbuilder.models';
import { SkillLevels, skillLevelLabels } from '../../../../../../models/enums';
import { BaseResponse, OptionType } from '../../../../../../models/shared.models';
import KButton from '../../../../../shared/Button';
import KLabel from '../../../../../shared/Label';
import KModal from '../../../../../shared/Modal/Modal';
import KSelect from '../../../../../shared/Select';

const LanguagesModal: React.FC<{ show: boolean; onClose: () => void; onSuccess: () => void }> = ({ show, onClose, onSuccess }) => {
    const { register, handleSubmit, formState: { errors } } = useForm<AddLanguageFormData>();
    const [languages, setLanguages] = useState<OptionType[]>([]);
    const { sendRequest: fetch } = useApi<null, BaseResponse<null>>();
    const { sendRequest: AddLanguageData } = useApi<AddLanguageFormData, BaseResponse<null>>();

    const fetchLanguages = async () => {
        fetch(
            {
                url: "/Languages",
                params: {
                    pageSize: 10000,
                    pageIndex: 1,
                },
            },
            (response) => {
                if (response) {
                    const languagesOptions: any = response.map((language: Languages) => ({
                        value: language.id,
                        label: language.title,
                    }));
                    setLanguages(languagesOptions);
                }
            }
        );
    };

    useEffect(() => {
        fetchLanguages()
    }, []);

    const handleFormSubmit = () => {
        handleSubmit(onSubmit)();
    };

    const onSubmit = async (data: AddLanguageFormData) => {
        data.languageId = +data.languageId;
        AddLanguageData(
            {
                url: '/Resumes/AddLanguage',
                method: 'post',
                data: data,
            },
            (response) => {
                toast.success(response?.message);
                onClose();
                onSuccess();
            },
            (error) => {
                toast.error(error?.message);
            }
        );
    };

    return (
        <KModal show={show} onClose={onClose} containerClass="!w-full !max-w-[40vw] !md:max-w-[70vw] !lg:max-w-[60vw] !pb-2">
            <KModal.Header>
                <h2> افزودن مهارت زبان جدید </h2>
            </KModal.Header>
            <KModal.Body>
                <form action="submit" onSubmit={handleSubmit(onSubmit)}>
                    <div className='m-5'>
                        <KLabel>زبان</KLabel>
                        <KSelect {...register('languageId', { required: true })}>
                            {languages.map((language) => (
                                <option key={language.value} value={language.value}>{language.label}</option>
                            ))}
                        </KSelect>
                        {errors.languageId && <span className="text-red-500 text-xs">انتخاب زبان الزامی است .</span>}
                    </div>
                    <div className='m-5'>
                        <KLabel>سطح مهارت</KLabel>
                        <KSelect {...register('level', { required: true })}>
                            {Object.values(SkillLevels).map((skillValue) => (
                                <option key={skillValue} value={skillValue}>
                                    {skillLevelLabels[skillValue as SkillLevels]}
                                </option>
                            ))}
                        </KSelect>
                        {errors.level && <span className="text-red-500 text-xs"> انتخاب سطح مهارت الزامی است .</span>}
                    </div>
                </form>
            </KModal.Body>
            <div className='flex justify-end mx-4'>
                <KButton color="primary" onClick={handleFormSubmit}>
                    ذخیره
                </KButton>
            </div>
        </KModal>
    );
};

export default LanguagesModal;
