import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState, } from 'react';
import { useForm, } from 'react-hook-form';
import { toast } from 'react-toastify';
import useApi from '../../../../hooks/useApi';
import { DegreeLevel, DegreeLevelDescriptions, } from '../../../../models/enums';
import KButton from '../../../shared/Button';
import KLabel from '../../../shared/Label';
import KModal from '../../../shared/Modal/Modal';
import KSelect from '../../../shared/Select';
import KSelectboxWithSearch from '../../../shared/SelectboxWithSearch';
import KSpinner from '../../../shared/Spinner';
import KTextInput from '../../../shared/TextInput';
const EducationalHistoryModal = (props) => {
    const { show, onClose, fetch, editMode, record } = props;
    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm();
    const [majors, setMajors] = useState([]);
    const [universities, setUniversities] = useState([]);
    const [selectedMajor, setSelectedMajor] = useState(null);
    const [selectedUniversity, setSelectedUniversity] = useState(null);
    const { sendRequest: universitiesSendRequest } = useApi();
    const { sendRequest: majorsSendRequest } = useApi();
    const { sendRequest: AddEducationalData, isPending } = useApi();
    const { sendRequest: UpdateEducationalData } = useApi();
    const fetchMajors = async () => {
        majorsSendRequest({
            url: "/Majors",
            params: {
                pageSize: 10000,
                pageIndex: 1,
            },
        }, (response) => {
            if (response) {
                const majorOptions = response.map((major) => ({
                    value: major.id,
                    label: major.title,
                }));
                setMajors(majorOptions);
            }
        });
    };
    const fetchUniversities = async () => {
        universitiesSendRequest({
            url: "/Universities",
            params: {
                pageSize: 10000,
                pageIndex: 1,
            },
        }, (response) => {
            if (response) {
                const universityOptions = response.map((university) => ({
                    value: university.id,
                    label: university.title,
                }));
                setUniversities(universityOptions);
            }
        });
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
                }
                else if (key === "university") {
                    setValue("universityId", record.university.id);
                    setSelectedUniversity({ value: record.university.id, label: record.university.title });
                }
                else {
                    setValue(key, record[key]);
                }
            });
        }
    }, [record, setValue, reset]);
    const onSubmit = async (data) => {
        const fieldsToConvert = ["fromYear", "gpa", "majorId", "toYear", "universityId"];
        fieldsToConvert.forEach((field) => {
            if (data[field] !== undefined && data[field] !== null) {
                data[field] = +data[field];
            }
        });
        const apiCall = editMode && record ? UpdateEducationalData : AddEducationalData;
        const url = editMode && record ? `/Resumes/UpdateEducationalRecord/${record.id}` : "/Resumes/AddEducationalRecord";
        const method = editMode && record ? "put" : "post";
        apiCall({
            url: url,
            method: method,
            data: data,
        }, (response) => {
            toast.success(response?.message);
            reset();
            onClose();
            fetch();
        }, (error) => {
            toast.error(error?.message);
        });
    };
    const handleFormSubmit = () => {
        handleSubmit(onSubmit)();
    };
    const handleItemChange = (item, value) => {
        setValue(item, value);
    };
    return (_jsxs(KModal, { show: show, onClose: onClose, children: [_jsx(KModal.Header, { children: _jsx("h2", { children: editMode ? "ویرایش سابقه تحصیلی" : "افزودن سابقه تحصیلی جدید" }) }), _jsx("div", { className: "p-4", children: _jsxs(KModal.Body, { children: [_jsx("form", { onSubmit: handleSubmit(onSubmit), children: _jsxs("div", { className: "flex flex-wrap justify-start", children: [_jsxs("div", { className: "w-full p-5 md:w-1/2", children: [_jsx(KLabel, { children: "\u0645\u062F\u0631\u06A9 \u062A\u062D\u0635\u06CC\u0644\u06CC" }), _jsx(KSelect, { defaultValue: "", id: "degreeLevel", placeholder: "\u0627\u0646\u062A\u062E\u0627\u0628 \u06A9\u0646\u06CC\u062F", ...register("degreeLevel", { required: true }), children: Object.values(DegreeLevel).map((degree) => (_jsx("option", { value: degree, children: DegreeLevelDescriptions[degree] }, degree))) }), errors.degreeLevel && _jsx("span", { className: "text-sm text-red-500", children: "\u0627\u06CC\u0646 \u0641\u06CC\u0644\u062F \u0627\u0644\u0632\u0627\u0645\u06CC \u0627\u0633\u062A" })] }), _jsxs("div", { className: "w-full p-5 md:w-1/2", children: [_jsx(KLabel, { children: "\u0631\u0634\u062A\u0647 \u062A\u062D\u0635\u06CC\u0644\u06CC" }), _jsx(KSelectboxWithSearch, { id: "majorId", options: majors, register: register("majorId", { required: true }), errors: errors.majorId, onChange: (value) => handleItemChange('majorId', value), defaultValue: selectedMajor })] }), _jsxs("div", { className: "w-full p-5 md:w-1/2", children: [_jsx(KLabel, { children: "\u062F\u0627\u0646\u0634\u06AF\u0627\u0647" }), _jsx(KSelectboxWithSearch, { id: "universityId", options: universities, register: register("universityId", { required: true }), errors: errors.universityId, onChange: (value) => handleItemChange('universityId', value), defaultValue: selectedUniversity })] }), _jsxs("div", { className: "w-full p-5 md:w-1/2", children: [_jsx(KLabel, { children: "\u0645\u0639\u062F\u0644 (\u0627\u062E\u062A\u06CC\u0627\u0631\u06CC)" }), _jsx(KTextInput, { placeholder: " \u06F1\u06F7.\u06F3\u06F6", numeric: true, allowDecimal: true, ...register("gpa"), maxLength: 5 }), errors.gpa && _jsx("span", { className: "text-xs text-red-500", children: "\u0646\u0627\u0645 \u0627\u0644\u0632\u0627\u0645\u06CC \u0627\u0633\u062A" })] }), _jsxs("div", { className: "w-full p-5 md:w-1/2", children: [_jsx(KLabel, { children: "\u0633\u0627\u0644 \u0634\u0631\u0648\u0639" }), _jsx(KTextInput, { numeric: true, placeholder: " \u06F1\u06F3\u06F9\u06F5", maxLength: 4, id: "fromYear", ...register("fromYear", { required: true, maxLength: 4 }) }), errors.fromYear && (_jsx("p", { className: "text-xs text-red-500", children: "\u0633\u0627\u0644 \u0634\u0631\u0648\u0639 \u0627\u0644\u0632\u0627\u0645\u06CC \u0645\u06CC \u0628\u0627\u0634\u062F." }))] }), _jsxs("div", { className: "w-full p-5 md:w-1/2", children: [_jsx(KLabel, { children: "\u0633\u0627\u0644 \u067E\u0627\u06CC\u0627\u0646" }), _jsx(KTextInput, { numeric: true, placeholder: " \u06F1\u06F4\u06F0\u06F0", maxLength: 4, id: "toYear", ...register("toYear", { required: false, maxLength: 4 }) }), errors.toYear && (_jsx("p", { className: "text-xs text-red-500", children: "\u0633\u0627\u0644 \u067E\u0627\u06CC\u0627\u0646 \u0627\u0644\u0632\u0627\u0645\u06CC \u0645\u06CC \u0628\u0627\u0634\u062F ." }))] })] }) }), _jsx("div", { className: "flex justify-end px-5", children: isPending ? (_jsx(KSpinner, {})) : (_jsx(KButton, { color: "primary", type: "button", onClick: handleFormSubmit, children: "\u0630\u062E\u06CC\u0631\u0647" })) })] }) })] }));
};
export default EducationalHistoryModal;
