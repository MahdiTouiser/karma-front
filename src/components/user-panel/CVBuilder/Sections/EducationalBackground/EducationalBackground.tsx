import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import useAPi from '../../../../../hooks/useApi';
import { EducationalBackgroundFormData, EducationalRecord } from '../../../../../models/cvbuilder.models';
import { DegreeLevel, DegreeLevelDescriptions } from '../../../../../models/enums';
import { BaseResponse } from '../../../../../models/shared.models';
import KButton from '../../../../shared/Button';
import KLabel from '../../../../shared/Label';
import KSelect from '../../../../shared/Select';
import KSpinner from '../../../../shared/Spinner';
import EducationalData from './EducationalData';
import EducationalRecordCards from './EducationalRecordCards';

const EducationalBackground: React.FC<{ goToPreviousStep: () => void, onSubmitSuccess: () => void }> = (props) => {
    const { goToPreviousStep, onSubmitSuccess } = props;
    const methods = useForm<EducationalBackgroundFormData>({ defaultValues: { stillEducating: false } });
    const { register, handleSubmit, formState: { errors }, setValue } = methods;
    const [selectedDegree, setSelectedDegree] = useState<string | null>(null);
    const { sendRequest: fetch, isPending: fetchIsPending } = useAPi<EducationalBackgroundFormData, EducationalRecord[]>();
    const { sendRequest: AddEducationalData, isPending } = useAPi<Partial<EducationalBackgroundFormData>, BaseResponse<null>>();
    const [isRecordCreated, setIsRecordCreated] = useState(false);
    const [educationalRecords, setEducationalRecords] = useState<EducationalRecord[]>([]);
    const [isNewRecordVisible, setIsNewRecordVisible] = useState(false);

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setValue('degreeLevel', event.target.value, { shouldValidate: true });
        setSelectedDegree(event.target.value);
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
            case 'degreeLevel':
                return value || null;
            default:
                return value || '';
        }
    };

    const fetchEducationalRecords = () => {
        fetch(
            {
                url: "/Resumes/EducationalRecords",
            },
            (response) => {
                if (response.length === 0) {
                    setIsRecordCreated(false);
                } else {
                    setIsRecordCreated(true);
                    setEducationalRecords(response);
                }
            },
        );
    };

    useEffect(() => {
        fetchEducationalRecords();
    }, []);

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
                setIsRecordCreated(true);
                fetchEducationalRecords();
            },
            (error) => {
                toast.error(error?.message);
            }
        );
    };

    const handleFormSubmit = () => {
        handleSubmit(onSubmit)();
    };

    const handleButtonClick = () => {
        isNewRecordVisible ? handleFormSubmit() : onSubmitSuccess();
    };

    return (
        <>
            {fetchIsPending ? (
                <span className='flex justify-center items-center h-screen'>
                    <KSpinner color='primary' size={20} />
                </span>
            ) : (
                <>
                    {!Object.keys(errors).length && isRecordCreated ? (
                        <EducationalRecordCards
                            records={educationalRecords}
                            refresh={fetchEducationalRecords}
                            setIsNewRecordVisible={setIsNewRecordVisible}
                            isNewRecordVisible={isNewRecordVisible}
                        />
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
                                            {Object.values(DegreeLevel).map((degree) => (
                                                <option key={degree} value={degree}>
                                                    {DegreeLevelDescriptions[degree]}
                                                </option>
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
                    )}
                    {!isNewRecordVisible && (
                        <div className='flex justify-end p-5'>
                            <KButton color='secondary' className='ml-4' onClick={goToPreviousStep}>
                                مرحله قبلی
                            </KButton>
                            {isPending ? <KSpinner color='primary' /> :
                                <KButton color='primary' type="button" onClick={handleButtonClick}>
                                    ذخیره و مرحله بعد
                                </KButton>
                            }
                        </div>
                    )}
                </>
            )}
        </>
    );
};

export default EducationalBackground;
