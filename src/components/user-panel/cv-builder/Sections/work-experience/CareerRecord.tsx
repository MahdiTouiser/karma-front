import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import useApi from '../../../../../hooks/useApi';
import { CareerRecordModel, WorkExperienceFormData } from '../../../../../models/cvbuilder.models';
import { SeniorityLevels, hijriMonthOptions, seniorityLevelLabels } from '../../../../../models/enums';
import { BaseResponse, OptionType } from '../../../../../models/shared.models';
import KButton from '../../../../shared/Button';
import KCheckbox from '../../../../shared/Checkbox';
import KLabel from '../../../../shared/Label';
import KSelect from '../../../../shared/Select';
import KSelectboxWithSearch from '../../../../shared/SelectboxWithSearch';
import KSpinner from '../../../../shared/Spinner';
import KTextInput from '../../../../shared/TextInput';

interface CareerRecordProps {
    setIsRecordVisible: (visible: boolean) => void;
    refresh: () => void;
    countries: OptionType[],
    cities: OptionType[],
    jobCategories: OptionType[],
    record?: CareerRecordModel | null;
}

const CareerRecord: React.FC<CareerRecordProps> = (props) => {
    const { setIsRecordVisible, refresh, countries, cities, jobCategories, record } = props;
    const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm<WorkExperienceFormData>();
    const [selectedCountry, setSelectedCountry] = useState<number | null>(1);
    const { sendRequest: AddWorkExperience, isPending } = useApi<Partial<WorkExperienceFormData>, BaseResponse<null>>();
    const { sendRequest: UpdateWorkExperience, isPending: UpdateIsPending } = useApi<Partial<WorkExperienceFormData>, BaseResponse<null>>();
    const [selectedCountryLabel, setSelectedCountryLabel] = useState<OptionType | null>(null);
    const [selectedCity, setSelectedCity] = useState<OptionType | null>(null);
    const [selectedJobCategroyId, setSelectedJobCategroyId] = useState<OptionType | null>(null);
    const [currentJob, setCurrentJob] = useState(false);

    useEffect(() => {
        if (record) {
            Object.keys(record).forEach((key) => {
                if (key === 'country') {
                    setValue('countryId', record.country.id);
                    setSelectedCountryLabel({ value: record.country.id, label: record.country.title });
                } else if (key === 'city') {
                    setValue('cityId', record.city.id);
                    setSelectedCity({ value: record.city.id, label: record.city.title });
                } else if (key === 'jobCategory') {
                    setValue('jobcategoryId', record.jobCategory.id);
                    setSelectedJobCategroyId({ value: record.jobCategory.id, label: record.jobCategory.title });
                } else {
                    setValue(key as keyof WorkExperienceFormData, (record as any)[key]);
                }
                setCurrentJob(record.currentJob);
            });
        }
    }, [record, setValue, reset]);

    const onSubmit = async (data: WorkExperienceFormData) => {
        if (currentJob) {
            data.toMonth = undefined;
            data.toYear = undefined;
        }
        const apiCall = record ? UpdateWorkExperience : AddWorkExperience;
        const url = record ? `/Resumes/UpdateCareerRecord/${record.id}` : '/Resumes/AddCareerRecord';
        const method = record ? 'put' : 'post';
        apiCall(
            {
                url: url,
                method: method,
                data: data,
            },
            (response) => {
                toast.success(response?.message);
                setIsRecordVisible(false);
                refresh();
            },
            (error) => {
                toast.error(error?.message);
            }
        );
    };

    const handleFormSubmit = () => {
        handleSubmit((data: WorkExperienceFormData) => onSubmit({ ...data, currentJob }))();
    };

    const handleCountryChange = (event: number) => {
        const countryId = event;
        setSelectedCountry(countryId);
        handleItemChange('countryId', countryId);
    };

    const handleItemChange = (item: 'jobcategoryId' | 'countryId' | 'cityId', value: number) => {
        setValue(item, value);
    };

    const handleItemAndCountryChange = (value: number) => {
        handleItemChange('countryId', value);
        handleCountryChange(value);
    };

    const handleCurrentJobChange = (checked: boolean) => {
        setCurrentJob(checked);
    };

    return (
        <>
            <form onSubmit={handleSubmit((data) => onSubmit({ ...data, currentJob }))}>
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
                                <KSelectboxWithSearch
                                    id='countryId'
                                    options={countries}
                                    register={register('countryId', { required: true })}
                                    errors={errors.countryId}
                                    onChange={handleItemAndCountryChange}
                                    defaultValue={selectedCountryLabel}
                                />
                                {errors.countryId && (
                                    <p className="text-red-500 text-xs">
                                        انتخاب کشور الزامی می باشد.
                                    </p>
                                )}
                            </div>
                            {selectedCountry === 1 && (
                                <div className='w-1/2'>
                                    <KLabel>شهر</KLabel>
                                    <KSelectboxWithSearch
                                        id='cityId'
                                        options={cities}
                                        register={register('cityId', { required: true })}
                                        errors={errors.cityId}
                                        onChange={(value: number) => handleItemChange('cityId', value)}
                                        defaultValue={selectedCity}
                                    />
                                </div>
                            )}
                        </div>
                        {!currentJob && (
                            <div className='flex justify-start w-full mt-4'>
                                <div className='w-1/2 ml-2'>
                                    <KLabel>ماه پایان</KLabel>
                                    <KSelect
                                        {...register('toMonth', {
                                            setValueAs: value => value === "" ? undefined : Number(value)
                                        })}
                                    >
                                        {hijriMonthOptions.map(option => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </KSelect>
                                </div>
                                <div className='w-1/2'>
                                    <KLabel>سال پایان</KLabel>
                                    <KTextInput numeric maxLength={4}
                                        {...register('toYear', {
                                            required: true,
                                            setValueAs: value => value === "" ? undefined : Number(value)
                                        })} />
                                </div>
                            </div>
                        )}
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
                                <KSelectboxWithSearch
                                    id='jobcategoryId'
                                    options={jobCategories}
                                    register={register('jobcategoryId', { required: true })}
                                    errors={errors.jobcategoryId}
                                    onChange={(value: number) => handleItemChange('jobcategoryId', value)}
                                    defaultValue={selectedJobCategroyId}
                                />
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
                                <KSelect
                                    {...register('fromMonth', {
                                        required: true,
                                        setValueAs: value => value === "" ? undefined : Number(value)
                                    })}
                                >
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
                                <KTextInput numeric maxLength={4}
                                    {...register('fromYear', {
                                        required: true,
                                        setValueAs: value => value === "" ? undefined : Number(value)
                                    })} />
                                {errors.fromYear && (
                                    <p className="text-red-500 text-xs">
                                        سال شروع الزامی می باشد.
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className='p-5'>
                    <KCheckbox content={'هنوز در این شرکت مشغول به کار هستم .'} onChange={handleCurrentJobChange} checked={currentJob} />
                </div>
            </form>
            <div className='flex justify-end p-5'>
                <KButton color='secondary' className='ml-4' onClick={() => setIsRecordVisible(false)}>
                    انصراف
                </KButton>
                {(isPending || UpdateIsPending) ? <KSpinner color='primary' /> :
                    <KButton color='primary' type="button" onClick={handleFormSubmit}>
                        ذخیره
                    </KButton>
                }
            </div>
        </>
    );
};

export default CareerRecord;
