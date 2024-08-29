import React, {
    useEffect,
    useState,
} from 'react';

import {
    SubmitHandler,
    useForm,
} from 'react-hook-form';
import { toast } from 'react-toastify';

import useApi from '../../../../hooks/useApi';
import {
    EducationalBackgroundFormData,
    EducationalRecordModel,
    Majors,
    Universities,
} from '../../../../models/cvbuilder.models';
import {
    DegreeLevel,
    DegreeLevelDescriptions,
} from '../../../../models/enums';
import {
    BaseResponse,
    OptionType,
} from '../../../../models/shared.models';
import KButton from '../../../shared/Button';
import KLabel from '../../../shared/Label';
import KModal from '../../../shared/Modal/Modal';
import KSelect from '../../../shared/Select';
import KSelectboxWithSearch from '../../../shared/SelectboxWithSearch';
import KSpinner from '../../../shared/Spinner';
import KTextInput from '../../../shared/TextInput';

interface EducationalHistoryModalProps {
    show: boolean;
    onClose: () => void;
    fetch: () => void;
    editMode: boolean;
    record: EducationalRecordModel | null;
}

const EducationalHistoryModal: React.FC<EducationalHistoryModalProps> = (props) => {
    const { show, onClose, fetch, editMode, record } = props;
    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<EducationalBackgroundFormData>();
    const [majors, setMajors] = useState<OptionType[]>([]);
    const [universities, setUniversities] = useState<OptionType[]>([]);
    const [selectedMajor, setSelectedMajor] = useState<OptionType | null>(null);
    const [selectedUniversity, setSelectedUniversity] = useState<OptionType | null>(null);
    const { sendRequest: universitiesSendRequest } = useApi<null, BaseResponse<Universities[]>>();
    const { sendRequest: majorsSendRequest } = useApi<null, BaseResponse<Majors[]>>();
    const { sendRequest: AddEducationalData, isPending } = useApi<Partial<EducationalBackgroundFormData>, BaseResponse<null>>();
    const { sendRequest: UpdateEducationalData } = useApi<Partial<EducationalBackgroundFormData>, BaseResponse<null>>();

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

    useEffect(() => {
        if (record) {
            Object.keys(record).forEach((key) => {
                if (key === "major") {
                    setValue("majorId", record.major.id);
                    setSelectedMajor({ value: record.major.id, label: record.major.title });
                } else if (key === "university") {
                    setValue("universityId", record.university.id);
                    setSelectedUniversity({ value: record.university.id, label: record.university.title });
                } else {
                    setValue(key as keyof EducationalBackgroundFormData, (record as any)[key]);
                }
            });
        }
    }, [record, setValue, reset]);

    const onSubmit: SubmitHandler<EducationalBackgroundFormData> = async (data) => {
        const fieldsToConvert = ["fromYear", "gpa", "majorId", "toYear", "universityId"] as const;

        fieldsToConvert.forEach((field) => {
            if (data[field] !== undefined && data[field] !== null) {
                data[field] = +data[field];
            }
        });

        const apiCall = editMode && record ? UpdateEducationalData : AddEducationalData;
        const url = editMode && record ? `/Resumes/UpdateEducationalRecord/${record.id}` : "/Resumes/AddEducationalRecord";
        const method = editMode && record ? "put" : "post";

        apiCall(
            {
                url: url,
                method: method,
                data: data,
            },
            (response) => {
                toast.success(response?.message);
                reset();
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

    const handleItemChange = (item: "majorId" | "universityId", value: number) => {
        setValue(item, value);
    };

    return (
        <KModal show={show} onClose={onClose}>
            <KModal.Header>
                <h2>{editMode ? "ویرایش سابقه تحصیلی" : "افزودن سابقه تحصیلی جدید"}</h2>
            </KModal.Header>
            <div className="p-4">
                <KModal.Body>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex flex-wrap justify-start">
                            <div className="w-full p-5 md:w-1/2">
                                <KLabel>مدرک تحصیلی</KLabel>
                                <KSelect
                                    defaultValue=""
                                    id="degreeLevel"
                                    placeholder="انتخاب کنید"
                                    {...register("degreeLevel", { required: true })}
                                >
                                    {Object.values(DegreeLevel).map((degree) => (
                                        <option key={degree} value={degree}>
                                            {DegreeLevelDescriptions[degree]}
                                        </option>
                                    ))}
                                </KSelect>
                                {errors.degreeLevel && <span className="text-sm text-red-500">این فیلد الزامی است</span>}
                            </div>
                            <div className="w-full p-5 md:w-1/2">
                                <KLabel>رشته تحصیلی</KLabel>
                                <KSelectboxWithSearch
                                    id="majorId"
                                    options={majors}
                                    register={register("majorId", { required: true })}
                                    errors={errors.majorId}
                                    onChange={(value: number) => handleItemChange('majorId', value)}
                                    defaultValue={selectedMajor}
                                />
                            </div>
                            <div className="w-full p-5 md:w-1/2">
                                <KLabel>دانشگاه</KLabel>
                                <KSelectboxWithSearch
                                    id="universityId"
                                    options={universities}
                                    register={register("universityId", { required: true })}
                                    errors={errors.universityId}
                                    onChange={(value: number) => handleItemChange('universityId', value)}
                                    defaultValue={selectedUniversity}
                                />
                            </div>
                            <div className="w-full p-5 md:w-1/2">
                                <KLabel>معدل (اختیاری)</KLabel>
                                <KTextInput
                                    placeholder=" ۱۷.۳۶"
                                    numeric
                                    allowDecimal
                                    {...register("gpa")}
                                    maxLength={5}
                                />
                                {errors.gpa && <span className="text-xs text-red-500">نام الزامی است</span>}
                            </div>
                            <div className="w-full p-5 md:w-1/2">
                                <KLabel>سال شروع</KLabel>
                                <KTextInput
                                    numeric
                                    placeholder=" ۱۳۹۵"
                                    maxLength={4}
                                    id="fromYear"
                                    {...register("fromYear", { required: true, maxLength: 4 })}
                                />
                                {errors.fromYear && (
                                    <p className="text-xs text-red-500">
                                        سال شروع الزامی می باشد.
                                    </p>
                                )}
                            </div>
                            <div className="w-full p-5 md:w-1/2">
                                <KLabel>سال پایان</KLabel>
                                <KTextInput
                                    numeric
                                    placeholder=" ۱۴۰۰"
                                    maxLength={4}
                                    id="toYear"
                                    {...register("toYear", { required: false, maxLength: 4 })}
                                />
                                {errors.toYear && (
                                    <p className="text-xs text-red-500">
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
                            <KButton color="primary" type="button" onClick={handleFormSubmit}>
                                ذخیره
                            </KButton>
                        )}
                    </div>
                </KModal.Body>
            </div>
        </KModal>
    );
};

export default EducationalHistoryModal;
