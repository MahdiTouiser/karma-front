import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { default as useAPi, default as useApi } from '../../../../hooks/useApi';
import { City, Country, JobCategories, WorkExperienceFormData } from '../../../../models/cvbuilder.models';
import { HijriMonths, SeniorityLevels, hijriMonthLabels, seniorityLevelLabels } from '../../../../models/enums';
import { BaseResponse } from '../../../../models/shared.models';
import KButton from '../../../shared/Button';
import KCheckbox from '../../../shared/Checkbox';
import KLabel from '../../../shared/Label';
import KSelect from '../../../shared/Select';
import KSpinner from '../../../shared/Spinner';
import KTextInput from '../../../shared/TextInput';

const WorkExperience: React.FC = () => {
    const [hasWorkExperience, setHasWorkExperience] = useState(false);
    const [currentJob, setCurrentJob] = useState(false);
    const [countries, setCountries] = useState<{ value: number; label: string }[]>([]);
    const [cities, setCities] = useState<{ value: number; label: string }[]>([]);
    const [jobCategories, setJobCategories] = useState<{ value: number; label: string }[]>([]);
    const [selectedCountry, setSelectedCountry] = useState<number | undefined>(1);

    const { register, handleSubmit, formState: { errors } } = useForm<WorkExperienceFormData>();
    const { sendRequest: countrySendRequest } = useApi<null, BaseResponse<Country[]>>();
    const { sendRequest: citySendRequest } = useApi<null, BaseResponse<City[]>>();
    const { sendRequest: jobCategoriesSendRequest } = useApi<null, BaseResponse<JobCategories[]>>();
    const { sendRequest: AddWorkExperience, isPending } = useAPi<WorkExperienceFormData, BaseResponse<null>>();

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
        fetchCountries()
        fetchCities()
        fetchJobCategories()
    }, []);

    const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const countryId = parseInt(event.target.value);
        setSelectedCountry(countryId);
    };

    const handleWorkExperienceChange = (checked: boolean) => {
        setHasWorkExperience(checked);
    };

    const handleCurrentJobChange = (checked: boolean) => {
        setCurrentJob(checked);
    };

    const onSubmit = (data: WorkExperienceFormData) => {
        const formData = {
            ...data,
            currentJob: currentJob,
            countryId: Number(data.countryId),
            cityId: data.cityId ? Number(data.cityId) : undefined,
            jobcategoryId: Number(data.jobcategoryId),
            fromYear: data.fromYear ? Number(data.fromYear) : undefined,
            toYear: data.toYear ? Number(data.toYear) : undefined,
        };

        if (currentJob) {
            delete formData.toYear;
            delete formData.toMonth;
        }

        console.log(formData);
    };

    const handleFormSubmit = () => {
        handleSubmit(onSubmit)();
    };

    return (
        <>
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
                        <div className='flex justify-start'>
                            <div className="flex justify-start w-1/2">
                                <div className='w-1/2 p-5'>
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
                                    <div className='w-1/2 p-5'>
                                        <KLabel>شهر</KLabel>
                                        <KSelect {...register('cityId')}>
                                            {cities.map((city) => (
                                                <option key={city.value} value={city.value}>{city.label}</option>
                                            ))}
                                        </KSelect>
                                    </div>
                                )}

                            </div>
                            <div className='flex justify-center w-1/2'>
                                <div className='w-1/2 p-5'>
                                    <KLabel>ماه شروع</KLabel>
                                    <KSelect type='number' {...register('fromMonth')}>
                                        {Object.values(HijriMonths).map((monthValue) => (
                                            <option key={monthValue} value={monthValue}>
                                                {hijriMonthLabels[monthValue as HijriMonths]}
                                            </option>
                                        ))}
                                    </KSelect>
                                </div>
                                <div className='w-1/2 p-5'>
                                    <KLabel>سال شروع</KLabel>
                                    <KTextInput numeric maxLength={4} {...register('fromYear')} />
                                </div>
                            </div>
                        </div>
                        <div className='flex justify-start'>
                            {!currentJob && (
                                <div className='flex justify-center w-1/2'>
                                    <div className='w-1/2 p-5'>
                                        <KLabel>ماه پایان</KLabel>
                                        <KSelect {...register('toMonth')}>
                                            {Object.values(HijriMonths).map((monthValue) => (
                                                <option key={monthValue} value={monthValue}>
                                                    {hijriMonthLabels[monthValue as HijriMonths]}
                                                </option>
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
            </form >

            <div className='flex justify-end p-5'>
                <KButton color='secondary' className='ml-4' onClick={() => console.log("hello")}>
                    مرحله قبلی
                </KButton>
                {isPending ? <KSpinner color='primary' /> :
                    <KButton color='primary' type="button" onClick={handleFormSubmit}>
                        ذخیره و مرحله بعد
                    </KButton>
                }
            </div >

        </>
    );
};

export default WorkExperience;
