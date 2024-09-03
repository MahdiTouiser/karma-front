import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState, } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import useApi from '../../../../../hooks/useApi';
import { DegreeLevelDescriptions, } from '../../../../../models/enums';
import KButton from '../../../../shared/Button';
import KLabel from '../../../../shared/Label';
import KRadioButton from '../../../../shared/RadioButton';
import KSelectboxWithSearch from '../../../../shared/SelectboxWithSearch';
import KSpinner from '../../../../shared/Spinner';
import KTextInput from '../../../../shared/TextInput';
const EducationalRecord = (props) => {
    const { setIsRecordVisible, refresh, record } = props;
    const options = Object.keys(DegreeLevelDescriptions).map((key) => ({
        label: DegreeLevelDescriptions[key],
        value: key,
    }));
    const [selectedOption, setSelectedOption] = useState('');
    const [majors, setMajors] = useState([]);
    const [universities, setUniversities] = useState([]);
    const [selectedMajor, setSelectedMajor] = useState(null);
    const [selectedUniversity, setSelectedUniversity] = useState(null);
    const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm();
    const { sendRequest: universitiesSendRequest } = useApi();
    const { sendRequest: majorsSendRequest } = useApi();
    const { sendRequest: AddEducationalData, isPending } = useApi();
    const { sendRequest: UpdateEducationalData, isPending: UpdateEducationalIsPending } = useApi();
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
                if (key === 'major') {
                    setValue('majorId', record.major.id);
                    setSelectedMajor({ value: record.major.id, label: record.major.title });
                }
                else if (key === 'university') {
                    setValue('universityId', record.university.id);
                    setSelectedUniversity({ value: record.university.id, label: record.university.title });
                }
                else {
                    setValue(key, record[key]);
                }
            });
            setSelectedOption(record.degreeLevel);
        }
    }, [record, setValue, reset]);
    const onSubmit = async (data) => {
        const apiCall = record ? UpdateEducationalData : AddEducationalData;
        const url = record ? `/Resumes/UpdateEducationalRecord/${record.id}` : '/Resumes/AddEducationalRecord';
        const method = record ? 'put' : 'post';
        apiCall({
            url: url,
            method: method,
            data: data,
        }, (response) => {
            toast.success(response?.message);
            reset();
            refresh();
            setIsRecordVisible(false);
        }, (error) => {
            toast.error(error?.message);
        });
    };
    const handleOptionChange = (value) => {
        setSelectedOption(value);
        setValue('degreeLevel', value);
    };
    const handleItemChange = (item, value) => {
        setValue(item, value);
    };
    const handleCancel = () => {
        reset();
        setIsRecordVisible(false);
    };
    const handleFormSubmit = () => {
        handleSubmit(onSubmit)();
    };
    return (_jsxs(_Fragment, { children: [_jsxs("form", { className: 'flex flex-col w-full mt-8 md:flex-row', onSubmit: handleSubmit(onSubmit), children: [_jsxs("div", { className: 'w-full pr-4 md:w-1/2', children: [_jsxs("div", { className: 'mt-4', children: [_jsx(KLabel, { children: "\u0645\u0642\u0637\u0639 \u062A\u062D\u0635\u06CC\u0644\u06CC" }), _jsx(KRadioButton, { options: options, onOptionChange: handleOptionChange, selectedOption: selectedOption, register: register('degreeLevel', { required: true }) }), errors.degreeLevel && _jsx("span", { className: 'text-xs text-red-500', children: "\u0645\u0642\u0637\u0639 \u062A\u062D\u0635\u06CC\u0644\u06CC \u0627\u0644\u0632\u0627\u0645\u06CC \u0627\u0633\u062A ." })] }), _jsxs("div", { className: 'mt-4', children: [_jsx(KLabel, { children: "\u062F\u0627\u0646\u0634\u06AF\u0627\u0647" }), _jsx(KSelectboxWithSearch, { id: 'universityId', options: universities, register: register('universityId', { required: true }), errors: errors.universityId, onChange: (value) => handleItemChange('universityId', value), defaultValue: selectedUniversity }), errors.universityId && _jsx("span", { className: "text-xs text-red-500", children: "\u0646\u0627\u0645 \u062F\u0627\u0646\u0634\u06AF\u0627\u0647 \u0627\u0644\u0632\u0627\u0645\u06CC \u0627\u0633\u062A ." })] }), _jsxs("div", { className: 'mt-4', children: [_jsx(KLabel, { children: "\u0633\u0627\u0644 \u0634\u0631\u0648\u0639" }), _jsx(KTextInput, { numeric: true, maxLength: 4, ...register('fromYear', { required: true }), placeholder: '\u06F1\u06F3\u06F9\u06F6' }), errors.fromYear && _jsx("span", { className: 'text-xs text-red-500', children: "\u0633\u0627\u0644 \u0634\u0631\u0648\u0639 \u0627\u0644\u0632\u0627\u0645\u06CC \u0627\u0633\u062A ." })] })] }), _jsxs("div", { className: 'w-full pr-4 md:w-1/2', children: [_jsxs("div", { className: 'mt-4', children: [_jsx(KLabel, { children: "\u0631\u0634\u062A\u0647 \u062A\u062D\u0635\u06CC\u0644\u06CC" }), _jsx(KSelectboxWithSearch, { id: 'majorId', options: majors, register: register('majorId', { required: true }), errors: errors.majorId, onChange: (value) => handleItemChange('majorId', value), defaultValue: selectedMajor }), errors.majorId && _jsx("span", { className: 'text-xs text-red-500', children: "\u0631\u0634\u062A\u0647 \u062A\u062D\u0635\u06CC\u0644\u06CC \u0627\u0644\u0632\u0627\u0645\u06CC \u0627\u0633\u062A ." })] }), _jsxs("div", { className: 'mt-4', children: [_jsx(KLabel, { children: "\u0645\u0639\u062F\u0644(\u0627\u062E\u062A\u06CC\u0627\u0631\u06CC)" }), _jsx(KTextInput, { placeholder: ' \u06F1\u06F7.\u06F3\u06F6', numeric: true, allowDecimal: true, ...register('gpa'), maxLength: 5 })] }), _jsxs("div", { className: 'mt-4', children: [_jsx(KLabel, { children: "\u0633\u0627\u0644 \u067E\u0627\u06CC\u0627\u0646" }), _jsx(KTextInput, { numeric: true, maxLength: 4, ...register('toYear', { required: true }), placeholder: '\u06F1\u06F4\u06F0\u06F0' }), errors.toYear && _jsx("span", { className: 'text-xs text-red-500', children: "\u0633\u0627\u0644 \u067E\u0627\u06CC\u0627\u0646 \u0627\u0644\u0632\u0627\u0645\u06CC \u0627\u0633\u062A ." })] })] })] }), _jsxs("div", { className: 'flex justify-end p-2', children: [_jsx(KButton, { color: 'secondary', className: 'ml-4', onClick: handleCancel, children: "\u0627\u0646\u0635\u0631\u0627\u0641" }), (isPending || UpdateEducationalIsPending) ? _jsx(KSpinner, { color: 'primary' }) :
                        _jsx(KButton, { color: 'primary', type: "button", onClick: handleFormSubmit, children: "\u0630\u062E\u06CC\u0631\u0647" })] })] }));
};
export default EducationalRecord;
