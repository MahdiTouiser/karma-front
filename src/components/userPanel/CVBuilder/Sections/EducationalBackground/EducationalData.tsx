import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import KCheckbox from '../../../../shared/Checkbox';
import KLabel from '../../../../shared/Label';
import KTextInput from '../../../../shared/TextInput';

type EducationalDataProps = {
    selectedDegree: string;
};

const EducationalData: React.FC<EducationalDataProps> = ({ selectedDegree }) => {
    const { register, formState: { errors } } = useForm();
    const [isCurrentlyStudying, setIsCurrentlyStudying] = useState(false);

    const handleCheckboxChange = (checked: boolean) => {
        setIsCurrentlyStudying(checked);
    };

    return (
        <>
            <div className='flex justify-start'>
                <div className='w-1/2 p-5'>
                    <KLabel>رشته تحصیلی</KLabel>
                    <KTextInput id='studyField' />
                </div>
                {selectedDegree !== 'diploma' && (
                    <div className='w-1/2 p-5'>
                        <KLabel>دانشگاه</KLabel>
                        <KTextInput id='university' />
                    </div>
                )}
            </div>

            {selectedDegree !== 'diploma' && (
                <>
                    <div className='flex justify-center'>
                        <div className="w-1/2 p-5">
                            <KLabel>معدل (اختیاری)</KLabel>
                            <KTextInput {...register('gpa', { required: true })} numeric maxLength={2} />
                            {errors.gpa && <span className="text-red-500 text-sm">نام الزامی است</span>}
                        </div>
                        <div className="w-1/2 p-5">
                            <KLabel>سال شروع</KLabel>
                            <KTextInput
                                numeric
                                name="fromYear"
                                required={true}
                                id="fromYear"
                                maxLength={4}
                            />
                            {errors.fromYear && (
                                <p className="text-red-500 text-sm">
                                    سال شروع الزامی می باشد .
                                </p>
                            )}
                        </div>
                    </div>
                    {!isCurrentlyStudying && (
                        <div className='flex justify-start'>
                            <div className="w-1/2 p-5">
                                <KLabel>سال پایان</KLabel>
                                <KTextInput
                                    numeric
                                    name="toYear"
                                    required={true}
                                    id="toYear"
                                    maxLength={4}
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
                        <KCheckbox content={'هنوز مشغول به تحصیل هستم .'} onChange={handleCheckboxChange} />
                    </div>
                </>
            )}
        </>
    );
};

export default EducationalData;
