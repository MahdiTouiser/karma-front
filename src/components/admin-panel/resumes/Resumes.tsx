import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import useApi from '../../../hooks/useApi';
import { City, JobCategories, Languages, SoftwareSkills } from '../../../models/cvbuilder.models';
import { CareerExperienceLength, DegreeLevel, DegreeLevelDescriptions, careerExperienceLengthLabels, militaryServiceStatusMapping } from '../../../models/enums';
import { BaseResponse, OptionType } from '../../../models/shared.models';
import KButton from '../../shared/Button';
import KCard from '../../shared/Card';
import KDatepicker from '../../shared/DatePicker';
import KLabel from '../../shared/Label';
import KSelect from '../../shared/Select';
import KSelectboxWithSearch from '../../shared/SelectboxWithSearch';
import SelectboxWithSearchAndAllowAdd from '../../shared/SelectboxWithSearchAndAllowAdd';

const Resumes: React.FC = () => {
    const [jobCategories, setJobCategories] = useState<OptionType[]>([]);
    const [cities, setCities] = useState<OptionType[]>([]);
    const [languages, setLanguages] = useState<OptionType[]>([]);
    const { sendRequest } = useApi<{ gender: string }, null>();
    const { register, handleSubmit, formState: { errors }, setValue, control } = useForm<any>();
    const { sendRequest: jobCategoriesSendRequest } = useApi<null, BaseResponse<JobCategories[]>>();
    const { sendRequest: citySendRequest } = useApi<null, BaseResponse<City[]>>();
    const { sendRequest: fetch } = useApi<null, BaseResponse<null>>();
    const [skills, setSkills] = useState<OptionType[]>([]);


    const fetchLanguages = async () => {
        fetch(
            {
                url: "/Languages",
                params: {
                    pageSize: 10000,
                    pageIndex: 1,
                },
            },
            (response) => {
                if (response) {
                    const languagesOptions: any = response.map((language: Languages) => ({
                        value: language.id,
                        label: language.title,
                    }));
                    setLanguages(languagesOptions);
                }
            }
        );
    };

    const fetchSkills = async () => {
        fetch(
            {
                url: '/SoftwareSkills',
                params: {
                    pageSize: 10000,
                    pageIndex: 1,
                },
            },
            (response) => {
                if (response) {
                    const softwareSkillsOptions: any = response.map((skill: SoftwareSkills) => ({
                        value: skill.id,
                        label: skill.title,
                    }));
                    setSkills(softwareSkillsOptions);
                }
            }
        );
    };


    const fetchRecords = async () => {
        sendRequest(
            {
                url: '/Resumes/Query',
                method: 'put',
                params: {
                    pagesize: 10,
                    pageIndex: 0,
                },
                data: {
                    gender: "Male"
                }
            },
            (response) => {
                console.log(response);
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
        fetchSkills();
        fetchCities();
        fetchRecords();
        fetchLanguages();
        fetchJobCategories();
    }, []);

    const handleItemChange = (item: 'jobcategoryId' | 'cityId' | 'countryId' | 'softwareSkillId', value: number) => {
        setValue(item, value);
    };

    function onSubmit() {
        console.log('submitted');
    }


    const handleFormSubmit = () => {
        handleSubmit(onSubmit)();
    };


    return (
        <KCard className='p-10'>
            <h1>جستجو بانک رزومه</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='flex justify-start'>
                    <div className="w-1/2 p-5">
                        <KLabel>زمینه کاری کارجو</KLabel>
                        <KSelectboxWithSearch
                            id='jobcategoryId'
                            options={jobCategories}
                            register={register('jobcategoryId')}
                            errors={errors.jobcategoryId}
                            onChange={(value: number) => handleItemChange('jobcategoryId', value)}
                        />
                    </div>
                    <div className="w-1/2 p-5">
                        <KLabel>سابقه کاری در زمینه شغلی مورد نظر</KLabel>
                        <KSelect
                            defaultValue=''
                            id='careerExperienceLength'
                            {...register('careerExperienceLength')}
                        >
                            {Object.values(CareerExperienceLength).map((degree) => (
                                <option key={degree} value={degree}>
                                    {careerExperienceLengthLabels[degree]}
                                </option>
                            ))}
                        </KSelect>
                    </div>
                </div>
                <div className='flex justify-start'>
                    <div className="w-1/2 p-5">
                        <KLabel>شهر محل سکونت</KLabel>
                        <KSelectboxWithSearch
                            id='cityId'
                            options={cities}
                            register={register('cityId')}
                            errors={errors.cityId}
                            onChange={(value: number) => handleItemChange('cityId', value)}
                        />
                    </div>
                    <div className="w-1/2 p-5">
                        <KLabel>سن کارجو</KLabel>
                        <div className="flex space-x-4">
                            <div className="w-1/2 mx-2">
                                <KDatepicker
                                    name="birthDateLessThan"
                                    control={control}
                                    id="birthDateLessThan"
                                    placeholder='کمتر از'
                                />
                            </div>
                            <div className="w-1/2 mx-2">
                                <KDatepicker
                                    name="birthDateMoreThan"
                                    control={control}
                                    id="birthDateMoreThan"
                                    placeholder='بیشتر از'
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex justify-start'>
                    <div className="w-1/2 p-5">
                        <KLabel>مدرک تحصیلی کارجو</KLabel>
                        <KSelect
                            defaultValue=''
                            id='degreeLevel'
                            placeholder="انتخاب کنید"
                            {...register('degreeLevel')}
                        >
                            {Object.values(DegreeLevel).map((degree) => (
                                <option key={degree} value={degree}>
                                    {DegreeLevelDescriptions[degree]}
                                </option>
                            ))}
                        </KSelect>
                    </div>
                    <div className="w-1/2 p-5">
                        <KLabel>زبان ها</KLabel>
                        <KSelect {...register('languageId')}>
                            {languages.map((language) => (
                                <option key={language.value} value={language.value}>{language.label}</option>
                            ))}
                        </KSelect>
                    </div>
                </div>
                <div className='flex justify-start'>
                    <div className="w-1/2 p-5">
                        <KLabel>مهارت های نرم افزاری کارجو</KLabel>
                        <SelectboxWithSearchAndAllowAdd
                            id='softwareSkillId'
                            options={skills}
                            register={register('softwareSkillId')}
                            errors={errors.softwareSkillId}
                            onChange={(value: number) => handleItemChange('softwareSkillId', value)} />
                    </div>
                    <div className="w-1/2 p-5">
                        <KLabel>وضعیت نظام وظیفه</KLabel>
                        <KSelect id='militaryServiceStatus' {...register('militaryServiceStatus')}>
                            {Object.entries(militaryServiceStatusMapping).map(([key, value]) => (
                                <option key={key} value={value.value}>
                                    {value.label}
                                </option>
                            ))}
                        </KSelect>
                    </div>
                </div>
                <div className='flex justify-end p-5'>
                    {/* {isPending ? <KSpinner color='primary' /> : */}
                    <KButton color='primary' type="button" onClick={handleFormSubmit}>
                        ذخیره
                    </KButton>
                    {/* } */}
                </div>
            </form>
        </KCard>
    );
}

export default Resumes;
