import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import useApi from "../../../../hooks/useApi";
import { CareerRecord, City, Country, JobCategories, WorkExperienceFormData } from "../../../../models/cvbuilder.models";
import { SeniorityLevels, hijriMonthOptions, seniorityLevelLabels } from "../../../../models/enums";
import { BaseResponse, OptionType } from "../../../../models/shared.models";
import KButton from "../../../shared/Button";
import KLabel from "../../../shared/Label";
import KModal from "../../../shared/Modal/Modal";
import KSelect from "../../../shared/Select";
import KSelectboxWithSearch from "../../../shared/SelectboxWithSearch";
import KSpinner from "../../../shared/Spinner";
import KTextInput from "../../../shared/TextInput";

interface CareerBackgroundModalProps {
    show: boolean;
    onClose: () => void;
    fetch: () => void;
    editMode: boolean;
    record: CareerRecord | null;
}

const CareerBackgroundModal: React.FC<CareerBackgroundModalProps> = (props) => {
    const { show, onClose, fetch, editMode, record } = props
    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<WorkExperienceFormData>();
    const { sendRequest: saveCareerData, isPending } = useApi<Partial<WorkExperienceFormData>, BaseResponse<null>>();
    const { sendRequest: countrySendRequest } = useApi<null, BaseResponse<Country[]>>();
    const { sendRequest: citySendRequest } = useApi<null, BaseResponse<City[]>>();
    const { sendRequest: jobCategoriesSendRequest } = useApi<null, BaseResponse<JobCategories[]>>();
    const [countries, setCountries] = useState<OptionType[]>([]);
    const [cities, setCities] = useState<OptionType[]>([]);
    const [jobCategories, setJobCategories] = useState<OptionType[]>([]);

    useEffect(() => {
        fetchCities();
        fetchCountries();
        fetchJobCategories();
    }, []);

    useEffect(() => {
        if (editMode && record) {
            for (const [key, value] of Object.entries(record)) {
                setValue(key as keyof WorkExperienceFormData, value);
            }
        } else {
            reset();
        }
    }, [editMode, record, reset, setValue]);

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

    const onSubmit: SubmitHandler<WorkExperienceFormData> = async (data) => {
        const fieldsToConvert = ['cityId', 'countryId', 'fromMonth', 'toYear', 'fromYear', 'toMonth', 'jobcategoryId'] as const;
        fieldsToConvert.forEach((field) => {
            if (data[field] !== undefined && data[field] !== null) {
                data[field] = +data[field];
            }
        });

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

    const handleItemChange = (item: 'jobcategoryId', value: number) => {
        setValue(item, value);
    };



    return (
        <KModal show={show} onClose={onClose} containerClass="!w-full !max-w-[40vw] !md:max-w-[70vw] !lg:max-w-[60vw] !pb-2">
            <KModal.Header>
                <h2>{editMode ? 'ویرایش سابقه شغلی' : 'افزودن سابقه شغلی جدید'}</h2>
            </KModal.Header>
            <div className='p-4'>
                <KModal.Body>
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
                                            <KSelectboxWithSearch
                                                id='countryId'
                                                options={countries}
                                                register={register('countryId', { required: true })}
                                                errors={errors.countryId}
                                            />
                                            {errors.countryId && (
                                                <p className="text-red-500 text-xs">
                                                    انتخاب کشور الزامی می باشد.
                                                </p>
                                            )}
                                        </div>
                                        <div className='w-1/2'>
                                            <KLabel>شهر</KLabel>
                                            <KSelectboxWithSearch
                                                id='cityId'
                                                options={cities}
                                                register={register('cityId', { required: true })}
                                                errors={errors.cityId}
                                            />
                                        </div>
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

                        <div className="flex justify-end px-5">
                            {isPending ? (
                                <KSpinner />
                            ) : (
                                <KButton color='primary' type="button" onClick={handleFormSubmit}>
                                    {editMode ? 'ذخیره تغییرات' : 'ذخیره'}
                                </KButton>
                            )}
                        </div>
                    </>
                </KModal.Body>
            </div>
        </KModal>
    );
}

export default CareerBackgroundModal;
