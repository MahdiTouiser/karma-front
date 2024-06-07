import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import useApi from '../../../../../../hooks/useApi';
import { AddSofwareSkillFormData, SoftwareSkills } from '../../../../../../models/cvbuilder.models';
import { SkillLevels, skillLevelLabels } from '../../../../../../models/enums';
import { BaseResponse, OptionType } from '../../../../../../models/shared.models';
import KButton from '../../../../../shared/Button';
import KLabel from '../../../../../shared/Label';
import KModal from '../../../../../shared/Modal/Modal';
import KSelect from '../../../../../shared/Select';

const SoftwareSkillsModal: React.FC<{ show: boolean; onClose: () => void; onSuccess: () => void }> = ({ show, onClose, onSuccess }) => {
    const { register, handleSubmit, formState: { errors } } = useForm<AddSofwareSkillFormData>();
    const [skills, setSkills] = useState<OptionType[]>([]);
    const { sendRequest: fetch } = useApi<null, BaseResponse<null>>();
    const { sendRequest: AddSkillsData } = useApi<AddSofwareSkillFormData, BaseResponse<null>>();

    const fetchSkills = async () => {
        fetch(
            {
                url: '/SoftwareSkills',
                params: {
                    pageSize: 10000,
                    pageIndex: 1,
                },
            },
            (response) => {
                if (response) {
                    const softwareSkillsOptions: any = response.map((skill: SoftwareSkills) => ({
                        value: skill.id,
                        label: skill.title,
                    }));
                    setSkills(softwareSkillsOptions);
                }
            }
        );
    };

    useEffect(() => {
        fetchSkills()
    }, []);

    const handleFormSubmit = () => {
        handleSubmit(onSubmit)();
    };

    const onSubmit = async (data: AddSofwareSkillFormData) => {
        data.softwareSkillId = +data.softwareSkillId;
        AddSkillsData(
            {
                url: '/Resumes/AddSoftwareSkill',
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
                <h2> افزودن مهارت نرم افزاری جدید</h2>
            </KModal.Header>
            <KModal.Body>
                <form action="submit" onSubmit={handleSubmit(onSubmit)}>
                    <div className='m-5'>
                        <KLabel>مهارت ها</KLabel>
                        <KSelect {...register('softwareSkillId', { required: true })}>
                            {skills.map((language) => (
                                <option key={language.value} value={language.value}>{language.label}</option>
                            ))}
                        </KSelect>
                        {errors.softwareSkillId && <span className="text-red-500 text-xs">انتخاب مهارت الزامی است .</span>}
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
                        {errors.level && <span className='text-red-500 text-xs'> انتخاب سطح مهارت الزامی است .</span>}
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

export default SoftwareSkillsModal;
