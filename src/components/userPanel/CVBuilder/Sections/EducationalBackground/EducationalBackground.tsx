import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import useAPi from '../../../../../hooks/useApi';
import { BaseResponse } from '../../../../../models/shared.models';
import KButton from '../../../../shared/Button';
import KLabel from '../../../../shared/Label';
import KSelect from '../../../../shared/Select';
import KSpinner from '../../../../shared/Spinner';
import EducationalData from './EducationalData';

type FormValues = {
    degreeLevel: string;
};

const EducationalBackground: React.FC = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormValues>();
    const [selectedDegree, setSelectedDegree] = useState<string | null>(null);

    const { isPending } = useAPi<null, BaseResponse<null>>();

    const degrees = [
        { label: 'دیپلم', value: 'diploma' },
        { label: 'فوق دیپلم', value: 'associate' },
        { label: 'کارشناسی', value: 'bachelor' },
        { label: 'کارشناسی ارشد', value: 'master' },
        { label: 'دکترا', value: 'phd' }
    ];

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedLabel = degrees.find(degree => degree.value === event.target.value)?.value || null;
        setSelectedDegree(selectedLabel);
    };


    return (
        <>
            <div>
                <h1 className="text-2xl font-bold">سوابق تحصیلی</h1>
                <div className='mt-10'>
                    <KLabel>آخرین مدرک تحصیلی</KLabel>
                    <KSelect
                        defaultValue=''
                        id='degreeLevel'
                        placeholder="انتخاب کنید"
                        {...register('degreeLevel', { required: true })}
                        onChange={handleSelectChange}
                    >
                        {degrees.map((degree, index) => (
                            <option key={index} value={degree.value}>{degree.label}</option>
                        ))}
                    </KSelect>
                    {errors.degreeLevel && <span className="text-red-500">این فیلد الزامی است</span>}
                </div>
                {selectedDegree && (
                    <div className='mt-10'>
                        <EducationalData selectedDegree={selectedDegree} />
                    </div>
                )}
            </div>

            <div className='flex justify-end p-5'>
                <KButton color='secondary' className='ml-4'>
                    مرحله قبلی
                </KButton>
                {isPending ? <KSpinner color='primary' /> :
                    <KButton color='primary' type="submit">
                        ذخیره و مرحله بعد
                    </KButton>
                }
            </div>
        </>
    );
};

export default EducationalBackground;
