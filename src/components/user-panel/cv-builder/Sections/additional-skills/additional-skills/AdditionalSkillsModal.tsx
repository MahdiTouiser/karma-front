import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import useApi from '../../../../../../hooks/useApi';
import { AddAdditionalSkillsFormData } from '../../../../../../models/cvbuilder.models';
import { BaseResponse } from '../../../../../../models/shared.models';
import KButton from '../../../../../shared/Button';
import KLabel from '../../../../../shared/Label';
import KModal from '../../../../../shared/Modal/Modal';
import KTextInput from '../../../../../shared/TextInput';

const AdditionalSkillsModal: React.FC<{ show: boolean; onClose: () => void; onSuccess: () => void }> = ({ show, onClose, onSuccess }) => {
    const { register, handleSubmit, formState: { errors } } = useForm<AddAdditionalSkillsFormData>();
    const { sendRequest: AddSkillsData } = useApi<AddAdditionalSkillsFormData, BaseResponse<null>>();



    const handleFormSubmit = () => {
        handleSubmit(onSubmit)();
    };

    const onSubmit = async (data: AddAdditionalSkillsFormData) => {
        AddSkillsData(
            {
                url: '/Resumes/AddAdditionalSkill',
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
                <h2>مهارت های تکمیلی</h2>
            </KModal.Header>
            <KModal.Body>
                <form action="submit" onSubmit={handleSubmit(onSubmit)}>
                    <div className='m-5'>
                        <KLabel>مهارت ها</KLabel>
                        <KTextInput placeholder='مهارت های تکمیلی خود را بنویسید' {...register('title', { required: true })} />
                        {errors.title && (
                            <p className="text-red-500 text-xs">
                                عنوان شغلی الزامی می باشد.
                            </p>
                        )}
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

export default AdditionalSkillsModal;
