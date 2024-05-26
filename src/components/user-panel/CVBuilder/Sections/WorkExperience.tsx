import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import useApi from '../../../../hooks/useApi';
import { BaseResponse } from '../../../../models/shared.models';
import KCheckbox from '../../../shared/Checkbox';
import KLabel from '../../../shared/Label';
import KSelect from '../../../shared/Select';
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

interface Country {
    id: number;
    title: string;
}

interface City {
    id: number;
    title: string;
}
interface JobCategories {
    id: number;
    title: string;
}


const WorkExperience: React.FC = () => {
    const [hasWorkExperience, setHasWorkExperience] = useState(false);
    const [currentJob, setCurrentJob] = useState(false);
    const [countries, setCountries] = useState<{ value: number; label: string }[]>([]);
    const [cities, setCities] = useState<{ value: number; label: string }[]>([]);
    const [jobCategories, setJobCategories] = useState<{ value: number; label: string }[]>([]);
    const [selectedCountry, setSelectedCountry] = useState<number | undefined>(1);

    const { register, handleSubmit, formState: { errors }, control, reset } = useForm<FormData>();
    const { sendRequest: countrySendRequest } = useApi<null, BaseResponse<Country[]>>();
    const { sendRequest: citySendRequest } = useApi<null, BaseResponse<City[]>>();
    const { sendRequest: jobCategoriesSendRequest } = useApi<null, BaseResponse<JobCategories[]>>();



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
                            <div className="w-1/2 p-5">
                                <KLabel>زمینه کاری شما</KLabel>
                                <KSelect {...register('jobcategoryId')}>
                                    {jobCategories.map((level) => (
                                        <option key={level.value} value={level.value}>{level.label}</option>
                                    ))}
                                </KSelect>
                            </div>
                        </div>
                        <div className='flex justify-start'>
                            <div className="flex justify-center w-1/2">
                                <div className='w-1/2 p-5'>
                                    <KLabel>کشور</KLabel>
                                    <KSelect {...register('countryId')} onChange={handleCountryChange}>
                                        {countries.map((country) => (
                                            <option key={country.value} value={country.value}>{country.label}</option>
                                        ))}
                                    </KSelect>
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
                        </div>
                        <div className='flex justify-start'>
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
            </form >
        </>
    );
};

export default WorkExperience;
