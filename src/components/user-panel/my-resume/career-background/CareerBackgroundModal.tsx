import React, {
  useEffect,
  useState,
} from 'react';

import {
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import { toast } from 'react-toastify';

import useApi from '../../../../hooks/useApi';
import {
  CareerRecordModel,
  City,
  Country,
  JobCategories,
  WorkExperienceFormData,
} from '../../../../models/cvbuilder.models';
import {
  hijriMonthOptions,
  seniorityLevelLabels,
  SeniorityLevels,
} from '../../../../models/enums';
import {
  BaseResponse,
  OptionType,
} from '../../../../models/shared.models';
import KButton from '../../../shared/Button';
import KLabel from '../../../shared/Label';
import KModal from '../../../shared/Modal/Modal';
import KSelect from '../../../shared/Select';
import KSelectboxWithSearch from '../../../shared/SelectboxWithSearch';
import KSpinner from '../../../shared/Spinner';
import KTextInput from '../../../shared/TextInput';

interface CareerBackgroundModalProps {
    show: boolean;
    onClose: () => void;
    fetch: () => void;
    editMode: boolean;
    record: CareerRecordModel | null;
}

const CareerBackgroundModal: React.FC<CareerBackgroundModalProps> = (props) => {
    const { show, onClose, fetch, editMode, record } = props;
    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<WorkExperienceFormData>();
    const { sendRequest: saveCareerData, isPending } = useApi<Partial<WorkExperienceFormData>, BaseResponse<null>>();
    const { sendRequest: countrySendRequest } = useApi<null, BaseResponse<Country[]>>();
    const { sendRequest: citySendRequest } = useApi<null, BaseResponse<City[]>>();
    const { sendRequest: jobCategoriesSendRequest } = useApi<null, BaseResponse<JobCategories[]>>();

    const [countries, setCountries] = useState<OptionType[]>([]);
    const [cities, setCities] = useState<OptionType[]>([]);
    const [jobCategories, setJobCategories] = useState<OptionType[]>([]);
    const [selectedCity, setSelectedCity] = useState<OptionType | null>(null);
    const [selectedCountryLabel, setSelectedCountryLabel] = useState<OptionType | null>(null);
    const [selectedJobCategroyId, setSelectedJobCategroyId] = useState<OptionType | null>(null);

    useEffect(() => {
        if (show) {
            reset();
        }
    }, [show, reset]);

    useEffect(() => {
        fetchCities();
        fetchCountries();
        fetchJobCategories();
    }, []);

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
            });
        }
    }, [record, setValue, reset]);

    const fetchCountries = async () => {
        countrySendRequest(
            { url: "/Countries" },
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
            { url: "/Cities" },
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
            { url: "/JobCategories" },
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

    const onSubmit: SubmitHandler<WorkExperienceFormData> = async (data) => {
        const url = editMode && record ? `/Resumes/UpdateCareerRecord/${record.id}` : '/Resumes/AddCareerRecord';
        const method = editMode && record ? "put" : "post";

        saveCareerData(
            {
                url: url,
                method: method,
                data: data,
            },
            (response) => {
                toast.success(response?.message);
                reset();
                onClose();
                fetch();
            },
            (error) => {
                toast.error(error?.message);
            }
        );
    };

    const handleFormSubmit = () => {
        handleSubmit(onSubmit)();
    };

    const handleItemChange = (item: 'jobcategoryId' | 'countryId' | 'cityId', value: number) => {
        setValue(item, value);
    };

    const handleCountryChange = (event: number) => {
        const countryId = event;
        handleItemChange('countryId', countryId);
    };

    const handleItemAndCountryChange = (value: number) => {
        handleItemChange('countryId', value);
        handleCountryChange(value);
    };

    return (
        <KModal show={show} onClose={onClose} containerClass="!w-full !max-w-[90vw] !md:max-w-[70vw] !lg:max-w-[60vw] !pb-2">
            <KModal.Header>
                <h2>{editMode ? 'ویرایش سابقه شغلی' : 'افزودن سابقه شغلی جدید'}</h2>
            </KModal.Header>
            <KModal.Body>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='flex flex-wrap w-full'>
                        <div className='w-full p-4 mt-4 md:w-1/2'>
                            <div className='inline-block w-full'>
                                <KLabel>عنوان شغلی</KLabel>
                                <KTextInput {...register('jobTitle', { required: true })} />
                                {errors.jobTitle && (
                                    <p className="text-xs text-red-500">
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
                                        <p className="text-xs text-red-500">
                                            سطح ارشدیت الزامی می باشد.
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div className='flex flex-wrap mt-4'>
                                <div className='w-full p-2 md:w-1/2'>
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
                                        <p className="text-xs text-red-500">
                                            انتخاب کشور الزامی می باشد.
                                        </p>
                                    )}
                                </div>
                                <div className='w-full p-2 md:w-1/2'>
                                    <KLabel>شهر</KLabel>
                                    <KSelectboxWithSearch
                                        id='cityId'
                                        options={cities}
                                        register={register('cityId', { required: true })}
                                        errors={errors.cityId}
                                        onChange={(value: number) => handleItemChange('cityId', value)}
                                        defaultValue={selectedCity}
                                    />
                                    {errors.cityId && (
                                        <p className="text-xs text-red-500">
                                            انتخاب شهر الزامی می باشد.
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div className='flex flex-wrap justify-between mt-4'>
                                <div className='w-full p-2 md:w-1/2'>
                                    <KLabel>ماه پایان</KLabel>
                                    <KSelect {...register('toMonth')}>
                                        {hijriMonthOptions.map(option => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </KSelect>
                                </div>
                                <div className='w-full p-2 md:w-1/2'>
                                    <KLabel>سال پایان</KLabel>
                                    <KTextInput numeric maxLength={4} {...register('toYear')} />
                                </div>
                            </div>
                        </div>
                        <div className='w-full p-4 mt-4 md:w-1/2'>
                            <div className='inline-block w-full'>
                                <KLabel>نام سازمان</KLabel>
                                <KTextInput {...register('companyName', { required: true })} />
                                {errors.companyName && (
                                    <p className="text-xs text-red-500">
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
                                        <p className="text-xs text-red-500">
                                            زمینه کاری الزامی می باشد.
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div className='flex flex-wrap mt-4'>
                                <div className='w-full p-2 md:w-1/2'>
                                    <KLabel>ماه شروع</KLabel>
                                    <KSelect {...register('fromMonth', { required: true })}>
                                        {hijriMonthOptions.map(option => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </KSelect>
                                    {errors.fromMonth && (
                                        <p className="text-xs text-red-500">
                                            ماه شروع الزامی می باشد.
                                        </p>
                                    )}
                                </div>
                                <div className='w-full p-2 md:w-1/2'>
                                    <KLabel>سال شروع</KLabel>
                                    <KTextInput numeric maxLength={4} {...register('fromYear', { required: true })} />
                                    {errors.fromYear && (
                                        <p className="text-xs text-red-500">
                                            سال شروع الزامی می باشد.
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </KModal.Body>
            <div className="flex justify-end px-5 mt-4 mb-4">
                {isPending ? (
                    <KSpinner />
                ) : (
                    <KButton color='primary' type="button" onClick={handleFormSubmit}>
                        {editMode ? 'ذخیره تغییرات' : 'ذخیره'}
                    </KButton>
                )}
            </div>
        </KModal>
    );
}

export default CareerBackgroundModal;