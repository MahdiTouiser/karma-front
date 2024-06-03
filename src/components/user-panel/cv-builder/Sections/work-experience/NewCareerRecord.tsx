import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import useApi from '../../../../../hooks/useApi';
import { WorkExperienceFormData } from '../../../../../models/cvbuilder.models';
import { SeniorityLevels, hijriMonthOptions, seniorityLevelLabels } from '../../../../../models/enums';
import { BaseResponse, OptionType } from '../../../../../models/shared.models';
import KButton from '../../../../shared/Button';
import KLabel from '../../../../shared/Label';
import KSelect from '../../../../shared/Select';
import KSpinner from '../../../../shared/Spinner';
import KTextInput from '../../../../shared/TextInput';

interface NewCareerRecordProps {
    setIsNewRecordVisible: (visible: boolean) => void;
    refresh: () => void;
    countries: OptionType[],
    cities: OptionType[],
    jobCategories: OptionType[]
}

const NewCareerRecord: React.FC<NewCareerRecordProps> = (props) => {
    const { setIsNewRecordVisible, refresh, countries, cities, jobCategories } = props;
    const { register, handleSubmit, formState: { errors } } = useForm<WorkExperienceFormData>();
    const [selectedCountry, setSelectedCountry] = useState<number | undefined>(1);
    const { sendRequest: AddWorkExperience, isPending } = useApi<Partial<WorkExperienceFormData>, BaseResponse<null>>();

    const convertToType = (key: keyof WorkExperienceFormData, value: string | undefined): any => {
        switch (key) {
            case 'jobcategoryId':
            case 'fromYear':
            case 'toYear':
            case 'cityId':
            case 'countryId':
            case 'fromMonth':
            case 'toMonth':
                return value ? parseInt(value, 10) : undefined;
            default:
                return value || '';
        }
    };

    const onSubmit = async (data: WorkExperienceFormData) => {
        const finalData: Partial<WorkExperienceFormData> = {};
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                finalData[key as keyof WorkExperienceFormData] = convertToType(
                    key as keyof WorkExperienceFormData,
                    data[key as keyof WorkExperienceFormData] as unknown as string
                );
            }
        }
        AddWorkExperience(
            {
                url: "/Resumes/AddCareerRecord",
                method: "post",
                data: finalData,
            },
            (response) => {
                toast.success(response?.message);
                setIsNewRecordVisible(false);
                refresh();
            },
            (error) => {
                toast.error(error?.message);
            }
        );
        console.log(finalData);
    };

    const handleFormSubmit = () => {
        handleSubmit(onSubmit)();
    };

    const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const countryId = parseInt(event.target.value);
        setSelectedCountry(countryId);
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='flex w-full'>
                    <div className='w-1/2 pr-4 mt-4'>
                        <div className='inline-block w-full'>
                            <KLabel>عنوان شغلی</KLabel>
                            <KTextInput {...register('jobTitle', { required: true })} />
                            {errors.jobTitle && (
                                <p className="text-red-500 text-xs">
                                    عنوان شغلی الزامی می باشد.
                                </p>
                            )}
                        </div>
                        <div className='mt-4'>
                            <div className='inline-block w-full'>
                                <KLabel>سطح ارشدیت</KLabel>
                                <KSelect {...register('seniorityLevel', { required: true })}>
                                    {Object.values(SeniorityLevels).map((seniorityValue) => (
                                        <option key={seniorityValue} value={seniorityValue}>
                                            {seniorityLevelLabels[seniorityValue as SeniorityLevels]}
                                        </option>
                                    ))}
                                </KSelect>
                                {errors.seniorityLevel && (
                                    <p className="text-red-500 text-xs">
                                        سطح ارشدیت الزامی می باشد.
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className='flex mt-4'>
                            <div className='w-1/2 ml-2'>
                                <KLabel>کشور</KLabel>
                                <KSelect {...register('countryId', { required: true })} onChange={handleCountryChange}>
                                    {countries.map((country) => (
                                        <option key={country.value} value={country.value}>{country.label}</option>
                                    ))}
                                </KSelect>
                                {errors.countryId && (
                                    <p className="text-red-500 text-xs">
                                        انتخاب کشور الزامی می باشد.
                                    </p>
                                )}
                            </div>
                            {selectedCountry === 1 && (
                                <div className='w-1/2'>
                                    <KLabel>شهر</KLabel>
                                    <KSelect {...register('cityId')}>
                                        {cities.map((city) => (
                                            <option key={city.value} value={city.value}>{city.label}</option>
                                        ))}
                                    </KSelect>
                                </div>
                            )}
                        </div>
                        <div className='flex justify-start w-full mt-4'>
                            <div className='w-1/2 ml-2'>
                                <KLabel>ماه پایان</KLabel>
                                <KSelect {...register('toMonth')}>
                                    {hijriMonthOptions.map(option => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </KSelect>
                            </div>
                            <div className='w-1/2'>
                                <KLabel>سال پایان</KLabel>
                                <KTextInput numeric maxLength={4} {...register('toYear')} />
                            </div>
                        </div>
                    </div>
                    <div className='w-1/2 pr-4 mt-4'>
                        <div className='inline-block w-full'>
                            <KLabel>نام سازمان</KLabel>
                            <KTextInput {...register('companyName', { required: true })} />
                            {errors.companyName && (
                                <p className="text-red-500 text-xs">
                                    نام سازمان الزامی می باشد.
                                </p>
                            )}
                        </div>
                        <div className='mt-4'>
                            <div className='inline-block w-full'>
                                <KLabel>زمینه کاری شما</KLabel>
                                <KSelect {...register('jobcategoryId', { required: true })}>
                                    {jobCategories.map((level) => (
                                        <option key={level.value} value={level.value}>{level.label}</option>
                                    ))}
                                </KSelect>
                                {errors.jobcategoryId && (
                                    <p className="text-red-500 text-xs">
                                        زمینه کاری الزامی می باشد.
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className='flex mt-4'>
                            <div className='w-1/2 ml-2'>
                                <KLabel>ماه شروع</KLabel>
                                <KSelect {...register('fromMonth', { required: true })}>
                                    {hijriMonthOptions.map(option => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </KSelect>
                                {errors.fromMonth && (
                                    <p className="text-red-500 text-xs">
                                        ماه شروع الزامی می باشد.
                                    </p>
                                )}
                            </div>
                            <div className='w-1/2'>
                                <KLabel>سال شروع</KLabel>
                                <KTextInput numeric maxLength={4} {...register('fromYear', { required: true })} />
                                {errors.fromYear && (
                                    <p className="text-red-500 text-xs">
                                        سال شروع الزامی می باشد.
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </form>
            <div className='flex justify-end p-5'>
                <KButton color='secondary' className='ml-4' onClick={() => setIsNewRecordVisible(false)}>
                    انصراف
                </KButton>
                {isPending ? <KSpinner color='primary' /> :
                    <KButton color='primary' type="button" onClick={handleFormSubmit}>
                        ذخیره
                    </KButton>
                }
            </div>
        </>
    );
};

export default NewCareerRecord;
