import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState, } from 'react';
import { useFormContext } from 'react-hook-form';
import useApi from '../../../../../hooks/useApi';
import { DegreeLevelDescriptions, } from '../../../../../models/enums';
import KCheckbox from '../../../../shared/Checkbox';
import KLabel from '../../../../shared/Label';
import KRadioButton from '../../../../shared/RadioButton';
import KSelectboxWithSearch from '../../../../shared/SelectboxWithSearch';
import KTextInput from '../../../../shared/TextInput';
const EducationalData = () => {
    const { register, formState: { errors }, setValue, clearErrors } = useFormContext();
    const [majors, setMajors] = useState([]);
    const [universities, setUniversities] = useState([]);
    const { sendRequest: majorsSendRequest } = useApi();
    const { sendRequest: universitiesSendRequest } = useApi();
    const [stillEducating, setStillEducating] = useState(false);
    const [selectedDegree, setSelectedDegree] = useState('');
    const options = Object.keys(DegreeLevelDescriptions).map((key) => ({
        label: DegreeLevelDescriptions[key],
        value: key,
    }));
    const fetchMajors = async () => {
        majorsSendRequest({
            url: "/Majors",
            params: {
                pageSize: 10000,
                pageIndex: 1,
            },
        }, (response) => {
            if (response && Array.isArray(response)) {
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
            if (response && Array.isArray(response)) {
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
        setValue('stillEducating', false);
    }, [setValue]);
    const handleCheckboxChange = (checked) => {
        setStillEducating(checked);
        setValue('stillEducating', checked);
    };
    const handleItemChange = (item, value) => {
        setValue(item, value);
    };
    const handleOptionChange = (value) => {
        setSelectedDegree(value);
        setValue('degreeLevel', value);
    };
    return (_jsxs(_Fragment, { children: [_jsxs("div", { className: 'flex flex-col sm:flex-row', children: [_jsxs("div", { className: 'w-full p-5 sm:w-1/2', children: [_jsx(KLabel, { children: "\u0622\u062E\u0631\u06CC\u0646 \u0645\u062F\u0631\u06A9 \u062A\u062D\u0635\u06CC\u0644\u06CC" }), _jsx(KRadioButton, { options: options, onOptionChange: handleOptionChange, selectedOption: selectedDegree, register: register('degreeLevel', { required: true }) }), errors.degreeLevel && _jsx("span", { className: "text-sm text-red-500", children: "\u0627\u06CC\u0646 \u0641\u06CC\u0644\u062F \u0627\u0644\u0632\u0627\u0645\u06CC \u0627\u0633\u062A" })] }), _jsxs("div", { className: 'w-full p-5 sm:w-1/2', children: [_jsx(KLabel, { children: "\u0631\u0634\u062A\u0647 \u062A\u062D\u0635\u06CC\u0644\u06CC" }), _jsx(KSelectboxWithSearch, { id: 'majorId', options: majors, register: register, errors: errors.majorId, onChange: (value) => handleItemChange('majorId', value), clearError: clearErrors }), errors.majorId && _jsx("span", { className: "text-xs text-red-500", children: "\u0631\u0634\u062A\u0647 \u062A\u062D\u0635\u06CC\u0644\u06CC \u0627\u0644\u0632\u0627\u0645\u06CC \u0627\u0633\u062A." })] })] }), _jsxs("div", { className: 'flex flex-col sm:flex-row', children: [_jsxs("div", { className: "w-full p-5 sm:w-1/2", children: [_jsx(KLabel, { children: "\u062F\u0627\u0646\u0634\u06AF\u0627\u0647" }), _jsx(KSelectboxWithSearch, { id: 'universityId', options: universities, register: register, errors: errors.universityId, onChange: (value) => handleItemChange('universityId', value), clearError: clearErrors }), errors.universityId && _jsx("span", { className: "text-xs text-red-500", children: "\u0646\u0627\u0645 \u062F\u0627\u0646\u0634\u06AF\u0627\u0647 \u0627\u0644\u0632\u0627\u0645\u06CC \u0627\u0633\u062A." })] }), _jsxs("div", { className: "w-full p-5 sm:w-1/2", children: [_jsx(KLabel, { children: "\u0645\u0639\u062F\u0644 (\u0627\u062E\u062A\u06CC\u0627\u0631\u06CC)" }), _jsx(KTextInput, { placeholder: ' \u06F1\u06F7.\u06F3\u06F6', numeric: true, allowDecimal: true, ...register('gpa'), maxLength: 5 }), errors.gpa && _jsx("span", { className: "text-xs text-red-500", children: "\u0645\u0639\u062F\u0644 \u0627\u0644\u0632\u0627\u0645\u06CC \u0646\u06CC\u0633\u062A" })] })] }), _jsxs("div", { className: 'flex flex-col sm:flex-row', children: [_jsxs("div", { className: "w-full p-5 sm:w-1/2", children: [_jsx(KLabel, { children: "\u0633\u0627\u0644 \u0634\u0631\u0648\u0639" }), _jsx(KTextInput, { numeric: true, placeholder: ' \u06F1\u06F3\u06F9\u06F5', maxLength: 4, id: "fromYear", ...register('fromYear', { required: true, maxLength: 4 }) }), errors.fromYear && (_jsx("p", { className: "text-xs text-red-500", children: "\u0633\u0627\u0644 \u0634\u0631\u0648\u0639 \u0627\u0644\u0632\u0627\u0645\u06CC \u0645\u06CC \u0628\u0627\u0634\u062F." }))] }), !stillEducating && (_jsxs("div", { className: "w-full p-5 sm:w-1/2", children: [_jsx(KLabel, { children: "\u0633\u0627\u0644 \u067E\u0627\u06CC\u0627\u0646" }), _jsx(KTextInput, { numeric: true, placeholder: ' \u06F1\u06F4\u06F0\u06F0', maxLength: 4, id: "toYear", ...register('toYear', { required: !stillEducating, maxLength: 4 }) }), errors.toYear && (_jsx("p", { className: "text-xs text-red-500", children: "\u0633\u0627\u0644 \u067E\u0627\u06CC\u0627\u0646 \u0627\u0644\u0632\u0627\u0645\u06CC \u0645\u06CC \u0628\u0627\u0634\u062F." }))] }))] }), _jsx("div", { className: 'p-5', children: _jsx(KCheckbox, { content: 'هنوز مشغول به تحصیل هستم.', onChange: handleCheckboxChange, checked: stillEducating }) })] }));
};
export default EducationalData;
