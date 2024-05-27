import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import useAPi from '../../../../../hooks/useApi';
import { EducationalBackgroundFormData } from '../../../../../models/cvbuilder.models';
import { BaseResponse } from '../../../../../models/shared.models';
import KButton from '../../../../shared/Button';
import KLabel from '../../../../shared/Label';
import KSelect from '../../../../shared/Select';
import KSpinner from '../../../../shared/Spinner';
import EducationalData from './EducationalData';

const EducationalBackground: React.FC<{ goToPreviousStep: () => void }> = (props) => {
    const methods = useForm<EducationalBackgroundFormData>({ defaultValues: { stillEducating: false } });
    const { register, handleSubmit, formState: { errors }, setValue } = methods;
    const [selectedDegree, setSelectedDegree] = useState<string | null>(null);
    const { sendRequest, isPending } = useAPi<EducationalBackgroundFormData, BaseResponse<null>>();
    const [isRecordCreated, setIsRecordCreated] = useState(false);

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
            default:
                return value || '';
        }
    };

    const onSubmit = (data: EducationalBackgroundFormData) => {
        const finalData: Partial<EducationalBackgroundFormData> = {};
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                finalData[key as keyof EducationalBackgroundFormData] = convertToType(
                    key as keyof EducationalBackgroundFormData,
                    data[key as keyof EducationalBackgroundFormData] as unknown as string
                );
            }
        }
        console.log(finalData);
        setIsRecordCreated(true);
    };

    const handleFormSubmit = () => {
        handleSubmit(onSubmit)();
    };

    return (
        <>
            {!Object.keys(errors).length && isRecordCreated ? (
                <>
                    <p>Mahdi</p>
                </>
            ) : (
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
                        <div className='flex justify-end p-5'>
                            <KButton color='secondary' className='ml-4' onClick={props.goToPreviousStep}>
                                مرحله قبلی
                            </KButton>
                            {isPending ? <KSpinner color='primary' /> :
                                <KButton color='primary' type="button" onClick={handleFormSubmit}>
                                    ذخیره و مرحله بعد
                                </KButton>
                            }
                        </div>
                    </form>
                </FormProvider>
            )}
        </>
    );
};

export default EducationalBackground;
