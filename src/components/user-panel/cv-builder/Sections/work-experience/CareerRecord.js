import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState, } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import useApi from '../../../../../hooks/useApi';
import { hijriMonthOptions, seniorityLevelLabels, SeniorityLevels, } from '../../../../../models/enums';
import KButton from '../../../../shared/Button';
import KCheckbox from '../../../../shared/Checkbox';
import KLabel from '../../../../shared/Label';
import KSelect from '../../../../shared/Select';
import KSelectboxWithSearch from '../../../../shared/SelectboxWithSearch';
import KSpinner from '../../../../shared/Spinner';
import KTextInput from '../../../../shared/TextInput';
const CareerRecord = (props) => {
    const { setIsRecordVisible, refresh, countries, cities, jobCategories, record } = props;
    const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm();
    const [selectedCountry, setSelectedCountry] = useState(1);
    const { sendRequest: AddWorkExperience, isPending } = useApi();
    const { sendRequest: UpdateWorkExperience, isPending: UpdateIsPending } = useApi();
    const [selectedCountryLabel, setSelectedCountryLabel] = useState(null);
    const [selectedCity, setSelectedCity] = useState(null);
    const [selectedJobCategoryId, setSelectedJobCategoryId] = useState(null);
    const [currentJob, setCurrentJob] = useState(false);
    useEffect(() => {
        if (record) {
            Object.keys(record).forEach((key) => {
                if (key === 'country') {
                    setValue('countryId', record.country.id);
                    setSelectedCountryLabel({ value: record.country.id, label: record.country.title });
                }
                else if (key === 'city') {
                    setValue('cityId', record.city.id);
                    setSelectedCity({ value: record.city.id, label: record.city.title });
                }
                else if (key === 'jobCategory') {
                    setValue('jobcategoryId', record.jobCategory.id);
                    setSelectedJobCategoryId({ value: record.jobCategory.id, label: record.jobCategory.title });
                }
                else {
                    setValue(key, record[key]);
                }
                setCurrentJob(record.currentJob);
            });
        }
    }, [record, setValue, reset]);
    const onSubmit = async (data) => {
        if (currentJob) {
            data.toMonth = undefined;
            data.toYear = undefined;
        }
        const apiCall = record ? UpdateWorkExperience : AddWorkExperience;
        const url = record ? `/Resumes/UpdateCareerRecord/${record.id}` : '/Resumes/AddCareerRecord';
        const method = record ? 'put' : 'post';
        apiCall({
            url: url,
            method: method,
            data: data,
        }, (response) => {
            toast.success(response?.message);
            setIsRecordVisible(false);
            refresh();
        }, (error) => {
            toast.error(error?.message);
        });
    };
    const handleFormSubmit = () => {
        handleSubmit((data) => onSubmit({ ...data, currentJob }))();
    };
    const handleCountryChange = (event) => {
        const countryId = event;
        setSelectedCountry(countryId);
        handleItemChange('countryId', countryId);
    };
    const handleItemChange = (item, value) => {
        setValue(item, value);
    };
    const handleItemAndCountryChange = (value) => {
        handleItemChange('countryId', value);
        handleCountryChange(value);
    };
    const handleCurrentJobChange = (checked) => {
        setCurrentJob(checked);
    };
    return (_jsxs(_Fragment, { children: [_jsxs("form", { onSubmit: handleSubmit((data) => onSubmit({ ...data, currentJob })), children: [_jsxs("div", { className: 'flex flex-col w-full md:flex-row', children: [_jsxs("div", { className: 'w-full pr-4 mt-4 md:w-1/2', children: [_jsxs("div", { className: 'inline-block w-full', children: [_jsx(KLabel, { children: "\u0639\u0646\u0648\u0627\u0646 \u0634\u063A\u0644\u06CC" }), _jsx(KTextInput, { ...register('jobTitle', { required: true }) }), errors.jobTitle && (_jsx("p", { className: "text-xs text-red-500", children: "\u0639\u0646\u0648\u0627\u0646 \u0634\u063A\u0644\u06CC \u0627\u0644\u0632\u0627\u0645\u06CC \u0645\u06CC \u0628\u0627\u0634\u062F." }))] }), _jsx("div", { className: 'mt-4', children: _jsxs("div", { className: 'inline-block w-full', children: [_jsx(KLabel, { children: "\u0633\u0637\u062D \u0627\u0631\u0634\u062F\u06CC\u062A" }), _jsx(KSelect, { ...register('seniorityLevel', { required: true }), children: Object.values(SeniorityLevels).map((seniorityValue) => (_jsx("option", { value: seniorityValue, children: seniorityLevelLabels[seniorityValue] }, seniorityValue))) }), errors.seniorityLevel && (_jsx("p", { className: "text-xs text-red-500", children: "\u0633\u0637\u062D \u0627\u0631\u0634\u062F\u06CC\u062A \u0627\u0644\u0632\u0627\u0645\u06CC \u0645\u06CC \u0628\u0627\u0634\u062F." }))] }) }), _jsxs("div", { className: 'flex mt-4', children: [_jsxs("div", { className: 'w-full ml-2 md:w-1/2', children: [_jsx(KLabel, { children: "\u06A9\u0634\u0648\u0631" }), _jsx(KSelectboxWithSearch, { id: 'countryId', options: countries, register: register('countryId', { required: true }), errors: errors.countryId, onChange: handleItemAndCountryChange, defaultValue: selectedCountryLabel }), errors.countryId && (_jsx("p", { className: "text-xs text-red-500", children: "\u0627\u0646\u062A\u062E\u0627\u0628 \u06A9\u0634\u0648\u0631 \u0627\u0644\u0632\u0627\u0645\u06CC \u0645\u06CC \u0628\u0627\u0634\u062F." }))] }), selectedCountry === 1 && (_jsxs("div", { className: 'w-full md:w-1/2', children: [_jsx(KLabel, { children: "\u0634\u0647\u0631" }), _jsx(KSelectboxWithSearch, { id: 'cityId', options: cities, register: register('cityId', { required: true }), errors: errors.cityId, onChange: (value) => handleItemChange('cityId', value), defaultValue: selectedCity })] }))] }), !currentJob && (_jsxs("div", { className: 'flex justify-start w-full mt-4', children: [_jsxs("div", { className: 'w-full ml-2 md:w-1/2', children: [_jsx(KLabel, { children: "\u0645\u0627\u0647 \u067E\u0627\u06CC\u0627\u0646" }), _jsx(KSelect, { ...register('toMonth', {
                                                            setValueAs: value => value === "" ? undefined : Number(value)
                                                        }), children: hijriMonthOptions.map(option => (_jsx("option", { value: option.value, children: option.label }, option.value))) })] }), _jsxs("div", { className: 'w-full md:w-1/2', children: [_jsx(KLabel, { children: "\u0633\u0627\u0644 \u067E\u0627\u06CC\u0627\u0646" }), _jsx(KTextInput, { numeric: true, maxLength: 4, ...register('toYear', {
                                                            required: true,
                                                            setValueAs: value => value === "" ? undefined : Number(value)
                                                        }) })] })] }))] }), _jsxs("div", { className: 'w-full pr-4 mt-4 md:w-1/2', children: [_jsxs("div", { className: 'inline-block w-full', children: [_jsx(KLabel, { children: "\u0646\u0627\u0645 \u0633\u0627\u0632\u0645\u0627\u0646" }), _jsx(KTextInput, { ...register('companyName', { required: true }) }), errors.companyName && (_jsx("p", { className: "text-xs text-red-500", children: "\u0646\u0627\u0645 \u0633\u0627\u0632\u0645\u0627\u0646 \u0627\u0644\u0632\u0627\u0645\u06CC \u0645\u06CC \u0628\u0627\u0634\u062F." }))] }), _jsx("div", { className: 'mt-4', children: _jsxs("div", { className: 'inline-block w-full', children: [_jsx(KLabel, { children: "\u0632\u0645\u06CC\u0646\u0647 \u06A9\u0627\u0631\u06CC \u0634\u0645\u0627" }), _jsx(KSelectboxWithSearch, { id: 'jobcategoryId', options: jobCategories, register: register('jobcategoryId', { required: true }), errors: errors.jobcategoryId, onChange: (value) => handleItemChange('jobcategoryId', value), defaultValue: selectedJobCategoryId }), errors.jobcategoryId && (_jsx("p", { className: "text-xs text-red-500", children: "\u0632\u0645\u06CC\u0646\u0647 \u06A9\u0627\u0631\u06CC \u0627\u0644\u0632\u0627\u0645\u06CC \u0645\u06CC \u0628\u0627\u0634\u062F." }))] }) }), _jsxs("div", { className: 'flex mt-4', children: [_jsxs("div", { className: 'w-full ml-2 md:w-1/2', children: [_jsx(KLabel, { children: "\u0645\u0627\u0647 \u0634\u0631\u0648\u0639" }), _jsx(KSelect, { ...register('fromMonth', {
                                                            required: true,
                                                            setValueAs: value => value === "" ? undefined : Number(value)
                                                        }), children: hijriMonthOptions.map(option => (_jsx("option", { value: option.value, children: option.label }, option.value))) }), errors.fromMonth && (_jsx("p", { className: "text-xs text-red-500", children: "\u0645\u0627\u0647 \u0634\u0631\u0648\u0639 \u0627\u0644\u0632\u0627\u0645\u06CC \u0645\u06CC \u0628\u0627\u0634\u062F." }))] }), _jsxs("div", { className: 'w-full md:w-1/2', children: [_jsx(KLabel, { children: "\u0633\u0627\u0644 \u0634\u0631\u0648\u0639" }), _jsx(KTextInput, { numeric: true, maxLength: 4, ...register('fromYear', {
                                                            required: true,
                                                            setValueAs: value => value === "" ? undefined : Number(value)
                                                        }) }), errors.fromYear && (_jsx("p", { className: "text-xs text-red-500", children: "\u0633\u0627\u0644 \u0634\u0631\u0648\u0639 \u0627\u0644\u0632\u0627\u0645\u06CC \u0645\u06CC \u0628\u0627\u0634\u062F." }))] })] })] })] }), _jsx("div", { className: 'p-5', children: _jsx(KCheckbox, { content: 'هنوز در این شرکت مشغول به کار هستم .', onChange: handleCurrentJobChange, checked: currentJob }) })] }), _jsxs("div", { className: 'flex justify-end p-2', children: [_jsx(KButton, { color: 'secondary', className: 'ml-4', onClick: () => setIsRecordVisible(false), children: "\u0627\u0646\u0635\u0631\u0627\u0641" }), (isPending || UpdateIsPending) ? _jsx(KSpinner, { color: 'primary' }) :
                        _jsx(KButton, { color: 'primary', type: "button", onClick: handleFormSubmit, children: "\u0630\u062E\u06CC\u0631\u0647" })] })] }));
};
export default CareerRecord;
