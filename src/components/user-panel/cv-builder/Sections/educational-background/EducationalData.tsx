import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import useApi from '../../../../../hooks/useApi';
import { Majors, Universities } from '../../../../../models/cvbuilder.models';
import { DegreeLevel, DegreeLevelDescriptions } from '../../../../../models/enums';
import { BaseResponse, OptionType } from '../../../../../models/shared.models';
import KCheckbox from '../../../../shared/Checkbox';
import KLabel from '../../../../shared/Label';
import KRadioButton from '../../../../shared/RadioButton';
import KSelectboxWithSearch from '../../../../shared/SelectboxWithSearch';
import KTextInput from '../../../../shared/TextInput';

const EducationalData: React.FC = () => {
    const { register, formState: { errors }, setValue } = useFormContext();
    const [majors, setMajors] = useState<OptionType[]>([]);
    const [universities, setUniversities] = useState<OptionType[]>([]);
    const { sendRequest: majorsSendRequest } = useApi<null, BaseResponse<Majors[]>>();
    const { sendRequest: universitiesSendRequest } = useApi<null, BaseResponse<Universities[]>>();
    const [stillEducating, setStillEducating] = useState(false);
    const [selectedDegree, setSelectedDegree] = useState<string>('');
    const options = Object.keys(DegreeLevelDescriptions).map((key) => ({
        label: DegreeLevelDescriptions[key as DegreeLevel],
        value: key,
    }));

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

    const handleItemChange = (item: 'majorId' | 'universityId', value: number) => {
        setValue(item, value);
    };

    const handleOptionChange = (value: string) => {
        setSelectedDegree(value);
        setValue('degreeLevel', value);
    };


    return (
        <>
            <div className='flex justify-start'>
                <div className='w-1/2 p-5'>
                    <KLabel>آخرین مدرک تحصیلی</KLabel>
                    <KRadioButton
                        options={options}
                        onOptionChange={handleOptionChange}
                        selectedOption={selectedDegree}
                        register={register('degreeLevel', { required: true })}
                    />
                    {errors.degreeLevel && <span className="text-red-500 text-sm">این فیلد الزامی است</span>}
                </div>
                <div className='w-1/2 p-5'>
                    <KLabel>رشته تحصیلی</KLabel>
                    <KSelectboxWithSearch
                        id='majorId'
                        options={majors}
                        register={register('majorId', { required: true })}
                        errors={errors.majorId}
                        onChange={(value: number) => handleItemChange('majorId', value)}
                    />
                    {errors.majorId && <span className="text-red-500 text-xs">رشته تحصیلی الزامی است .</span>}
                </div>
            </div>
            <div className='flex justify-center'>
                <div className="w-1/2 p-5">
                    <KLabel>دانشگاه</KLabel>
                    <KSelectboxWithSearch
                        id='universityId'
                        options={universities}
                        register={register('universityId', { required: true })}
                        errors={errors.universityId}
                        onChange={(value: number) => handleItemChange('universityId', value)}
                    />
                    {errors.universityId && <span className="text-red-500 text-xs">نام دانشگاه الزامی است .</span>}
                </div>
                <div className="w-1/2 p-5">
                    <KLabel>معدل (اختیاری)</KLabel>
                    <KTextInput placeholder=' ۱۷.۳۶'
                        numeric allowDecimal  {...register('gpa')} maxLength={5} />
                    {errors.gpa && <span className="text-red-500 text-xs">نام الزامی است</span>}
                </div>
            </div>
            <div className='flex justify-start'>
                <div className="w-1/2 p-5">
                    <KLabel>سال شروع</KLabel>
                    <KTextInput
                        numeric
                        placeholder=' ۱۳۹۵'
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
                {!stillEducating && (
                    <div className="w-1/2 p-5">
                        <KLabel>سال پایان</KLabel>
                        <KTextInput
                            numeric
                            placeholder=' ۱۴۰۰'
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
                )}
            </div>
            <div className='p-5'>
                <KCheckbox content={'هنوز مشغول به تحصیل هستم .'} onChange={handleCheckboxChange} checked={stillEducating} />
            </div>
        </>
    );
};

export default EducationalData;
