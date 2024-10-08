import React, {
    useEffect,
    useState,
} from 'react';

import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import useApi from '../../../hooks/useApi';
import {
    City,
    JobCategories,
    Languages,
    SoftwareSkills,
} from '../../../models/cvbuilder.models';
import {
    CareerExperienceLength,
    careerExperienceLengthLabels,
    DegreeLevel,
    DegreeLevelDescriptions,
    militaryServiceStatusMapping,
} from '../../../models/enums';
import {
    BaseResponse,
    OptionType,
    Resume,
} from '../../../models/shared.models';
import KButton from '../../shared/Button';
import KCard from '../../shared/Card';
import KDatepicker from '../../shared/DatePicker';
import KLabel from '../../shared/Label';
import KSelect from '../../shared/Select';
import KSelectboxWithSearch from '../../shared/SelectboxWithSearch';
import SelectboxWithSearchAndAllowAdd from '../../shared/SelectboxWithSearchAndAllowAdd';
import KSpinner from '../../shared/Spinner';
import FoundedResumes from './FoundedResumes';

const Resumes: React.FC = () => {
    const [jobCategories, setJobCategories] = useState<OptionType[]>([]);
    const [cities, setCities] = useState<OptionType[]>([]);
    const [languages, setLanguages] = useState<OptionType[]>([]);
    const [skills, setSkills] = useState<OptionType[]>([]);
    const [resumes, setResumes] = useState<any[]>([]);
    const [displayResumes, setDisplayResumes] = useState(false);
    const { sendRequest, isPending } = useApi<any, null>();
    const { register, handleSubmit, formState: { errors }, setValue, getValues, control } = useForm<any>();
    const { sendRequest: jobCategoriesSendRequest } = useApi<null, BaseResponse<JobCategories[]>>();
    const { sendRequest: citySendRequest } = useApi<null, BaseResponse<City[]>>();
    const { sendRequest: fetch } = useApi<null, BaseResponse<null>>();
    const navigate = useNavigate();

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
        fetchLanguages();
        fetchJobCategories();
    }, []);

    const handleItemChange = (item: 'jobCategoryId' | 'cityId' | 'countryId' | 'softwareSkillIds', value: number | number[]) => {
        setValue(item, value);
    };


    const onSubmit = () => {
        const values = getValues();
        const data: any = {};

        Object.keys(values).forEach((key) => {
            const value = values[key];
            if (value !== undefined && value !== null && value !== "" && (!Array.isArray(value) || value.length > 0)) {
                data[key] = Array.isArray(value) ? value.filter(v => v !== "") : value;
            }
        });

        sendRequest(
            {
                url: '/Resumes/Query',
                method: 'put',
                params: {
                    pagesize: 10,
                    pageIndex: 0,
                },
                data: Object.keys(data).length > 0 ? data : {},
            },
            (response) => {
                setResumes(response || []);
                setDisplayResumes(true);
            }
        );
    };

    const handleFormSubmit = () => {
        handleSubmit(onSubmit)();
    };

    const handleCardClick = (resume: Resume) => {
        console.log('Clicked resume:', resume);
        navigate('/my-resume');
    };

    return (
        <>
            <KCard className='p-5'>
                <h1 className='text-2xl font-extrabold text-center'>جستجو بانک رزومه</h1>
                <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col'>
                    <div className='flex flex-col justify-between md:flex-row'>
                        <div className="w-full p-2 md:w-1/2">
                            <KLabel>زمینه کاری کارجو</KLabel>
                            <KSelectboxWithSearch
                                id='jobCategoryId'
                                options={jobCategories}
                                register={register('jobCategoryId')}
                                errors={errors.jobCategoryId}
                                onChange={(value: number) => handleItemChange('jobCategoryId', value)}
                            />
                        </div>
                        <div className="w-full p-2 md:w-1/2">
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
                    <div className='flex flex-col justify-between md:flex-row'>
                        <div className="w-full p-2 md:w-1/2">
                            <KLabel>شهر محل سکونت</KLabel>
                            <KSelectboxWithSearch
                                id='cityId'
                                options={cities}
                                register={register('cityId')}
                                errors={errors.cityId}
                                onChange={(value: number) => handleItemChange('cityId', value)}
                            />
                        </div>
                        <div className="w-full p-2 md:w-1/2">
                            <KLabel>سن کارجو</KLabel>
                            <div className="flex">
                                <div className="w-full">
                                    <KDatepicker
                                        name="birthDateLessThan"
                                        placeholder='کمتر از'
                                        control={control}
                                    />
                                </div>
                                <div className="w-full mr-2">
                                    <KDatepicker
                                        name="birthDateMoreThan"
                                        placeholder='بیشتر از'
                                        control={control}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col justify-between md:flex-row'>
                        <div className="w-full p-2 md:w-1/2">
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
                        <div className="w-full p-2 md:w-1/2">
                            <KLabel>زبان ها</KLabel>
                            <KSelect {...register('languageId')}>
                                {languages.map((language) => (
                                    <option key={language.value} value={language.value}>{language.label}</option>
                                ))}
                            </KSelect>
                        </div>
                    </div>
                    <div className='flex flex-col justify-between md:flex-row'>
                        <div className="w-full p-2 md:w-1/2">
                            <KLabel>مهارت های نرم افزاری کارجو</KLabel>
                            <SelectboxWithSearchAndAllowAdd
                                id='softwareSkillIds'
                                options={skills}
                                register={register('softwareSkillIds')}
                                errors={errors.softwareSkillIds}
                                onChange={(selectedItems: OptionType[]) => handleItemChange('softwareSkillIds', selectedItems.map(item => item.value))}
                            />

                        </div>
                        <div className="w-full p-2 md:w-1/2">
                            <KLabel>وضعیت نظام وظیفه</KLabel>
                            <KSelect id='militaryServiceStatus' {...register('militaryServiceStatus')}>
                                <option value="">انتخاب کنید</option>
                                {Object.entries(militaryServiceStatusMapping).map(([key, value]) => (
                                    <option key={key} value={value.value}>
                                        {value.label}
                                    </option>
                                ))}
                            </KSelect>
                        </div>
                    </div>
                    <div className='flex justify-end p-2'>
                        {isPending ? <KSpinner color='primary' /> :
                            <KButton color='primary' type='button' onClick={handleFormSubmit}>
                                جستجو
                            </KButton>
                        }
                    </div>
                </form>
            </KCard>
            {displayResumes && <div className='mt-10'><FoundedResumes resumes={resumes} onCardClick={handleCardClick} /></div>}
        </>
    );
};

export default Resumes;