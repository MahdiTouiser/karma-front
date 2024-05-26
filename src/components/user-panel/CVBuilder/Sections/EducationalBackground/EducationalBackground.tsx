import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { EducationalBackgroundFormData } from '../../../../../models/cvbuilder.models';
import KLabel from '../../../../shared/Label';
import KSelect from '../../../../shared/Select';
import EducationalData from './EducationalData';


const EducationalBackground: React.FC = () => {
    const methods = useForm<EducationalBackgroundFormData>({ defaultValues: { stillEducating: false } });
    const { register, handleSubmit, formState: { errors }, setValue } = methods;
    const [selectedDegree, setSelectedDegree] = useState<string | null>(null);



    const degrees = [
        { label: 'دیپلم', value: 'Diploma' },
        { label: 'فوق دیپلم', value: 'Associate' },
        { label: 'کارشناسی', value: 'Bachelor' },
        { label: 'کارشناسی ارشد', value: 'Master' },
        { label: 'دکترا', value: 'Phd' }
    ];

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedLabel = degrees.find(degree => degree.value === event.target.value)?.value || null;
        setSelectedDegree(selectedLabel);
        setValue('degreeLevel', selectedLabel || '');
    };

    const onSubmit = (data: EducationalBackgroundFormData) => {
        const { stillEducating, ...rest } = data;
        const finalData = {
            ...rest,
            ...(stillEducating ? {} : { toYear: data.toYear })
        };
        console.log(finalData);
    };

    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <h1 className="text-2xl font-bold">سوابق تحصیلی</h1>
                    <div className='mt-10 p-5'>
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
            </form>
        </FormProvider>
    );
};

export default EducationalBackground;
