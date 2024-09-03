import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState, } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import useApi from '../../../../../../hooks/useApi';
import { skillLevelLabels, SkillLevels, } from '../../../../../../models/enums';
import KButton from '../../../../../shared/Button';
import KLabel from '../../../../../shared/Label';
import KModal from '../../../../../shared/Modal/Modal';
import KSelect from '../../../../../shared/Select';
import KSelectboxWithSearch from '../../../../../shared/SelectboxWithSearch';
const LanguagesModal = ({ show, onClose, onSuccess }) => {
    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm();
    const [languages, setLanguages] = useState([]);
    const { sendRequest: fetch } = useApi();
    const { sendRequest: AddLanguageData } = useApi();
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
    useEffect(() => {
        fetchLanguages();
    }, []);
    const handleFormSubmit = () => {
        handleSubmit(onSubmit)();
    };
    const onSubmit = async (data) => {
        data.languageId = +data.languageId;
        AddLanguageData({
            url: '/Resumes/AddLanguage',
            method: 'post',
            data: data,
        }, (response) => {
            toast.success(response?.message);
            onClose();
            onSuccess();
            reset();
        }, (error) => {
            toast.error(error?.message);
        });
    };
    const handleItemChange = (item, value) => {
        setValue(item, value);
    };
    return (_jsxs(KModal, { show: show, onClose: onClose, containerClass: "!w-full !md:max-w-full !pb-2", children: [_jsx(KModal.Header, { children: _jsx("h2", { children: " \u0627\u0641\u0632\u0648\u062F\u0646 \u0645\u0647\u0627\u0631\u062A \u0632\u0628\u0627\u0646 \u062C\u062F\u06CC\u062F " }) }), _jsx(KModal.Body, { children: _jsxs("form", { action: "submit", onSubmit: handleSubmit(onSubmit), children: [_jsxs("div", { className: 'm-5', children: [_jsx(KLabel, { children: "\u0632\u0628\u0627\u0646" }), _jsx(KSelectboxWithSearch, { id: 'languageId', options: languages, register: register('languageId'), errors: errors.languageId, onChange: (value) => handleItemChange('languageId', value) }), errors.languageId && _jsx("span", { className: "text-red-500 text-xs", children: "\u0627\u0646\u062A\u062E\u0627\u0628 \u0632\u0628\u0627\u0646 \u0627\u0644\u0632\u0627\u0645\u06CC \u0627\u0633\u062A ." })] }), _jsxs("div", { className: 'm-5', children: [_jsx(KLabel, { children: "\u0633\u0637\u062D \u0645\u0647\u0627\u0631\u062A" }), _jsx(KSelect, { ...register('level', { required: true }), children: Object.values(SkillLevels).map((skillValue) => (_jsx("option", { value: skillValue, children: skillLevelLabels[skillValue] }, skillValue))) }), errors.level && _jsx("span", { className: "text-red-500 text-xs", children: " \u0627\u0646\u062A\u062E\u0627\u0628 \u0633\u0637\u062D \u0645\u0647\u0627\u0631\u062A \u0627\u0644\u0632\u0627\u0645\u06CC \u0627\u0633\u062A ." })] })] }) }), _jsx("div", { className: 'flex justify-end mx-4', children: _jsx(KButton, { color: "primary", onClick: handleFormSubmit, children: "\u0630\u062E\u06CC\u0631\u0647" }) })] }));
};
export default LanguagesModal;
