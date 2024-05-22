import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import KCheckbox from '../../../../shared/Checkbox';
import KLabel from '../../../../shared/Label';
import KTextInput from '../../../../shared/TextInput';

type EducationalDataProps = {
    selectedDegree: string;
};

const EducationalData: React.FC<EducationalDataProps> = ({ selectedDegree }) => {
    const { register, formState: { errors }, watch, setValue } = useFormContext();
    const [stillEducating, setStillEducating] = useState(false);

    useEffect(() => {
        setValue('stillEducating', false);
    }, [setValue]);

    const handleCheckboxChange = (checked: boolean) => {
        setStillEducating(checked);
        setValue('stillEducating', checked);
    };

    const watchAllFields = watch();

    useEffect(() => {
        console.log(watchAllFields);
    }, [watchAllFields]);

    return (
        <>
            <div className='flex justify-start'>
                <div className='w-1/2 p-5'>
                    <KLabel>رشته تحصیلی</KLabel>
                    <KTextInput id='studyField' {...register('studyField')} />
                </div>
                {selectedDegree !== 'diploma' && (
                    <div className='w-1/2 p-5'>
                        <KLabel>دانشگاه</KLabel>
                        <KTextInput id='university' {...register('university')} />
                    </div>
                )}
            </div>

            {selectedDegree !== 'diploma' && (
                <>
                    <div className='flex justify-center'>
                        <div className="w-1/2 p-5">
                            <KLabel>معدل (اختیاری)</KLabel>
                            <KTextInput {...register('gpa')} numeric maxLength={2} />
                            {errors.gpa && <span className="text-red-500 text-sm">نام الزامی است</span>}
                        </div>
                        <div className="w-1/2 p-5">
                            <KLabel>سال شروع</KLabel>
                            <KTextInput
                                numeric
                                maxLength={4}
                                id="fromYear"
                                {...register('fromYear', { required: true, maxLength: 4 })}
                            />
                            {errors.fromYear && (
                                <p className="text-red-500 text-sm">
                                    سال شروع الزامی می باشد .
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
                                    maxLength={4}
                                    id="toYear"
                                    {...register('toYear', { required: !stillEducating, maxLength: 4 })}
                                />
                                {errors.toYear && (
                                    <p className="text-red-500 text-sm">
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
