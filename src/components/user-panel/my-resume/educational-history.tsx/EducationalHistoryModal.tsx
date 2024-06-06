import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import useApi from "../../../../hooks/useApi";
import { EducationalBackgroundFormData, Majors, Universities } from "../../../../models/cvbuilder.models";
import { DegreeLevel, DegreeLevelDescriptions } from "../../../../models/enums";
import { BaseResponse, OptionType } from "../../../../models/shared.models";
import KButton from "../../../shared/Button";
import KLabel from "../../../shared/Label";
import KModal from "../../../shared/Modal/Modal";
import KSelect from "../../../shared/Select";
import KSpinner from "../../../shared/Spinner";
import KTextInput from "../../../shared/TextInput";

const EducationalHistoryModal: React.FC<{ show: boolean; onClose: () => void; fetch: () => void }> = ({ show, onClose, fetch }) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<EducationalBackgroundFormData>();
    const [majors, setMajors] = useState<OptionType[]>([]);
    const [universities, setUniversities] = useState<OptionType[]>([]);
    const { sendRequest: universitiesSendRequest } = useApi<null, BaseResponse<Universities[]>>();
    const { sendRequest: majorsSendRequest } = useApi<null, BaseResponse<Majors[]>>();
    const { sendRequest: AddEducationalData, isPending } = useApi<Partial<EducationalBackgroundFormData>, BaseResponse<null>>();

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
        fetchMajors();
        fetchUniversities();
    }, []);

    const onSubmit: SubmitHandler<EducationalBackgroundFormData> = async (data) => {
        const fieldsToConvert = ['fromYear', 'gpa', 'majorId', 'toYear', 'universityId'] as const;

        fieldsToConvert.forEach((field) => {
            if (data[field] !== undefined && data[field] !== null) {
                data[field] = +data[field];
            }
        });

        AddEducationalData(
            {
                url: '/Resumes/AddEducationalRecord',
                method: "post",
                data: data,
            },
            (response) => {
                toast.success(response?.message);
                reset(); // Reset the form fields to their default state
                onClose();
                fetch();
            },
            (error) => {
                toast.error(error?.message);
            }
        );
    };

    const handleFormSubmit = () => {
        handleSubmit(onSubmit)();
    };

    return (
        <KModal show={show} onClose={onClose} containerClass="!w-full !max-w-[40vw] !md:max-w-[70vw] !lg:max-w-[60vw] !pb-2">
            <KModal.Header>
                <h2>افزودن سابقه تحصیلی جدید</h2>
            </KModal.Header>
            <div className='p-4'>
                <KModal.Body>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex flex-wrap justify-start">
                            <div className="w-full md:w-1/2 p-5">
                                <KLabel>مدرک تحصیلی</KLabel>
                                <KSelect
                                    defaultValue=''
                                    id='degreeLevel'
                                    placeholder="انتخاب کنید"
                                    {...register('degreeLevel', { required: true })}
                                >
                                    {Object.values(DegreeLevel).map((degree) => (
                                        <option key={degree} value={degree}>
                                            {DegreeLevelDescriptions[degree]}
                                        </option>
                                    ))}
                                </KSelect>
                                {errors.degreeLevel && <span className="text-red-500 text-sm">این فیلد الزامی است</span>}
                            </div>
                            <div className="w-full md:w-1/2 p-5">
                                <KLabel>رشته تحصیلی</KLabel>
                                <KSelect {...register('majorId')}>
                                    {majors.map((major) => (
                                        <option key={major.value} value={major.value}>{major.label}</option>
                                    ))}
                                </KSelect>
                            </div>
                            <div className="w-full md:w-1/2 p-5">
                                <KLabel>دانشگاه</KLabel>
                                <KSelect {...register('universityId')}>
                                    {universities.map((university) => (
                                        <option key={university.value} value={university.value}>{university.label}</option>
                                    ))}
                                </KSelect>
                            </div>
                            <div className="w-full md:w-1/2 p-5">
                                <KLabel>معدل (اختیاری)</KLabel>
                                <KTextInput
                                    placeholder=' ۱۷.۳۶'
                                    numeric
                                    allowDecimal
                                    {...register('gpa')}
                                    maxLength={5}
                                />
                                {errors.gpa && <span className="text-red-500 text-xs">نام الزامی است</span>}
                            </div>
                            <div className="w-full md:w-1/2 p-5">
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
                            <div className="w-full md:w-1/2 p-5">
                                <KLabel>سال پایان</KLabel>
                                <KTextInput
                                    numeric
                                    placeholder=' ۱۴۰۰'
                                    maxLength={4}
                                    id="toYear"
                                    {...register('toYear', { required: false, maxLength: 4 })}
                                />
                                {errors.toYear && (
                                    <p className="text-red-500 text-xs">
                                        سال پایان الزامی می باشد .
                                    </p>
                                )}
                            </div>
                        </div>
                    </form>
                    <div className="flex justify-end px-5">
                        {isPending ? (
                            <KSpinner />
                        ) : (
                            <KButton color='primary' type="button" onClick={handleFormSubmit}>
                                ذخیره
                            </KButton>
                        )}
                    </div>
                </KModal.Body>
            </div>
        </KModal>
    )
}

export default EducationalHistoryModal;
