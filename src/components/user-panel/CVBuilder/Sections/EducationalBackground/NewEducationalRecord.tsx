import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import useAPi from '../../../../../hooks/useApi';
import { EducationalBackgroundFormData, Majors, Universities } from '../../../../../models/cvbuilder.models';
import { DegreeLevel, DegreeLevelDescriptions } from '../../../../../models/enums';
import { BaseResponse } from '../../../../../models/shared.models';
import KButton from '../../../../shared/Button';
import KLabel from '../../../../shared/Label';
import KRadioButton from '../../../../shared/RadioButton';
import KSelect from '../../../../shared/Select';
import KTextInput from '../../../../shared/TextInput';

const NewEducationalRecord = () => {
    const options = Object.keys(DegreeLevelDescriptions).map((key) => ({
        label: DegreeLevelDescriptions[key as DegreeLevel],
        value: key,
    }));
    const { register, handleSubmit, formState: { errors }, watch } = useForm<EducationalBackgroundFormData>();
    const [majors, setMajors] = useState<{ value: number; label: string }[]>([]);
    const [universities, setUniversities] = useState<{ value: number; label: string }[]>([]);
    const { sendRequest: universitiesSendRequest } = useAPi<null, BaseResponse<Universities[]>>();
    const { sendRequest: majorsSendRequest } = useAPi<null, BaseResponse<Majors[]>>();
    const { sendRequest: AddEducationalData } = useAPi<Partial<EducationalBackgroundFormData>, BaseResponse<null>>();

    const handleFormSubmit = handleSubmit((data) => onSubmit(data));

    const fetchMajors = async () => {
        majorsSendRequest(
            {
                url: "/Majors",
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

    const onSubmit: SubmitHandler<EducationalBackgroundFormData> = async (data) => {
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
            },
            (error) => {
                toast.error(error?.message);
            }
        );
        console.log(finalData);
    };

    const selectedOption = watch('degreeLevel') || '';

    return (
        <>
            <form className='mt-8 w-full flex' onSubmit={handleFormSubmit}>
                <div className='w-1/2 pr-4 mt-4'>
                    <div>
                        <div className='inline-block w-full'>
                            <KLabel>مقطع تحصیلی</KLabel>
                            <KRadioButton
                                groupName='degreeLevel'
                                options={options}
                                selectedOption={selectedOption}
                                onOptionChange={(value) => {
                                    console.log('Selected degree level:', value);
                                }}
                                register={register}
                            />
                        </div>
                    </div>
                    <div className='mt-4'>
                        <div className='inline-block w-full'>
                            <KLabel>دانشگاه</KLabel>
                            <KSelect {...register('universityId')}>
                                {universities.map((university) => (
                                    <option key={university.value} value={university.value}>{university.label}</option>
                                ))}
                            </KSelect>
                        </div>
                    </div>
                    <div className='mt-4'>
                        <KLabel>سال شروع</KLabel>
                        <KTextInput numeric maxLength={4} {...register('fromYear')} placeholder='۱۳۹۶' />
                    </div>
                </div>
                <div className='w-1/2 pr-4 mt-4'>
                    <div>
                        <div className='inline-block w-full'>
                            <KLabel>رشته تحصیلی</KLabel>
                            <KSelect {...register('majorId')}>
                                {majors.map((major) => (
                                    <option key={major.value} value={major.value}>{major.label}</option>
                                ))}
                            </KSelect>
                        </div>
                    </div>
                    <div className='mt-4'>
                        <div className='inline-block w-full'>
                            <KLabel>معدل (اختیاری)</KLabel>
                            <KTextInput placeholder='۱۷.۳۶'
                                numeric allowDecimal  {...register('gpa')} maxLength={5} />
                            {errors.gpa && <span className="text-red-500 text-xs">نام الزامی است</span>}
                        </div>
                    </div>
                    <div className='mt-4'>
                        <KLabel>سال پایان</KLabel>
                        <KTextInput numeric maxLength={4} {...register('toYear')} placeholder='۱۴۰۰'
                        />
                    </div>
                </div>
            </form>
            <div className='flex justify-end p-5'>
                <KButton color='secondary' className='ml-4'>
                    انصراف
                </KButton>
                <KButton color='primary' type="submit" onClick={handleFormSubmit}>
                    ذخیره
                </KButton>
            </div>
        </>
    );
};

export default NewEducationalRecord;
