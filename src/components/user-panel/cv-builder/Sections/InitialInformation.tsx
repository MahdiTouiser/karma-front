import React, { useEffect } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import useApi from '../../../../hooks/useApi';
import { InitialInformationFormData } from '../../../../models/cvbuilder.models';
import { militaryServiceStatusMapping } from '../../../../models/enums';
import { BaseResponse } from '../../../../models/shared.models';
import KButton from '../../../shared/Button';
import KDatepicker from '../../../shared/DatePicker';
import KLabel from '../../../shared/Label';
import KSelect from '../../../shared/Select';
import KSpinner from '../../../shared/Spinner';
import KTextInput from '../../../shared/TextInput';

interface InitialInformationProps {
    onSubmitSuccess: () => void;
}

const InitialInformation: React.FC<InitialInformationProps> = ({ onSubmitSuccess }) => {
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
            { url: "/Resumes/BasicInfo", method: "put", data: formData },
            (response) => {
                toast.success(response.message);
                onSubmitSuccess();
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
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <h1 className="text-2xl font-bold">اطلاعات اولیه</h1>
                <div className='flex justify-center mt-40'>
                    <div className="w-1/2 p-5">
                        <KLabel>نام</KLabel>
                        <KTextInput placeholder='نام'  {...register('firstName', { required: true })} />
                        {errors.firstName && <span className="text-red-500 text-sm">نام الزامی است</span>}
                    </div>
                    <div className="w-1/2 p-5">
                        <KLabel>نام خانوادگی</KLabel>
                        <KTextInput {...register('lastName', { required: true })} />
                        {errors.lastName && <span className="text-red-500 text-sm">نام خانوادگی الزامی است</span>}
                    </div>
                </div>
                <div className='flex justify-center'>
                    <div className="w-1/2 p-5">
                        <KLabel>جنسیت</KLabel>
                        <KSelect id='gender'  {...register('gender', { required: true })}>
                            <option value="Male">مرد</option>
                            <option value="Female">زن</option>
                        </KSelect>
                        {errors.gender && <span className="text-red-500 text-sm">جنسیت الزامی است</span>}
                    </div>
                    <div className="w-1/2 p-5">
                        <KLabel>وضعیت تاهل</KLabel>
                        <KSelect id='maritalStatus'  {...register('maritalStatus', { required: true })}>
                            <option value="married">متاهل</option>
                            <option value="Single">مجرد</option>
                        </KSelect>
                        {errors.maritalStatus && <span className="text-red-500 text-sm">وضعیت تاهل الزامی است</span>}
                    </div>
                </div>
                <div className='flex justify-center'>
                    <div className="w-1/2 p-5">
                        <KLabel>وضعیت نظام وظیفه</KLabel>
                        <KSelect
                            id='militaryServiceStatus'
                            {...register('militaryServiceStatus', { required: true })}
                        >
                            {Object.values(militaryServiceStatusMapping).map(status => (
                                <option key={status.value} value={status.value}>
                                    {status.label}
                                </option>
                            ))}
                        </KSelect>
                        {errors.militaryServiceStatus && <span className="text-red-500 text-sm">وضعیت نظام وظیفه الزامی است</span>}
                    </div>
                    <div className="w-1/2 p-5">
                        <KLabel>شهر محل سکونت</KLabel>
                        <KTextInput  {...register('city', { required: true })} />
                        {errors.city && <span className="text-red-500 text-sm">شهر محل سکونت الزامی است</span>}
                    </div>
                </div>
                <div className='flex justify-center'>
                    <div className="w-1/2 p-5">
                        <KLabel>شماره تلفن ثابت</KLabel>
                        <KTextInput placeholder='شماره تلفن ثابت'
                            {...register('telephone', { required: true })} maxLength={11} />
                        {errors.telephone && <span className="text-red-500 text-sm">شماره تلفن ثابت الزامی است</span>}
                    </div>
                    <div className="w-1/2 p-5">
                        <KLabel>تاریخ تولد</KLabel>
                        <KDatepicker
                            name="birthDate"
                            control={control}
                            required={true}
                            id="birthDate"
                            placeholder='تاریخ تولد'
                        ></KDatepicker>
                        {errors.birthDate && (
                            <p className="text-red-500 text-sm">
                                تاریخ تولد الزامی می باشد.
                            </p>
                        )}
                    </div>
                </div>
                <div className='flex justify-end p-5'>
                    {isPending ? <KSpinner color='primary' /> :
                        <KButton color='primary' type="button" onClick={handleFormSubmit}>
                            ذخیره و مرحله بعد
                        </KButton>
                    }
                </div>
            </div>
        </form>
    );
};

export default InitialInformation;
