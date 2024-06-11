import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import useApi from '../../../../../hooks/useApi';
import { EducationalBackgroundFormData, EducationalRecordModel, Majors, Universities } from '../../../../../models/cvbuilder.models';
import { DegreeLevel, DegreeLevelDescriptions } from '../../../../../models/enums';
import { BaseResponse, OptionType } from '../../../../../models/shared.models';
import KButton from '../../../../shared/Button';
import KLabel from '../../../../shared/Label';
import KRadioButton from '../../../../shared/RadioButton';
import KSelectboxWithSearch from '../../../../shared/SelectboxWithSearch';
import KSpinner from '../../../../shared/Spinner';
import KTextInput from '../../../../shared/TextInput';

interface EducationalRecordProps {
    setIsRecordVisible: (visible: boolean) => void;
    refresh: () => void;
    record?: EducationalRecordModel | null;
}

const EducationalRecord: React.FC<EducationalRecordProps> = (props) => {
    const { setIsRecordVisible, refresh, record } = props;
    const options = Object.keys(DegreeLevelDescriptions).map((key) => ({
        label: DegreeLevelDescriptions[key as DegreeLevel],
        value: key,
    }));
    const [selectedOption, setSelectedOption] = useState<string>('');
    const [majors, setMajors] = useState<OptionType[]>([]);
    const [universities, setUniversities] = useState<OptionType[]>([]);
    const [selectedMajor, setSelectedMajor] = useState<OptionType | null>(null);
    const [selectedUniversity, setSelectedUniversity] = useState<OptionType | null>(null);
    const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm<EducationalBackgroundFormData>();
    const { sendRequest: universitiesSendRequest } = useApi<null, BaseResponse<Universities[]>>();
    const { sendRequest: majorsSendRequest } = useApi<null, BaseResponse<Majors[]>>();
    const { sendRequest: AddEducationalData, isPending } = useApi<Partial<EducationalBackgroundFormData>, BaseResponse<null>>();
    const { sendRequest: UpdateEducationalData, isPending: UpdateEducationalIsPending } = useApi<Partial<EducationalBackgroundFormData>, BaseResponse<null>>();

    const fetchMajors = async () => {
        majorsSendRequest(
            {
                url: "/Majors",
                params: {
                    pageSize: 10000,
                    pageIndex: 1,
                },
            },
            (response) => {
                if (response) {
                    const majorOptions: any = response.map((major: Majors) => ({
                        value: major.id,
                        label: major.title,
                    }));
                    setMajors(majorOptions);
                }
            }
        );
    };

    const fetchUniversities = async () => {
        universitiesSendRequest(
            {
                url: "/Universities",
                params: {
                    pageSize: 10000,
                    pageIndex: 1,
                },
            },
            (response) => {
                if (response) {
                    const universityOptions: any = response.map((university: Universities) => ({
                        value: university.id,
                        label: university.title,
                    }));
                    setUniversities(universityOptions);
                }
            }
        );
    };

    useEffect(() => {
        fetchMajors();
        fetchUniversities();
    }, []);

    useEffect(() => {
        if (record) {
            Object.keys(record).forEach((key) => {
                if (key === 'major') {
                    setValue('majorId', record.major.id);
                    setSelectedMajor({ value: record.major.id, label: record.major.title });
                } else if (key === 'university') {
                    setValue('universityId', record.university.id);
                    setSelectedUniversity({ value: record.university.id, label: record.university.title });
                } else {
                    setValue(key as keyof EducationalBackgroundFormData, (record as any)[key]);
                }
            });
            setSelectedOption(record.degreeLevel);
        } else {
            reset();  // Reset form if no record is selected
        }
    }, [record, setValue, reset]);

    const onSubmit = async (data: EducationalBackgroundFormData) => {
        const apiCall = record ? UpdateEducationalData : AddEducationalData;
        const url = record ? `/Resumes/UpdateEducationalRecord/${record.id}` : '/Resumes/AddEducationalRecord';
        const method = record ? 'put' : 'post';

        apiCall(
            {
                url: url,
                method: method,
                data: data,
            },
            (response) => {
                toast.success(response?.message);
                reset();
                refresh();
                setIsRecordVisible(false);
            },
            (error) => {
                toast.error(error?.message);
            }
        );
    };

    const handleOptionChange = (value: string) => {
        setSelectedOption(value);
        setValue('degreeLevel', value);
    };

    const handleItemChange = (item: 'majorId' | 'universityId', value: number) => {
        setValue(item, value);
    };

    const handleCancel = () => {
        reset();
        setIsRecordVisible(false);
    };

    const handleFormSubmit = () => {
        handleSubmit(onSubmit)();
    };

    return (
        <>
            <form className='mt-8 w-full flex' onSubmit={handleSubmit(onSubmit)}>
                <div className='w-1/2 pr-4 mt-4'>
                    <div className='inline-block w-full'>
                        <KLabel>مقطع تحصیلی</KLabel>
                        <KRadioButton
                            options={options}
                            onOptionChange={handleOptionChange}
                            selectedOption={selectedOption}
                            register={register('degreeLevel', { required: true })}
                        />
                        {errors.degreeLevel && <span className='text-red-500 text-xs'>مقطع تحصیلی الزامی است .</span>}
                    </div>
                    <div className='mt-4'>
                        <div className='inline-block w-full'>
                            <KLabel>دانشگاه</KLabel>
                            <KSelectboxWithSearch
                                id='universityId'
                                options={universities}
                                register={register('universityId', { required: true })}
                                errors={errors.universityId}
                                onChange={(value: number) => handleItemChange('universityId', value)}
                                defaultValue={selectedUniversity}  // Set default value
                            />
                            {errors.universityId && <span className="text-red-500 text-xs">نام دانشگاه الزامی است .</span>}
                        </div>
                    </div>
                    <div className='mt-4'>
                        <KLabel>سال شروع</KLabel>
                        <KTextInput numeric maxLength={4} {...register('fromYear', { required: true })} placeholder='۱۳۹۶' />
                        {errors.fromYear && <span className="text-red-500 text-xs">سال شروع الزامی است .</span>}
                    </div>
                </div>
                <div className='w-1/2 pr-4 mt-4'>
                    <div className='inline-block w-full'>
                        <KLabel>رشته تحصیلی</KLabel>
                        <KSelectboxWithSearch
                            id='majorId'
                            options={majors}
                            register={register('majorId', { required: true })}
                            errors={errors.majorId}
                            onChange={(value: number) => handleItemChange('majorId', value)}
                            defaultValue={selectedMajor}
                        />
                        {errors.majorId && <span className="text-red-500 text-xs">رشته تحصیلی الزامی است .</span>}
                    </div>
                    <div className='mt-4'>
                        <div className='inline-block w-full'>
                            <KLabel>معدل</KLabel>
                            <KTextInput placeholder=' ۱۷.۳۶'
                                numeric allowDecimal  {...register('gpa', { required: true })} maxLength={5} />
                            {errors.gpa && <span className="text-red-500 text-xs">معدل الزامی است .</span>}
                        </div>
                    </div>
                    <div className='mt-4'>
                        <KLabel>سال پایان</KLabel>
                        <KTextInput numeric maxLength={4} {...register('toYear', { required: true })} placeholder='۱۴۰۰'
                        />
                        {errors.toYear && <span className="text-red-500 text-xs">سال پایان الزامی است .</span>}
                    </div>
                </div>
            </form>
            <div className='flex justify-end p-5'>
                <KButton color='secondary' className='ml-4' onClick={handleCancel}>
                    انصراف
                </KButton>
                {(isPending || UpdateEducationalIsPending) ? <KSpinner color='primary' /> :
                    <KButton color='primary' type="button" onClick={handleFormSubmit}>
                        ذخیره
                    </KButton>
                }
            </div>
        </>
    );
};

export default EducationalRecord;
