import React, {
    useEffect,
    useState,
} from 'react';

import {
    FormProvider,
    useForm,
} from 'react-hook-form';
import { toast } from 'react-toastify';

import useApi from '../../../../../hooks/useApi';
import {
    EducationalBackgroundFormData,
    EducationalRecordModel,
} from '../../../../../models/cvbuilder.models';
import { BaseResponse } from '../../../../../models/shared.models';
import KButton from '../../../../shared/Button';
import KSpinner from '../../../../shared/Spinner';
import EducationalData from './EducationalData';
import EducationalRecordCards from './EducationalRecordCards';

const EducationalBackground: React.FC<{ goToPreviousStep: () => void, onSubmitSuccess: () => void }> = (props) => {
    const { goToPreviousStep, onSubmitSuccess } = props;
    const methods = useForm<EducationalBackgroundFormData>({ defaultValues: { stillEducating: false } });
    const { handleSubmit, formState: { errors } } = methods;
    const { sendRequest: fetch, isPending: fetchIsPending } = useApi<EducationalBackgroundFormData, EducationalRecordModel[]>();
    const { sendRequest: AddEducationalData, isPending } = useApi<Partial<EducationalBackgroundFormData>, BaseResponse<null>>();
    const [isRecordCreated, setIsRecordCreated] = useState(false);
    const [educationalRecords, setEducationalRecords] = useState<EducationalRecordModel[]>([]);
    const [isRecordVisible, setIsRecordVisible] = useState(false);

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
        (isRecordVisible || !isRecordCreated) ? handleFormSubmit() : onSubmitSuccess();
    };

    return (
        <>
            {fetchIsPending ? (
                <span className='flex items-center justify-center h-screen'>
                    <KSpinner color='primary' size={20} />
                </span>
            ) : (
                <>
                    {!Object.keys(errors).length && isRecordCreated ? (
                        <EducationalRecordCards
                            records={educationalRecords}
                            refresh={fetchEducationalRecords}
                            setIsRecordVisible={setIsRecordVisible}
                            isRecordVisible={isRecordVisible}
                        />
                    ) : (
                        <FormProvider {...methods}>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <h1 className="text-2xl font-bold">سوابق تحصیلی</h1>
                                <div className='mt-10'>
                                    <EducationalData />
                                </div>
                            </form>
                        </FormProvider>
                    )}
                    {!isRecordVisible && (
                        <div className='flex justify-end p-2'>
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