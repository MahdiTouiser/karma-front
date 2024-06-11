import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import useApi from '../../../../../hooks/useApi';
import { CareerRecord, City, Country, JobCategories, WorkExperienceFormData } from '../../../../../models/cvbuilder.models';
import { SeniorityLevels, hijriMonthOptions, seniorityLevelLabels } from '../../../../../models/enums';
import { BaseResponse, OptionType } from '../../../../../models/shared.models';
import KButton from '../../../../shared/Button';
import KCheckbox from '../../../../shared/Checkbox';
import KLabel from '../../../../shared/Label';
import KSelect from '../../../../shared/Select';
import KSelectboxWithSearch from '../../../../shared/SelectboxWithSearch';
import KSpinner from '../../../../shared/Spinner';
import KTextInput from '../../../../shared/TextInput';
import WorkExperienceRecordCards from './WorkExperienceRecordCards';

const WorkExperience: React.FC<{ goToPreviousStep: () => void, onSubmitSuccess: () => void }> = (props) => {
    const { goToPreviousStep, onSubmitSuccess } = props;
    const [hasWorkExperience, setHasWorkExperience] = useState(false);
    const [currentJob, setCurrentJob] = useState(false);
    const [isRecordCreated, setIsRecordCreated] = useState(false);
    const [countries, setCountries] = useState<OptionType[]>([]);
    const [cities, setCities] = useState<OptionType[]>([]);
    const [jobCategories, setJobCategories] = useState<OptionType[]>([]);
    const [selectedCountry, setSelectedCountry] = useState<number | undefined>(1);
    const [careerRecords, setCareerRecords] = useState<CareerRecord[]>([]);
    const [isRecordVisible, setIsRecordVisible] = useState(false);
    const { register, handleSubmit, formState: { errors }, setValue } = useForm<WorkExperienceFormData>();
    const { sendRequest: countrySendRequest } = useApi<null, BaseResponse<Country[]>>();
    const { sendRequest: citySendRequest } = useApi<null, BaseResponse<City[]>>();
    const { sendRequest: jobCategoriesSendRequest } = useApi<null, BaseResponse<JobCategories[]>>();
    const { sendRequest: AddWorkExperience, isPending } = useApi<Partial<WorkExperienceFormData>, BaseResponse<null>>();
    const { sendRequest: fetch, isPending: fetchIsPending } = useApi<WorkExperienceFormData, CareerRecord[]>();


    const fetchCountries = async () => {
        countrySendRequest(
            {
                url: "/Countries",
            },
            (response) => {
                if (response) {
                    const countryOptions: any = response.map((country: Country) => ({
                        value: country.id,
                        label: country.title,
                    }));
                    setCountries(countryOptions);
                }
            }
        );
    };

    const fetchCities = async () => {
        citySendRequest(
            {
                url: "/Cities",
            },
            (response) => {
                if (response) {
                    const cityOptions: any = response.map((city: City) => ({
                        value: city.id,
                        label: city.title,
                    }));
                    setCities(cityOptions);
                }
            }
        );
    };

    const fetchJobCategories = async () => {
        jobCategoriesSendRequest(
            {
                url: "/JobCategories",
            },
            (response) => {
                if (response) {
                    const jobCategoriesOptions: any = response.map((jobCategories: JobCategories) => ({
                        value: jobCategories.id,
                        label: jobCategories.title,
                    }));
                    setJobCategories(jobCategoriesOptions);
                }
            }
        );
    };

    useEffect(() => {
        fetchCities();
        fetchCountries();
        fetchJobCategories();
        fetchCareerRecords()
    }, []);


    const fetchCareerRecords = () => {
        fetch(
            {
                url: "/Resumes/CareerRecords",
            },
            (response) => {
                if (response.length === 0) {
                    setIsRecordCreated(false);
                } else {
                    setCareerRecords(response);
                    setIsRecordCreated(true)
                }
            },
        );
    };

    const handleCountryChange = (event: number) => {
        const countryId = event;
        setSelectedCountry(countryId);
    };

    const handleWorkExperienceChange = (checked: boolean) => {
        setHasWorkExperience(checked);
    };

    const handleCurrentJobChange = (checked: boolean) => {
        setCurrentJob(checked);
    };

    const onSubmit = (data: WorkExperienceFormData) => {
        if (currentJob) {
            delete data.toYear;
            delete data.toMonth;
        }
        AddWorkExperience(
            {
                url: '/Resumes/AddCareerRecord',
                method: 'post',
                data: data,
            },
            (response) => {
                toast.success(response?.message);
                setIsRecordCreated(true);
                fetchCareerRecords();
            },
            (error) => {
                toast.error(error?.message);
            }
        );
    };

    const handleFormSubmit = () => {
        handleSubmit(onSubmit)();
    };

    const handleButtonClick = () => {
        (hasWorkExperience || isRecordCreated) ? onSubmitSuccess() : handleFormSubmit();
    };

    const handleItemChange = (item: 'jobcategoryId' | 'cityId' | 'countryId', value: number) => {
        setValue(item, value);
    };

    const handleItemAndCountryChange = (value: number) => {
        handleItemChange('countryId', value);
        handleCountryChange(value);
    };

    return (
        <>
            <h1 className="text-2xl font-bold">سوابق شغلی</h1>
            {fetchIsPending ? (
                <span className='flex justify-center items-center h-screen'>
                    <KSpinner color='primary' size={20} />
                </span>
            ) : isRecordCreated ? (
                <WorkExperienceRecordCards
                    records={careerRecords}
                    refresh={fetchCareerRecords}
                    setIsRecordVisible={setIsRecordVisible}
                    isRecordVisible={isRecordVisible}
                    countries={countries}
                    cities={cities}
                    jobCategories={jobCategories}
                />
            ) : (
                <>
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
                                        <KTextInput {...register('jobTitle', { required: true })} />
                                        {errors.jobTitle && (
                                            <p className="text-red-500 text-xs">
                                                عنوان شغلی الزامی می باشد.
                                            </p>
                                        )}
                                    </div>
                                    <div className="w-1/2 p-5">
                                        <KLabel>نام سازمان</KLabel>
                                        <KTextInput {...register('companyName', { required: true })} />
                                        {errors.companyName && (
                                            <p className="text-red-500 text-xs">
                                                نام سازمان الزامی می باشد.
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <div className='flex justify-center'>
                                    <div className="w-1/2 p-5">
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
                                    <div className="w-1/2 p-5">
                                        <KLabel>زمینه کاری شما</KLabel>
                                        <KSelectboxWithSearch
                                            id='jobcategoryId'
                                            options={jobCategories}
                                            register={register('jobcategoryId', { required: true })}
                                            errors={errors.jobcategoryId}
                                            onChange={(value: number) => handleItemChange('jobcategoryId', value)}
                                        />
                                        {errors.jobcategoryId && (
                                            <p className="text-red-500 text-xs">
                                                زمینه کاری الزامی می باشد.
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <div className='flex justify-start'>
                                    <div className="flex justify-start w-1/2">
                                        <div className='w-1/2 p-5'>
                                            <KLabel>کشور</KLabel>
                                            <KSelectboxWithSearch
                                                id='countryId'
                                                options={countries}
                                                register={register('countryId', { required: true })}
                                                errors={errors.countryId}
                                                onChange={handleItemAndCountryChange}
                                            />
                                            {errors.countryId && (
                                                <p className="text-red-500 text-xs">
                                                    انتخاب کشور الزامی می باشد.
                                                </p>
                                            )}
                                        </div>
                                        {selectedCountry === 1 && (
                                            <div className='w-1/2 p-5'>
                                                <KLabel>شهر</KLabel>
                                                <KSelectboxWithSearch
                                                    id='cityId'
                                                    options={cities}
                                                    register={register('cityId', { required: true })}
                                                    errors={errors.cityId}
                                                    onChange={(value: number) => handleItemChange('cityId', value)}
                                                />
                                            </div>
                                        )}
                                    </div>
                                    <div className='flex justify-center w-1/2'>
                                        <div className='w-1/2 p-5'>
                                            <KLabel>ماه شروع</KLabel>
                                            <KSelect
                                                {...register('fromMonth', {
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
                                        <div className='w-1/2 p-5'>
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
                                <div className='flex justify-start'>
                                    {!currentJob && (
                                        <div className='flex justify-center w-1/2'>
                                            <div className='w-1/2 p-5'>
                                                <KLabel>ماه پایان</KLabel>
                                                <KSelect
                                                    {...register('toMonth', {
                                                        setValueAs: value => value === "" ? undefined : Number(value)
                                                    })}
                                                >                                                    {hijriMonthOptions.map(option => (
                                                    <option key={option.value} value={option.value}>
                                                        {option.label}
                                                    </option>
                                                ))}
                                                </KSelect>
                                            </div>
                                            <div className='w-1/2 p-5'>
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
                                <div className='p-5'>
                                    <KCheckbox content={'هنوز در این شرکت مشغول به کار هستم .'} onChange={handleCurrentJobChange} checked={currentJob} />
                                </div>
                            </>
                        )}
                    </form>
                </>
            )}
            {!isRecordVisible && (
                <div className='flex justify-end p-5'>
                    <KButton color='secondary' className='ml-4' onClick={goToPreviousStep}>
                        مرحله قبلی
                    </KButton>
                    {isPending ? <KSpinner color='primary' /> :
                        <KButton color='primary' type="button" onClick={handleButtonClick}>
                            ذخیره و مرحله بعد
                        </KButton>
                    }
                </div>
            )}
        </>

    );
};

export default WorkExperience;
