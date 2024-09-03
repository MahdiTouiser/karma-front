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
    const { handleSubmit, formState: { errors }, reset } = methods;
    const { sendRequest: fetch, isPending: fetchIsPending } = useApi<EducationalBackgroundFormData, EducationalRecordModel[]>();
    const { sendRequest: AddEducationalData, isPending } = useApi<Partial<EducationalBackgroundFormData>, BaseResponse<null>>();
    const [isRecordCreated, setIsRecordCreated] = useState(false);
    const [educationalRecords, setEducationalRecords] = useState<EducationalRecordModel[]>([]);
    const [isRecordVisible, setIsRecordVisible] = useState(false);

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
        const cleanedData: EducationalBackgroundFormData = {
            ...data,
            fromYear: +data.fromYear || 0,
        };

        if (!data.stillEducating) {
            cleanedData.toYear = data.toYear !== undefined ? +data.toYear : 0;
        }

        if (data.gpa) {
            cleanedData.gpa = +data.gpa;
        }

        if (data.stillEducating) {
            delete cleanedData.toYear;
        }

        if (!data.gpa) {
            delete cleanedData.gpa;
        }
        AddEducationalData(
            {
                url: "/Resumes/AddEducationalRecord",
                method: "post",
                data: cleanedData,
            },
            (response) => {
                toast.success(response?.message);
                setIsRecordCreated(true);
                fetchEducationalRecords();
                reset();
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