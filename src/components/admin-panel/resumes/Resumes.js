import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState, } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import useApi from '../../../hooks/useApi';
import { CareerExperienceLength, careerExperienceLengthLabels, DegreeLevel, DegreeLevelDescriptions, militaryServiceStatusMapping, } from '../../../models/enums';
import KButton from '../../shared/Button';
import KCard from '../../shared/Card';
import KDatepicker from '../../shared/DatePicker';
import KLabel from '../../shared/Label';
import KSelect from '../../shared/Select';
import KSelectboxWithSearch from '../../shared/SelectboxWithSearch';
import SelectboxWithSearchAndAllowAdd from '../../shared/SelectboxWithSearchAndAllowAdd';
import KSpinner from '../../shared/Spinner';
import FoundedResumes from './FoundedResumes';
const Resumes = () => {
    const [jobCategories, setJobCategories] = useState([]);
    const [cities, setCities] = useState([]);
    const [languages, setLanguages] = useState([]);
    const [skills, setSkills] = useState([]);
    const [resumes, setResumes] = useState([]);
    const [displayResumes, setDisplayResumes] = useState(false);
    const { sendRequest, isPending } = useApi();
    const { register, handleSubmit, formState: { errors }, setValue, getValues, control } = useForm();
    const { sendRequest: jobCategoriesSendRequest } = useApi();
    const { sendRequest: citySendRequest } = useApi();
    const { sendRequest: fetch } = useApi();
    const navigate = useNavigate();
    const fetchLanguages = async () => {
        fetch({
            url: "/Languages",
            params: {
                pageSize: 10000,
                pageIndex: 1,
            },
        }, (response) => {
            if (response) {
                const languagesOptions = response.map((language) => ({
                    value: language.id,
                    label: language.title,
                }));
                setLanguages(languagesOptions);
            }
        });
    };
    const fetchSkills = async () => {
        fetch({
            url: '/SoftwareSkills',
            params: {
                pageSize: 10000,
                pageIndex: 1,
            },
        }, (response) => {
            if (response) {
                const softwareSkillsOptions = response.map((skill) => ({
                    value: skill.id,
                    label: skill.title,
                }));
                setSkills(softwareSkillsOptions);
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
        fetchSkills();
        fetchCities();
        fetchLanguages();
        fetchJobCategories();
    }, []);
    const handleItemChange = (item, value) => {
        setValue(item, value);
    };
    const onSubmit = () => {
        const values = getValues();
        const data = {};
        Object.keys(values).forEach((key) => {
            const value = values[key];
            if (value !== undefined && value !== null && value !== "" && (!Array.isArray(value) || value.length > 0)) {
                data[key] = Array.isArray(value) ? value.filter(v => v !== "") : value;
            }
        });
        sendRequest({
            url: '/Resumes/Query',
            method: 'put',
            params: {
                pagesize: 10,
                pageIndex: 0,
            },
            data: Object.keys(data).length > 0 ? data : {},
        }, (response) => {
            setResumes(response || []);
            setDisplayResumes(true);
        });
    };
    const handleFormSubmit = () => {
        handleSubmit(onSubmit)();
    };
    const handleCardClick = (resume) => {
        console.log('Clicked resume:', resume);
        navigate('/my-resume');
    };
    return (_jsxs(_Fragment, { children: [_jsxs(KCard, { className: 'p-5', children: [_jsx("h1", { className: 'text-2xl font-extrabold text-center', children: "\u062C\u0633\u062A\u062C\u0648 \u0628\u0627\u0646\u06A9 \u0631\u0632\u0648\u0645\u0647" }), _jsxs("form", { onSubmit: handleSubmit(onSubmit), className: 'flex flex-col', children: [_jsxs("div", { className: 'flex flex-col justify-between md:flex-row', children: [_jsxs("div", { className: "w-full p-2 md:w-1/2", children: [_jsx(KLabel, { children: "\u0632\u0645\u06CC\u0646\u0647 \u06A9\u0627\u0631\u06CC \u06A9\u0627\u0631\u062C\u0648" }), _jsx(KSelectboxWithSearch, { id: 'jobCategoryId', options: jobCategories, register: register('jobCategoryId'), errors: errors.jobCategoryId, onChange: (value) => handleItemChange('jobCategoryId', value) })] }), _jsxs("div", { className: "w-full p-2 md:w-1/2", children: [_jsx(KLabel, { children: "\u0633\u0627\u0628\u0642\u0647 \u06A9\u0627\u0631\u06CC \u062F\u0631 \u0632\u0645\u06CC\u0646\u0647 \u0634\u063A\u0644\u06CC \u0645\u0648\u0631\u062F \u0646\u0638\u0631" }), _jsx(KSelect, { defaultValue: '', id: 'careerExperienceLength', ...register('careerExperienceLength'), children: Object.values(CareerExperienceLength).map((degree) => (_jsx("option", { value: degree, children: careerExperienceLengthLabels[degree] }, degree))) })] })] }), _jsxs("div", { className: 'flex flex-col justify-between md:flex-row', children: [_jsxs("div", { className: "w-full p-2 md:w-1/2", children: [_jsx(KLabel, { children: "\u0634\u0647\u0631 \u0645\u062D\u0644 \u0633\u06A9\u0648\u0646\u062A" }), _jsx(KSelectboxWithSearch, { id: 'cityId', options: cities, register: register('cityId'), errors: errors.cityId, onChange: (value) => handleItemChange('cityId', value) })] }), _jsxs("div", { className: "w-full p-2 md:w-1/2", children: [_jsx(KLabel, { children: "\u0633\u0646 \u06A9\u0627\u0631\u062C\u0648" }), _jsxs("div", { className: "flex", children: [_jsx("div", { className: "w-full", children: _jsx(KDatepicker, { name: "birthDateLessThan", placeholder: '\u06A9\u0645\u062A\u0631 \u0627\u0632', control: control }) }), _jsx("div", { className: "w-full mr-2", children: _jsx(KDatepicker, { name: "birthDateMoreThan", placeholder: '\u0628\u06CC\u0634\u062A\u0631 \u0627\u0632', control: control }) })] })] })] }), _jsxs("div", { className: 'flex flex-col justify-between md:flex-row', children: [_jsxs("div", { className: "w-full p-2 md:w-1/2", children: [_jsx(KLabel, { children: "\u0645\u062F\u0631\u06A9 \u062A\u062D\u0635\u06CC\u0644\u06CC \u06A9\u0627\u0631\u062C\u0648" }), _jsx(KSelect, { defaultValue: '', id: 'degreeLevel', placeholder: "\u0627\u0646\u062A\u062E\u0627\u0628 \u06A9\u0646\u06CC\u062F", ...register('degreeLevel'), children: Object.values(DegreeLevel).map((degree) => (_jsx("option", { value: degree, children: DegreeLevelDescriptions[degree] }, degree))) })] }), _jsxs("div", { className: "w-full p-2 md:w-1/2", children: [_jsx(KLabel, { children: "\u0632\u0628\u0627\u0646 \u0647\u0627" }), _jsx(KSelect, { ...register('languageId'), children: languages.map((language) => (_jsx("option", { value: language.value, children: language.label }, language.value))) })] })] }), _jsxs("div", { className: 'flex flex-col justify-between md:flex-row', children: [_jsxs("div", { className: "w-full p-2 md:w-1/2", children: [_jsx(KLabel, { children: "\u0645\u0647\u0627\u0631\u062A \u0647\u0627\u06CC \u0646\u0631\u0645 \u0627\u0641\u0632\u0627\u0631\u06CC \u06A9\u0627\u0631\u062C\u0648" }), _jsx(SelectboxWithSearchAndAllowAdd, { id: 'softwareSkillIds', options: skills, register: register('softwareSkillIds'), errors: errors.softwareSkillIds, onChange: (selectedItems) => handleItemChange('softwareSkillIds', selectedItems.map(item => item.value)) })] }), _jsxs("div", { className: "w-full p-2 md:w-1/2", children: [_jsx(KLabel, { children: "\u0648\u0636\u0639\u06CC\u062A \u0646\u0638\u0627\u0645 \u0648\u0638\u06CC\u0641\u0647" }), _jsxs(KSelect, { id: 'militaryServiceStatus', ...register('militaryServiceStatus'), children: [_jsx("option", { value: "", children: "\u0627\u0646\u062A\u062E\u0627\u0628 \u06A9\u0646\u06CC\u062F" }), Object.entries(militaryServiceStatusMapping).map(([key, value]) => (_jsx("option", { value: value.value, children: value.label }, key)))] })] })] }), _jsx("div", { className: 'flex justify-end p-2', children: isPending ? _jsx(KSpinner, { color: 'primary' }) :
                                    _jsx(KButton, { color: 'primary', type: 'button', onClick: handleFormSubmit, children: "\u062C\u0633\u062A\u062C\u0648" }) })] })] }), displayResumes && _jsx("div", { className: 'mt-10', children: _jsx(FoundedResumes, { resumes: resumes, onCardClick: handleCardClick }) })] }));
};
export default Resumes;
