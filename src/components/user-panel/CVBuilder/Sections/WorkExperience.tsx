import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import useAPi from '../../../../hooks/useApi';
import { BaseResponse } from '../../../../models/shared.models';
import KButton from '../../../shared/Button';
import KCheckbox from '../../../shared/Checkbox';
import KLabel from '../../../shared/Label';
import KSelect from '../../../shared/Select';
import KSpinner from '../../../shared/Spinner';
import KTextInput from '../../../shared/TextInput';

const hijriMonths = [
    { value: "", label: "انتخاب ماه" },
    { value: 1, label: "فروردین" },
    { value: 2, label: "اردیبهشت" },
    { value: 3, label: "خرداد" },
    { value: 4, label: "تیر" },
    { value: 5, label: "مرداد" },
    { value: 6, label: "شهریور" },
    { value: 7, label: "مهر" },
    { value: 8, label: "آبان" },
    { value: 9, label: "آذر" },
    { value: 10, label: "دی" },
    { value: 11, label: "بهمن" },
    { value: 12, label: "اسفند" },
];

const seniorityLevels = [
    { value: '', label: "انتخاب سطح" },
    { value: 'Beginner', label: "مبتدی" },
    { value: 'Intermediate', label: "متوسط" },
    { value: 'Advanced', label: "پیشرفته" },
    { value: 'Specialist', label: "کارشناس" },
    { value: 'Manager', label: "مدیر" },
];

interface FormData {
    jobTitle: string;
    jobcategoryId?: number;
    seniorityLevel: string;
    companyName: string;
    countryId?: number;
    cityId?: number;
    fromYear: number;
    fromMonth: number;
    toYear?: number;
    toMonth?: number;
    currentJob: boolean;
}

const WorkExperience: React.FC = () => {
    const [hasWorkExperience, setHasWorkExperience] = useState(false);
    const [currentJob, setCurrentJob] = useState(false);
    const { register, handleSubmit, formState: { errors }, control, reset } = useForm<FormData>();
    const { isPending } = useAPi<null, BaseResponse<null>>();

    const handleWorkExperienceChange = (checked: boolean) => {
        setHasWorkExperience(checked);
    };

    const handleCurrentJobChange = (checked: boolean) => {
        setCurrentJob(checked);
    };



    const onSubmit = (data: FormData) => {
        const formData = {
            ...data,
            currentJob: currentJob,
        };
        if (currentJob) {
            delete formData.toYear;
            delete formData.toMonth;
        }
        console.log(formData);
    };

    return (
        <div>
            <h1 className="text-2xl font-bold">سوابق شغلی</h1>
            <div className='flex justify-start mt-10 border-b-2'>
                <div className='p-5'>
                    <KCheckbox content={'سابقه شغلی ندارم .'} onChange={handleWorkExperienceChange} checked={hasWorkExperience} />
                </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
                {!hasWorkExperience && (
                    <>
                        <div className='flex justify-center mt-10'>
                            <div className="w-1/2 p-5">
                                <KLabel>عنوان شغلی</KLabel>
                                <KTextInput {...register('jobTitle')} />
                            </div>
                            <div className="w-1/2 p-5">
                                <KLabel>نام سازمان</KLabel>
                                <KTextInput {...register('companyName')} />
                            </div>
                        </div>
                        <div className='flex justify-center'>
                            <div className="w-1/2 p-5">
                                <KLabel>سطح ارشدیت</KLabel>
                                <KSelect {...register('seniorityLevel')}>
                                    {seniorityLevels.map((level) => (
                                        <option key={level.value} value={level.value}>{level.label}</option>
                                    ))}
                                </KSelect>
                            </div>
                            <div className="flex justify-center w-1/2">
                                <div className='w-1/2 p-5'>
                                    <KLabel>کشور</KLabel>
                                    <KTextInput type='number'  {...register('countryId')} />
                                </div>
                                <div className='w-1/2 p-5'>
                                    <KLabel>شهر</KLabel>
                                    <KTextInput {...register('cityId')} />
                                </div>
                            </div>
                        </div>
                        <div className='flex justify-start'>
                            <div className="flex justify-center w-1/2">
                                <div className='w-1/2 p-5'>
                                    <KLabel>ماه شروع</KLabel>
                                    <KSelect type='number' {...register('fromMonth')}>
                                        {hijriMonths.map((month) => (
                                            <option key={month.value} value={month.value}>{month.label}</option>
                                        ))}
                                    </KSelect>
                                </div>
                                <div className='w-1/2 p-5'>
                                    <KLabel>سال شروع</KLabel>
                                    <KTextInput numeric maxLength={4} {...register('fromYear')} />
                                </div>
                            </div>
                            {!currentJob && (
                                <div className='flex justify-center w-1/2'>
                                    <div className='w-1/2 p-5'>
                                        <KLabel>ماه پایان</KLabel>
                                        <KSelect {...register('toMonth')}>
                                            {hijriMonths.map((month) => (
                                                <option key={month.value} value={month.value}>{month.label}</option>
                                            ))}
                                        </KSelect>
                                    </div>
                                    <div className='w-1/2 p-5'>
                                        <KLabel>سال پایان</KLabel>
                                        <KTextInput numeric maxLength={4} {...register('toYear')} />
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className='p-5'>
                            <KCheckbox content={'هنوز در این شرکت مشغول به کار هستم .'} onChange={handleCurrentJobChange} checked={currentJob} />
                        </div>
                    </>
                )}

                <div className='flex justify-end p-5'>
                    <KButton color='secondary' className='ml-4'>
                        مرحله قبلی
                    </KButton>
                    {isPending ? <KSpinner color='primary' /> :
                        <KButton color='primary' type="submit">
                            ذخیره و مرحله بعد
                        </KButton>
                    }
                </div>
            </form>
        </div>
    );
};

export default WorkExperience;
