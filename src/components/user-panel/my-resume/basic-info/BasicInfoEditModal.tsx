import React, { useEffect } from 'react';

import {
    FieldValues,
    SubmitHandler,
    useForm,
} from 'react-hook-form';
import { toast } from 'react-toastify';

import useApi from '../../../../hooks/useApi';
import {
    InitialInformationFormData,
} from '../../../../models/cvbuilder.models';
import { militaryServiceStatusMapping } from '../../../../models/enums';
import { BaseResponse } from '../../../../models/shared.models';
import KButton from '../../../shared/Button';
import KDatepicker from '../../../shared/DatePicker';
import KModal from '../../../shared/Modal/Modal';
import KSelect from '../../../shared/Select';
import KSpinner from '../../../shared/Spinner';
import KTextInput from '../../../shared/TextInput';

const BasicInfoEditModal: React.FC<{ show: boolean; onClose: () => void; fetch: () => void }> = ({ show, onClose, fetch }) => {
    const { register, handleSubmit, formState: { errors }, control, reset } = useForm();
    const { sendRequest, isPending } = useApi<InitialInformationFormData, BaseResponse<null>>();
    const { sendRequest: getData } = useApi<InitialInformationFormData, BaseResponse<null>>();

    useEffect(() => {
        getData(
            { url: "/Resumes/BasicInfo" },
            (response) => {
                reset(response);
            },
            (error) => {
                toast.error(error?.message);
            }
        );
    }, [getData, reset]);

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        const formData: InitialInformationFormData = data as InitialInformationFormData;
        sendRequest(
            {
                url: '/Resumes/BasicInfo',
                method: 'put',
                data: formData,
            },
            (response) => {
                toast.success(response.message);
                fetch();
                onClose();
            },
            (error) => {
                toast.error(error?.message);
            }
        );
    };

    const handleFormSubmit = () => {
        handleSubmit(onSubmit)();
    };

    return (
        <KModal show={show} onClose={onClose} containerClass="!w-full !max-w-[90vw] !md:max-w-[80vw] !lg:max-w-[60vw] !pb-2">
            <KModal.Header>
                <h2>ویرایش اطلاعات اولیه</h2>
            </KModal.Header>
            <KModal.Body>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='flex flex-wrap justify-between'>
                        {/* First Name and Last Name */}
                        <div className="w-full px-2 md:w-1/2">
                            <KTextInput {...register('firstName', { required: true })} placeholder='نام' />
                            {errors.firstName && <span className="text-sm text-red-500">نام الزامی است</span>}
                        </div>
                        <div className="w-full px-2 md:w-1/2">
                            <KTextInput {...register('lastName', { required: true })} placeholder='نام خانوادگی' />
                            {errors.lastName && <span className="text-sm text-red-500">نام خانوادگی الزامی است</span>}
                        </div>

                        {/* Gender and Marital Status */}
                        <div className="w-full px-2 mt-4 md:w-1/2">
                            <KSelect id='gender' placeholder="جنسیت" {...register('gender', { required: true })}>
                                <option value="Male">مرد</option>
                                <option value="Female">زن</option>
                            </KSelect>
                            {errors.gender && <span className="text-sm text-red-500">جنسیت الزامی است</span>}
                        </div>
                        <div className="w-full px-2 mt-4 md:w-1/2">
                            <KSelect id='maritalStatus' placeholder="وضعیت تاهل" {...register('maritalStatus', { required: true })}>
                                <option value="married">متاهل</option>
                                <option value="Single">مجرد</option>
                            </KSelect>
                            {errors.maritalStatus && <span className="text-sm text-red-500">وضعیت تاهل الزامی است</span>}
                        </div>

                        {/* Military Service Status and City */}
                        <div className="w-full px-2 mt-4 md:w-1/2">
                            <KSelect id='militaryServiceStatus' placeholder="وضعیت نظام وظیفه" {...register('militaryServiceStatus', { required: true })}>
                                {Object.entries(militaryServiceStatusMapping).map(([key, value]) => (
                                    <option key={key} value={value.value}>
                                        {value.label}
                                    </option>
                                ))}
                            </KSelect>
                            {errors.militaryServiceStatus && <span className="text-sm text-red-500">وضعیت نظام وظیفه الزامی است</span>}
                        </div>
                        <div className="w-full px-2 mt-4 md:w-1/2">
                            <KTextInput {...register('city', { required: true })} placeholder='شهر محل سکونت' />
                            {errors.city && <span className="text-sm text-red-500">شهر محل سکونت الزامی است</span>}
                        </div>

                        <div className="w-full px-2 mt-4 md:w-1/2">
                            <KTextInput {...register('telephone', { required: true })} placeholder='شماره تلفن ثابت' maxLength={11} />
                            {errors.telephone && <span className="text-sm text-red-500">شماره تلفن ثابت الزامی است</span>}
                        </div>
                        <div className="w-full px-2 mt-4 md:w-1/2">
                            <KDatepicker
                                name="birthDate"
                                control={control}
                                required={true}
                                id="birthDate"
                                placeholder='تاریخ تولد'
                            />
                            {errors.birthDate && (
                                <p className="text-sm text-red-500">
                                    تاریخ تولد الزامی می باشد.
                                </p>
                            )}
                        </div>
                    </div>
                    <div className='flex justify-end p-5'>
                        {isPending ? <KSpinner color='primary' /> :
                            <KButton color='primary' type="button" onClick={handleFormSubmit}>
                                ذخیره
                            </KButton>
                        }
                    </div>
                </form>
            </KModal.Body>
        </KModal>
    );
};

export default BasicInfoEditModal;