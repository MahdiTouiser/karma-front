import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import useApi from '../../../../../hooks/useApi';
import { EducationalBackgroundFormData, Majors, Universities } from '../../../../../models/cvbuilder.models';
import { DegreeLevel, DegreeLevelDescriptions } from '../../../../../models/enums';
import { BaseResponse } from '../../../../../models/shared.models';
import KButton from '../../../../shared/Button';
import KLabel from '../../../../shared/Label';
import KRadioButton from '../../../../shared/RadioButton';
import KSelect from '../../../../shared/Select';
import KSpinner from '../../../../shared/Spinner';
import KTextInput from '../../../../shared/TextInput';

interface NewEducationalRecordProps {
    setIsNewRecordVisible: (visible: boolean) => void;
    refresh: () => void;
}

const NewEducationalRecord: React.FC<NewEducationalRecordProps> = ({ setIsNewRecordVisible, refresh }) => {
    const options = Object.keys(DegreeLevelDescriptions).map((key) => ({
        label: DegreeLevelDescriptions[key as DegreeLevel],
        value: key,
    }));
    const [selectedOption, setSelectedOption] = useState<string>('');
    const [majors, setMajors] = useState<{ value: number; label: string }[]>([]);
    const [universities, setUniversities] = useState<{ value: number; label: string }[]>([]);
    const { register, handleSubmit, formState: { errors }, setValue } = useForm<EducationalBackgroundFormData>();
    const { sendRequest: universitiesSendRequest } = useApi<null, BaseResponse<Universities[]>>();
    const { sendRequest: majorsSendRequest } = useApi<null, BaseResponse<Majors[]>>();
    const { sendRequest: AddEducationalData, isPending } = useApi<Partial<EducationalBackgroundFormData>, BaseResponse<null>>();

    const handleFormSubmit = () => {
        handleSubmit(onSubmit)();
    };

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

    const convertToType = (key: keyof EducationalBackgroundFormData, value: string | undefined): any => {
        switch (key) {
            case 'majorId':
            case 'universityId':
            case 'fromYear':
            case 'toYear':
                return value ? parseInt(value, 10) : undefined;
            case 'gpa':
                return value ? parseFloat(value) : undefined;
            case 'stillEducating':
                return value === 'true';
            case 'degreeLevel':
                return value || null;
            default:
                return value || '';
        }
    };

    const onSubmit = async (data: EducationalBackgroundFormData) => {
        const finalData: Partial<EducationalBackgroundFormData> = {};
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                finalData[key as keyof EducationalBackgroundFormData] = convertToType(
                    key as keyof EducationalBackgroundFormData,
                    data[key as keyof EducationalBackgroundFormData] as unknown as string
                );
            }
        }
        AddEducationalData(
            {
                url: "/Resumes/AddEducationalRecord",
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
    };
    const handleOptionChange = (value: string) => {
        setSelectedOption(value);
        setValue('degreeLevel', value);
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
                        {errors.degreeLevel && <span className="text-red-500 text-xs">مقطع تحصیلی الزامی است .</span>}
                    </div>
                    <div className='mt-4'>
                        <div className='inline-block w-full'>
                            <KLabel>دانشگاه</KLabel>
                            <KSelect {...register('universityId', { required: true })}>
                                {universities.map((university) => (
                                    <option key={university.value} value={university.value}>{university.label}</option>
                                ))}
                            </KSelect>
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
                        <KSelect {...register('majorId', { required: true })}>
                            {majors.map((major) => (
                                <option key={major.value} value={major.value}>{major.label}</option>
                            ))}
                        </KSelect>
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

export default NewEducationalRecord;
