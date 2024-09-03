import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState, } from 'react';
import { useForm, } from 'react-hook-form';
import { toast } from 'react-toastify';
import useApi from '../../../../hooks/useApi';
import { hijriMonthOptions, seniorityLevelLabels, SeniorityLevels, } from '../../../../models/enums';
import KButton from '../../../shared/Button';
import KLabel from '../../../shared/Label';
import KModal from '../../../shared/Modal/Modal';
import KSelect from '../../../shared/Select';
import KSelectboxWithSearch from '../../../shared/SelectboxWithSearch';
import KSpinner from '../../../shared/Spinner';
import KTextInput from '../../../shared/TextInput';
const CareerBackgroundModal = (props) => {
    const { show, onClose, fetch, editMode, record } = props;
    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm();
    const { sendRequest: saveCareerData, isPending } = useApi();
    const { sendRequest: countrySendRequest } = useApi();
    const { sendRequest: citySendRequest } = useApi();
    const { sendRequest: jobCategoriesSendRequest } = useApi();
    const [countries, setCountries] = useState([]);
    const [cities, setCities] = useState([]);
    const [jobCategories, setJobCategories] = useState([]);
    const [selectedCity, setSelectedCity] = useState(null);
    const [selectedCountryLabel, setSelectedCountryLabel] = useState(null);
    const [selectedJobCategroyId, setSelectedJobCategroyId] = useState(null);
    useEffect(() => {
        if (show) {
            reset();
        }
    }, [show, reset]);
    useEffect(() => {
        fetchCities();
        fetchCountries();
        fetchJobCategories();
    }, []);
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
                    setSelectedJobCategroyId({ value: record.jobCategory.id, label: record.jobCategory.title });
                }
                else {
                    setValue(key, record[key]);
                }
            });
        }
    }, [record, setValue, reset]);
    const fetchCountries = async () => {
        countrySendRequest({ url: "/Countries" }, (response) => {
            if (response) {
                const countryOptions = response.map((country) => ({
                    value: country.id,
                    label: country.title,
                }));
                setCountries(countryOptions);
            }
        });
    };
    const fetchCities = async () => {
        citySendRequest({ url: "/Cities" }, (response) => {
            if (response) {
                const cityOptions = response.map((city) => ({
                    value: city.id,
                    label: city.title,
                }));
                setCities(cityOptions);
            }
        });
    };
    const fetchJobCategories = async () => {
        jobCategoriesSendRequest({ url: "/JobCategories" }, (response) => {
            if (response) {
                const jobCategoriesOptions = response.map((jobCategories) => ({
                    value: jobCategories.id,
                    label: jobCategories.title,
                }));
                setJobCategories(jobCategoriesOptions);
            }
        });
    };
    const onSubmit = async (data) => {
        const url = editMode && record ? `/Resumes/UpdateCareerRecord/${record.id}` : '/Resumes/AddCareerRecord';
        const method = editMode && record ? "put" : "post";
        saveCareerData({
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
    const handleCountryChange = (event) => {
        const countryId = event;
        handleItemChange('countryId', countryId);
    };
    const handleItemAndCountryChange = (value) => {
        handleItemChange('countryId', value);
        handleCountryChange(value);
    };
    return (_jsxs(KModal, { show: show, onClose: onClose, containerClass: "!w-full !max-w-[90vw] !md:max-w-[70vw] !lg:max-w-[60vw] !pb-2", children: [_jsx(KModal.Header, { children: _jsx("h2", { children: editMode ? 'ویرایش سابقه شغلی' : 'افزودن سابقه شغلی جدید' }) }), _jsx(KModal.Body, { children: _jsx("form", { onSubmit: handleSubmit(onSubmit), children: _jsxs("div", { className: 'flex flex-wrap w-full', children: [_jsxs("div", { className: 'w-full p-4 mt-4 md:w-1/2', children: [_jsxs("div", { className: 'inline-block w-full', children: [_jsx(KLabel, { children: "\u0639\u0646\u0648\u0627\u0646 \u0634\u063A\u0644\u06CC" }), _jsx(KTextInput, { ...register('jobTitle', { required: true }) }), errors.jobTitle && (_jsx("p", { className: "text-xs text-red-500", children: "\u0639\u0646\u0648\u0627\u0646 \u0634\u063A\u0644\u06CC \u0627\u0644\u0632\u0627\u0645\u06CC \u0645\u06CC \u0628\u0627\u0634\u062F." }))] }), _jsx("div", { className: 'mt-4', children: _jsxs("div", { className: 'inline-block w-full', children: [_jsx(KLabel, { children: "\u0633\u0637\u062D \u0627\u0631\u0634\u062F\u06CC\u062A" }), _jsx(KSelect, { ...register('seniorityLevel', { required: true }), children: Object.values(SeniorityLevels).map((seniorityValue) => (_jsx("option", { value: seniorityValue, children: seniorityLevelLabels[seniorityValue] }, seniorityValue))) }), errors.seniorityLevel && (_jsx("p", { className: "text-xs text-red-500", children: "\u0633\u0637\u062D \u0627\u0631\u0634\u062F\u06CC\u062A \u0627\u0644\u0632\u0627\u0645\u06CC \u0645\u06CC \u0628\u0627\u0634\u062F." }))] }) }), _jsxs("div", { className: 'flex flex-wrap mt-4', children: [_jsxs("div", { className: 'w-full p-2 md:w-1/2', children: [_jsx(KLabel, { children: "\u06A9\u0634\u0648\u0631" }), _jsx(KSelectboxWithSearch, { id: 'countryId', options: countries, register: register('countryId', { required: true }), errors: errors.countryId, onChange: handleItemAndCountryChange, defaultValue: selectedCountryLabel }), errors.countryId && (_jsx("p", { className: "text-xs text-red-500", children: "\u0627\u0646\u062A\u062E\u0627\u0628 \u06A9\u0634\u0648\u0631 \u0627\u0644\u0632\u0627\u0645\u06CC \u0645\u06CC \u0628\u0627\u0634\u062F." }))] }), _jsxs("div", { className: 'w-full p-2 md:w-1/2', children: [_jsx(KLabel, { children: "\u0634\u0647\u0631" }), _jsx(KSelectboxWithSearch, { id: 'cityId', options: cities, register: register('cityId', { required: true }), errors: errors.cityId, onChange: (value) => handleItemChange('cityId', value), defaultValue: selectedCity }), errors.cityId && (_jsx("p", { className: "text-xs text-red-500", children: "\u0627\u0646\u062A\u062E\u0627\u0628 \u0634\u0647\u0631 \u0627\u0644\u0632\u0627\u0645\u06CC \u0645\u06CC \u0628\u0627\u0634\u062F." }))] })] }), _jsxs("div", { className: 'flex flex-wrap justify-between mt-4', children: [_jsxs("div", { className: 'w-full p-2 md:w-1/2', children: [_jsx(KLabel, { children: "\u0645\u0627\u0647 \u067E\u0627\u06CC\u0627\u0646" }), _jsx(KSelect, { ...register('toMonth'), children: hijriMonthOptions.map(option => (_jsx("option", { value: option.value, children: option.label }, option.value))) })] }), _jsxs("div", { className: 'w-full p-2 md:w-1/2', children: [_jsx(KLabel, { children: "\u0633\u0627\u0644 \u067E\u0627\u06CC\u0627\u0646" }), _jsx(KTextInput, { numeric: true, maxLength: 4, ...register('toYear') })] })] })] }), _jsxs("div", { className: 'w-full p-4 mt-4 md:w-1/2', children: [_jsxs("div", { className: 'inline-block w-full', children: [_jsx(KLabel, { children: "\u0646\u0627\u0645 \u0633\u0627\u0632\u0645\u0627\u0646" }), _jsx(KTextInput, { ...register('companyName', { required: true }) }), errors.companyName && (_jsx("p", { className: "text-xs text-red-500", children: "\u0646\u0627\u0645 \u0633\u0627\u0632\u0645\u0627\u0646 \u0627\u0644\u0632\u0627\u0645\u06CC \u0645\u06CC \u0628\u0627\u0634\u062F." }))] }), _jsx("div", { className: 'mt-4', children: _jsxs("div", { className: 'inline-block w-full', children: [_jsx(KLabel, { children: "\u0632\u0645\u06CC\u0646\u0647 \u06A9\u0627\u0631\u06CC \u0634\u0645\u0627" }), _jsx(KSelectboxWithSearch, { id: 'jobcategoryId', options: jobCategories, register: register('jobcategoryId', { required: true }), errors: errors.jobcategoryId, onChange: (value) => handleItemChange('jobcategoryId', value), defaultValue: selectedJobCategroyId }), errors.jobcategoryId && (_jsx("p", { className: "text-xs text-red-500", children: "\u0632\u0645\u06CC\u0646\u0647 \u06A9\u0627\u0631\u06CC \u0627\u0644\u0632\u0627\u0645\u06CC \u0645\u06CC \u0628\u0627\u0634\u062F." }))] }) }), _jsxs("div", { className: 'flex flex-wrap mt-4', children: [_jsxs("div", { className: 'w-full p-2 md:w-1/2', children: [_jsx(KLabel, { children: "\u0645\u0627\u0647 \u0634\u0631\u0648\u0639" }), _jsx(KSelect, { ...register('fromMonth', { required: true }), children: hijriMonthOptions.map(option => (_jsx("option", { value: option.value, children: option.label }, option.value))) }), errors.fromMonth && (_jsx("p", { className: "text-xs text-red-500", children: "\u0645\u0627\u0647 \u0634\u0631\u0648\u0639 \u0627\u0644\u0632\u0627\u0645\u06CC \u0645\u06CC \u0628\u0627\u0634\u062F." }))] }), _jsxs("div", { className: 'w-full p-2 md:w-1/2', children: [_jsx(KLabel, { children: "\u0633\u0627\u0644 \u0634\u0631\u0648\u0639" }), _jsx(KTextInput, { numeric: true, maxLength: 4, ...register('fromYear', { required: true }) }), errors.fromYear && (_jsx("p", { className: "text-xs text-red-500", children: "\u0633\u0627\u0644 \u0634\u0631\u0648\u0639 \u0627\u0644\u0632\u0627\u0645\u06CC \u0645\u06CC \u0628\u0627\u0634\u062F." }))] })] })] })] }) }) }), _jsx("div", { className: "flex justify-end px-5 mt-4 mb-4", children: isPending ? (_jsx(KSpinner, {})) : (_jsx(KButton, { color: 'primary', type: "button", onClick: handleFormSubmit, children: editMode ? 'ذخیره تغییرات' : 'ذخیره' })) })] }));
};
export default CareerBackgroundModal;
