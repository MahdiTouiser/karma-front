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
import WorkExperienceRecordCards from './WorkExperienceRecordCards';
const WorkExperience = (props) => {
    const { goToPreviousStep, onSubmitSuccess } = props;
    const [hasWorkExperience, setHasWorkExperience] = useState(false);
    const [currentJob, setCurrentJob] = useState(false);
    const [isRecordCreated, setIsRecordCreated] = useState(false);
    const [countries, setCountries] = useState([]);
    const [cities, setCities] = useState([]);
    const [jobCategories, setJobCategories] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState(1);
    const [careerRecords, setCareerRecords] = useState([]);
    const [isRecordVisible, setIsRecordVisible] = useState(false);
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    const { sendRequest: countrySendRequest } = useApi();
    const { sendRequest: citySendRequest } = useApi();
    const { sendRequest: jobCategoriesSendRequest } = useApi();
    const { sendRequest: AddWorkExperience, isPending } = useApi();
    const { sendRequest: fetch, isPending: fetchIsPending } = useApi();
    const fetchCountries = async () => {
        countrySendRequest({
            url: "/Countries",
        }, (response) => {
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
        citySendRequest({
            url: "/Cities",
        }, (response) => {
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
        jobCategoriesSendRequest({
            url: "/JobCategories",
        }, (response) => {
            if (response) {
                const jobCategoriesOptions = response.map((jobCategories) => ({
                    value: jobCategories.id,
                    label: jobCategories.title,
                }));
                setJobCategories(jobCategoriesOptions);
            }
        });
    };
    useEffect(() => {
        fetchCities();
        fetchCountries();
        fetchJobCategories();
        fetchCareerRecords();
    }, []);
    const fetchCareerRecords = () => {
        fetch({
            url: "/Resumes/CareerRecords",
        }, (response) => {
            if (response.length === 0) {
                setIsRecordCreated(false);
            }
            else {
                setCareerRecords(response);
                setIsRecordCreated(true);
            }
        });
    };
    const handleCountryChange = (event) => {
        const countryId = event;
        setSelectedCountry(countryId);
    };
    const handleWorkExperienceChange = (checked) => {
        setHasWorkExperience(checked);
    };
    const handleCurrentJobChange = (checked) => {
        setCurrentJob(checked);
    };
    const onSubmit = (data) => {
        if (currentJob) {
            delete data.toYear;
            delete data.toMonth;
        }
        AddWorkExperience({
            url: '/Resumes/AddCareerRecord',
            method: 'post',
            data: {
                ...data,
                currentJob: currentJob,
            },
        }, (response) => {
            toast.success(response?.message);
            setIsRecordCreated(true);
            fetchCareerRecords();
        }, (error) => {
            toast.error(error?.message);
        });
    };
    const handleFormSubmit = () => {
        handleSubmit(onSubmit)();
    };
    const handleButtonClick = () => {
        (hasWorkExperience || isRecordCreated) ? onSubmitSuccess() : handleFormSubmit();
    };
    const handleItemChange = (item, value) => {
        setValue(item, value);
    };
    const handleItemAndCountryChange = (value) => {
        handleItemChange('countryId', value);
        handleCountryChange(value);
    };
    return (_jsxs(_Fragment, { children: [_jsx("h1", { className: "text-2xl font-bold", children: "\u0633\u0648\u0627\u0628\u0642 \u0634\u063A\u0644\u06CC" }), fetchIsPending ? (_jsx("span", { className: 'flex items-center justify-center h-screen', children: _jsx(KSpinner, { color: 'primary', size: 20 }) })) : isRecordCreated ? (_jsx(WorkExperienceRecordCards, { records: careerRecords, refresh: fetchCareerRecords, setIsRecordVisible: setIsRecordVisible, isRecordVisible: isRecordVisible, countries: countries, cities: cities, jobCategories: jobCategories })) : (_jsxs(_Fragment, { children: [_jsx("div", { className: 'flex justify-start mt-10 border-b-2', children: _jsx("div", { className: 'p-5', children: _jsx(KCheckbox, { content: 'سابقه شغلی ندارم .', onChange: handleWorkExperienceChange, checked: hasWorkExperience }) }) }), _jsx("form", { onSubmit: handleSubmit(onSubmit), children: !hasWorkExperience && (_jsxs(_Fragment, { children: [_jsxs("div", { className: 'flex flex-col justify-center mt-10 md:flex-row', children: [_jsxs("div", { className: "w-full p-5 md:w-1/2", children: [_jsx(KLabel, { children: "\u0639\u0646\u0648\u0627\u0646 \u0634\u063A\u0644\u06CC" }), _jsx(KTextInput, { ...register('jobTitle', { required: true }) }), errors.jobTitle && (_jsx("p", { className: "text-xs text-red-500", children: "\u0639\u0646\u0648\u0627\u0646 \u0634\u063A\u0644\u06CC \u0627\u0644\u0632\u0627\u0645\u06CC \u0645\u06CC \u0628\u0627\u0634\u062F." }))] }), _jsxs("div", { className: "w-full p-5 md:w-1/2", children: [_jsx(KLabel, { children: "\u0646\u0627\u0645 \u0633\u0627\u0632\u0645\u0627\u0646" }), _jsx(KTextInput, { ...register('companyName', { required: true }) }), errors.companyName && (_jsx("p", { className: "text-xs text-red-500", children: "\u0646\u0627\u0645 \u0633\u0627\u0632\u0645\u0627\u0646 \u0627\u0644\u0632\u0627\u0645\u06CC \u0645\u06CC \u0628\u0627\u0634\u062F." }))] })] }), _jsxs("div", { className: 'flex flex-col justify-center md:flex-row', children: [_jsxs("div", { className: "w-full p-5 md:w-1/2", children: [_jsx(KLabel, { children: "\u0633\u0637\u062D \u0627\u0631\u0634\u062F\u06CC\u062A" }), _jsx(KSelect, { ...register('seniorityLevel', { required: true }), children: Object.values(SeniorityLevels).map((seniorityValue) => (_jsx("option", { value: seniorityValue, children: seniorityLevelLabels[seniorityValue] }, seniorityValue))) }), errors.seniorityLevel && (_jsx("p", { className: "text-xs text-red-500", children: "\u0633\u0637\u062D \u0627\u0631\u0634\u062F\u06CC\u062A \u0627\u0644\u0632\u0627\u0645\u06CC \u0645\u06CC \u0628\u0627\u0634\u062F." }))] }), _jsxs("div", { className: "w-full p-5 md:w-1/2", children: [_jsx(KLabel, { children: "\u0632\u0645\u06CC\u0646\u0647 \u06A9\u0627\u0631\u06CC \u0634\u0645\u0627" }), _jsx(KSelectboxWithSearch, { id: 'jobcategoryId', options: jobCategories, register: register('jobcategoryId', { required: true }), errors: errors.jobcategoryId, onChange: (value) => handleItemChange('jobcategoryId', value) }), errors.jobcategoryId && (_jsx("p", { className: "text-xs text-red-500", children: "\u0632\u0645\u06CC\u0646\u0647 \u06A9\u0627\u0631\u06CC \u0627\u0644\u0632\u0627\u0645\u06CC \u0645\u06CC \u0628\u0627\u0634\u062F." }))] })] }), _jsxs("div", { className: 'flex flex-col justify-start md:flex-row', children: [_jsxs("div", { className: "flex justify-start w-full md:w-1/2", children: [_jsxs("div", { className: 'w-full p-5 md:w-1/2', children: [_jsx(KLabel, { children: "\u06A9\u0634\u0648\u0631" }), _jsx(KSelectboxWithSearch, { id: 'countryId', options: countries, register: register('countryId', { required: true }), errors: errors.countryId, onChange: handleItemAndCountryChange }), errors.countryId && (_jsx("p", { className: "text-xs text-red-500", children: "\u0627\u0646\u062A\u062E\u0627\u0628 \u06A9\u0634\u0648\u0631 \u0627\u0644\u0632\u0627\u0645\u06CC \u0645\u06CC \u0628\u0627\u0634\u062F." }))] }), selectedCountry === 1 && (_jsxs("div", { className: 'w-full p-5 md:w-1/2', children: [_jsx(KLabel, { children: "\u0634\u0647\u0631" }), _jsx(KSelectboxWithSearch, { id: 'cityId', options: cities, register: register('cityId', { required: true }), errors: errors.cityId, onChange: (value) => handleItemChange('cityId', value) })] }))] }), _jsxs("div", { className: 'flex justify-center w-full md:w-1/2', children: [_jsxs("div", { className: 'w-full p-5 md:w-1/2', children: [_jsx(KLabel, { children: "\u0645\u0627\u0647 \u0634\u0631\u0648\u0639" }), _jsx(KSelect, { ...register('fromMonth', {
                                                                setValueAs: value => value === "" ? undefined : Number(value)
                                                            }), children: hijriMonthOptions.map(option => (_jsx("option", { value: option.value, children: option.label }, option.value))) }), errors.fromMonth && (_jsx("p", { className: "text-xs text-red-500", children: "\u0645\u0627\u0647 \u0634\u0631\u0648\u0639 \u0627\u0644\u0632\u0627\u0645\u06CC \u0645\u06CC \u0628\u0627\u0634\u062F." }))] }), _jsxs("div", { className: 'w-full p-5 md:w-1/2', children: [_jsx(KLabel, { children: "\u0633\u0627\u0644 \u0634\u0631\u0648\u0639" }), _jsx(KTextInput, { numeric: true, maxLength: 4, ...register('fromYear', {
                                                                required: true,
                                                                setValueAs: value => value === "" ? undefined : Number(value)
                                                            }) }), errors.fromYear && (_jsx("p", { className: "text-xs text-red-500", children: "\u0633\u0627\u0644 \u0634\u0631\u0648\u0639 \u0627\u0644\u0632\u0627\u0645\u06CC \u0645\u06CC \u0628\u0627\u0634\u062F." }))] })] })] }), _jsx("div", { className: 'flex flex-col justify-start md:flex-row', children: !currentJob && (_jsxs("div", { className: 'flex justify-center w-full md:w-1/2', children: [_jsxs("div", { className: 'w-full p-5 md:w-1/2', children: [_jsx(KLabel, { children: "\u0645\u0627\u0647 \u067E\u0627\u06CC\u0627\u0646" }), _jsx(KSelect, { ...register('toMonth', {
                                                            setValueAs: value => value === "" ? undefined : Number(value)
                                                        }), children: hijriMonthOptions.map(option => (_jsx("option", { value: option.value, children: option.label }, option.value))) })] }), _jsxs("div", { className: 'w-full p-5 md:w-1/2', children: [_jsx(KLabel, { children: "\u0633\u0627\u0644 \u067E\u0627\u06CC\u0627\u0646" }), _jsx(KTextInput, { numeric: true, maxLength: 4, ...register('toYear', {
                                                            required: true,
                                                            setValueAs: value => value === "" ? undefined : Number(value)
                                                        }) })] })] })) }), _jsx("div", { className: 'p-5', children: _jsx(KCheckbox, { content: 'هنوز در این شرکت مشغول به کار هستم .', onChange: handleCurrentJobChange, checked: currentJob }) })] })) })] })), !isRecordVisible && (_jsxs("div", { className: 'flex justify-end p-2', children: [_jsx(KButton, { color: 'secondary', className: 'ml-4', onClick: goToPreviousStep, children: "\u0645\u0631\u062D\u0644\u0647 \u0642\u0628\u0644\u06CC" }), isPending ? _jsx(KSpinner, { color: 'primary' }) :
                        _jsx(KButton, { color: 'primary', type: "button", onClick: handleButtonClick, children: "\u0630\u062E\u06CC\u0631\u0647 \u0648 \u0645\u0631\u062D\u0644\u0647 \u0628\u0639\u062F" })] }))] }));
};
export default WorkExperience;
