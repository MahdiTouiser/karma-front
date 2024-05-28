import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import useAPi from '../../../../../hooks/useApi';
import { Majors, Universities } from '../../../../../models/cvbuilder.models';
import { BaseResponse } from '../../../../../models/shared.models';
import KCheckbox from '../../../../shared/Checkbox';
import KLabel from '../../../../shared/Label';
import KSelect from '../../../../shared/Select';
import KTextInput from '../../../../shared/TextInput';

interface EducationalDataProps {
    selectedDegree?: string;
};

const EducationalData: React.FC<EducationalDataProps> = ({ selectedDegree }) => {
    const { register, formState: { errors }, setValue } = useFormContext();
    const [majors, setMajors] = useState<{ value: number; label: string }[]>([]);
    const [universities, setUniversities] = useState<{ value: number; label: string }[]>([]);
    const { sendRequest: majorsSendRequest } = useAPi<null, BaseResponse<Majors[]>>();
    const { sendRequest: universitiesSendRequest } = useAPi<null, BaseResponse<Universities[]>>();

    const [stillEducating, setStillEducating] = useState(false);



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
        fetchMajors()
        fetchUniversities()
    }, []);

    useEffect(() => {
        setValue('stillEducating', false);
    }, [setValue]);

    const handleCheckboxChange = (checked: boolean) => {
        setStillEducating(checked);
        setValue('stillEducating', checked);
    };

    return (
        <>
            <div className='flex justify-start'>
                <div className='w-1/2 p-5'>
                    <KLabel>رشته تحصیلی</KLabel>
                    <KSelect {...register('majorId')}>
                        {majors.map((major) => (
                            <option key={major.value} value={major.value}>{major.label}</option>
                        ))}
                    </KSelect>
                </div>
                {selectedDegree !== 'Diploma' && (
                    <div className='w-1/2 p-5'>
                        <KLabel>دانشگاه</KLabel>
                        <KSelect {...register('universityId')}>
                            {universities.map((university) => (
                                <option key={university.value} value={university.value}>{university.label}</option>
                            ))}
                        </KSelect>
                    </div>
                )}
            </div>

            {selectedDegree !== 'Diploma' && (
                <>
                    <div className='flex justify-center'>
                        <div className="w-1/2 p-5">
                            <KLabel>معدل (اختیاری)</KLabel>
                            <KTextInput placeholder='مثلا ۱۷.۳۶'
                                numeric allowDecimal  {...register('gpa')} maxLength={5} />
                            {errors.gpa && <span className="text-red-500 text-xs">نام الزامی است</span>}
                        </div>
                        <div className="w-1/2 p-5">
                            <KLabel>سال شروع</KLabel>
                            <KTextInput
                                numeric
                                placeholder='مثلا ۱۳۹۵'
                                maxLength={4}
                                id="fromYear"
                                {...register('fromYear', { required: true, maxLength: 4 })}
                            />

                            {errors.fromYear && (
                                <p className="text-red-500 text-xs">
                                    سال شروع الزامی می باشد.
                                </p>
                            )}
                        </div>
                    </div>
                    {!stillEducating && (
                        <div className='flex justify-start'>
                            <div className="w-1/2 p-5">
                                <KLabel>سال پایان</KLabel>
                                <KTextInput
                                    numeric
                                    placeholder='مثلا ۱۴۰۰'
                                    maxLength={4}
                                    id="toYear"
                                    {...register('toYear', { required: !stillEducating, maxLength: 4 })}
                                />
                                {errors.toYear && (
                                    <p className="text-red-500 text-xs">
                                        سال پایان الزامی می باشد .
                                    </p>
                                )}
                            </div>
                        </div>
                    )}
                    <div className='p-5'>
                        <KCheckbox content={'هنوز مشغول به تحصیل هستم .'} onChange={handleCheckboxChange} checked={stillEducating} />
                    </div>
                </>
            )}
        </>
    );
};

export default EducationalData;
