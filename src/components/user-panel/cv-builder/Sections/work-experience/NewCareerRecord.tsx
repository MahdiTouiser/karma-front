import React from 'react';
import { useForm } from 'react-hook-form';
import useApi from '../../../../../hooks/useApi';
import { WorkExperienceFormData } from '../../../../../models/cvbuilder.models';
import { BaseResponse } from '../../../../../models/shared.models';
import KButton from '../../../../shared/Button';
import KLabel from '../../../../shared/Label';
import KSpinner from '../../../../shared/Spinner';
import KTextInput from '../../../../shared/TextInput';


interface NewCareerRecordProps {
    setIsNewRecordVisible: (visible: boolean) => void;
    refresh: () => void;
}
const NewCareerRecord: React.FC<NewCareerRecordProps> = ({ setIsNewRecordVisible, refresh }) => {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm<WorkExperienceFormData>();
    const { sendRequest: AddWorkData, isPending } = useApi<Partial<WorkExperienceFormData>, BaseResponse<null>>();

    const handleFormSubmit = () => {
        handleSubmit(onSubmit)();
    };

    const convertToType = (key: keyof WorkExperienceFormData, value: string | undefined): any => {
        switch (key) {
            case 'jobcategoryId':
            case 'fromYear':
            case 'toYear':
                return value ? parseInt(value, 10) : undefined;
            default:
                return value || '';
        }
    };

    const onSubmit = async (data: WorkExperienceFormData) => {
        const finalData: Partial<WorkExperienceFormData> = {};
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                finalData[key as keyof WorkExperienceFormData] = convertToType(
                    key as keyof WorkExperienceFormData,
                    data[key as keyof WorkExperienceFormData] as unknown as string
                );
            }
        }
    }

    return (
        <>
            <form className='mt-8 w-full flex' onSubmit={handleSubmit(onSubmit)}>
                <div className='w-1/2 pr-4 mt-4'>
                    <div className='inline-block w-full'>
                        <KLabel>مقطع تحصیلی</KLabel>

                    </div>
                    <div className='mt-4'>
                        <div className='inline-block w-full'>
                            <KLabel>دانشگاه</KLabel>

                            {/* {errors.universityId && <span className="text-red-500 text-xs">نام دانشگاه الزامی است .</span>} */}
                        </div>
                    </div>
                    <div className='mt-4'>
                        <KLabel>سال شروع</KLabel>
                        <KTextInput numeric maxLength={4} {...register('fromYear', { required: true })} placeholder='۱۳۹۶' />
                        {errors.fromYear && <span className="text-red-500 text-xs">سال شروع الزامی است .</span>}
                    </div>
                </div>
                <div className='w-1/2 pr-4 mt-4'>
                    <div className='inline-block w-full'>
                        <KLabel>رشته تحصیلی</KLabel>
                        {/* {errors.majorId && <span className="text-red-500 text-xs">رشته تحصیلی الزامی است .</span>} */}
                    </div>
                    <div className='mt-4'>
                        <div className='inline-block w-full'>
                            <KLabel>معدل</KLabel>
                            {/* <KTextInput placeholder=' ۱۷.۳۶'
                                numeric allowDecimal  {...register('gpa', { required: true })} maxLength={5} /> */}
                            {/* {errors.gpa && <span className="text-red-500 text-xs">معدل الزامی است .</span>} */}
                        </div>
                    </div>
                    <div className='mt-4'>
                        <KLabel>سال پایان</KLabel>
                        <KTextInput numeric maxLength={4} {...register('toYear', { required: true })} placeholder='۱۴۰۰'
                        />
                        {errors.toYear && <span className="text-red-500 text-xs">سال پایان الزامی است .</span>}
                    </div>
                </div>
            </form>
            <div className='flex justify-end p-5'>
                <KButton color='secondary' className='ml-4' onClick={() => setIsNewRecordVisible(false)}>
                    انصراف
                </KButton>
                {isPending ? <KSpinner color='primary' /> :
                    <KButton color='primary' type="button" onClick={handleFormSubmit}>
                        ذخیره
                    </KButton>
                }
            </div>
        </>)
}

export default NewCareerRecord