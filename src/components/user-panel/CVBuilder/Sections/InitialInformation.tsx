import React, { useEffect } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import useAPi from '../../../../hooks/useApi';
import { initialInformationFormData } from '../../../../models/cvbuilder.models';
import { BaseResponse } from '../../../../models/shared.models';
import KDatepicker from '../../../shared/DatePicker';
import KSelect from '../../../shared/Select';
import KTextInput from '../../../shared/TextInput';


interface InitialInformationProps {
    onSubmitSuccess: () => void;
}


const InitialInformation: React.FC<InitialInformationProps> = ({ onSubmitSuccess }) => {

    const { register, handleSubmit, formState: { errors }, control, reset
    } = useForm();

    const { sendRequest, isPending } = useAPi<
        initialInformationFormData,
        BaseResponse<null>
    >();

    const { sendRequest: getData } = useAPi<
        initialInformationFormData,
        BaseResponse<null>
    >();

    useEffect(() => {
        getData(
            {
                url: "/Resumes/BasicInfo",
            },
            (response) => {
                console.log(response);
                reset(response);
            },
            (error) => {
                toast.error(error?.message);
            }
        );
    }, [getData, reset]);



    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        const formData: initialInformationFormData = data as initialInformationFormData;
        console.log(formData);

        sendRequest(
            {
                url: "/Resumes/BasicInfo",
                method: "put",
                data: formData,
            },
            (response) => {
                toast.success(response.message);
                onSubmitSuccess();
            },
            (error) => {
                toast.error(error?.message);
            }
        );
    };


    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <h1 className="text-2xl font-bold">اطلاعات اولیه</h1>
                <div className='flex justify-center mt-40'>
                    <div className="w-1/2 p-5">
                        <KTextInput placeholder='نام'  {...register('firstName', { required: true })} />
                        {errors.firstName && <span className="text-red-500 text-sm">نام الزامی است</span>}
                    </div>
                    <div className="w-1/2 p-5">
                        <KTextInput placeholder='نام خانوادگی' {...register('lastName', { required: true })} />
                        {errors.lastName && <span className="text-red-500 text-sm">نام خانوادگی الزامی است</span>}
                    </div>
                </div>
                <div className='flex justify-center mt-10'>
                    <div className="w-1/2 p-5">
                        <KSelect id='gender' placeholder="جنسیت"  {...register('gender', { required: true })}>
                            <option value="Male">مرد</option>
                            <option value="Female">زن</option>
                        </KSelect>
                        {errors.gender && <span className="text-red-500 text-sm">جنسیت الزامی است</span>}
                    </div>
                    <div className="w-1/2 p-5">
                        <KSelect id='maritalStatus' placeholder="وضعیت تاهل" {...register('maritalStatus', { required: true })}>
                            <option value="married">متاهل</option>
                            <option value="Single">مجرد</option>
                        </KSelect>
                        {errors.maritalStatus && <span className="text-red-500 text-sm">وضعیت تاهل الزامی است</span>}
                    </div>
                </div>
                <div className='flex justify-center mt-10'>
                    <div className="w-1/2 p-5">
                        <KSelect id='militaryServiceStatus' placeholder="وضعیت نظام وظیفه" {...register('militaryServiceStatus', { required: true })}>
                            <option value="done">انجام شده</option>
                            <option value="exemptPermanent">معاف دائم</option>
                            <option value="exemptEducational">معافیت تحصیلی</option>
                            <option value="inProgress">در حال انجام</option>
                            <option value="SubjectToService">مشمول</option>
                        </KSelect>
                        {errors.militaryServiceStatus && <span className="text-red-500 text-sm">وضعیت نظام وظیفه الزامی است</span>}
                    </div>
                    <div className="w-1/2 p-5">
                        <KTextInput placeholder='شهر محل سکونت' {...register('city', { required: true })} />
                        {errors.city && <span className="text-red-500 text-sm">شهر محل سکونت الزامی است</span>}
                    </div>
                </div>
                <div className='flex justify-center mt-10'>
                    <div className="w-1/2 p-5">
                        <KTextInput placeholder='شماره تلفن ثابت'
                            {...register('telephone', { required: true })} maxLength={11} />
                        {errors.telephone && <span className="text-red-500 text-sm">شماره تلفن ثابت الزامی است</span>}
                    </div>
                    <div className="w-1/2 p-5">
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
            </div>
            {/* <div className='flex justify-end p-5'>
                <KButton color='secondary' className='ml-4'>
                    مرحله قبلی
                </KButton>
                {isPending ? <KSpinner color='primary' /> :
                    <KButton color='primary' type="submit">
                        ذخیره و مرحله بعد
                    </KButton>
                }
            </div> */}
        </form>
    );
};

export default InitialInformation;
