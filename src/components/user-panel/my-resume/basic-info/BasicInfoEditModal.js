import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from 'react';
import { useForm, } from 'react-hook-form';
import { toast } from 'react-toastify';
import useApi from '../../../../hooks/useApi';
import { militaryServiceStatusMapping } from '../../../../models/enums';
import KButton from '../../../shared/Button';
import KDatepicker from '../../../shared/DatePicker';
import KModal from '../../../shared/Modal/Modal';
import KSelect from '../../../shared/Select';
import KSpinner from '../../../shared/Spinner';
import KTextInput from '../../../shared/TextInput';
const BasicInfoEditModal = ({ show, onClose, fetch }) => {
    const { register, handleSubmit, formState: { errors }, control, reset } = useForm();
    const { sendRequest, isPending } = useApi();
    const { sendRequest: getData } = useApi();
    useEffect(() => {
        getData({ url: "/Resumes/BasicInfo" }, (response) => {
            reset(response);
        }, (error) => {
            toast.error(error?.message);
        });
    }, [getData, reset]);
    const onSubmit = (data) => {
        const formData = data;
        sendRequest({
            url: '/Resumes/BasicInfo',
            method: 'put',
            data: formData,
        }, (response) => {
            toast.success(response.message);
            fetch();
            onClose();
        }, (error) => {
            toast.error(error?.message);
        });
    };
    const handleFormSubmit = () => {
        handleSubmit(onSubmit)();
    };
    return (_jsxs(KModal, { show: show, onClose: onClose, containerClass: "w-full max-w-[60vw] md:max-w-[80vw] lg:max-w-[60vw] !pb-2", children: [_jsx(KModal.Header, { children: _jsx("h2", { children: "\u0648\u06CC\u0631\u0627\u06CC\u0634 \u0627\u0637\u0644\u0627\u0639\u0627\u062A \u0627\u0648\u0644\u06CC\u0647" }) }), _jsx(KModal.Body, { children: _jsxs("form", { onSubmit: handleSubmit(onSubmit), className: 'm-2', children: [_jsxs("div", { className: 'flex flex-wrap justify-between', children: [_jsxs("div", { className: "w-full px-2 md:w-1/2", children: [_jsx(KTextInput, { ...register('firstName', { required: true }), placeholder: '\u0646\u0627\u0645' }), errors.firstName && _jsx("span", { className: "text-sm text-red-500", children: "\u0646\u0627\u0645 \u0627\u0644\u0632\u0627\u0645\u06CC \u0627\u0633\u062A" })] }), _jsxs("div", { className: "w-full px-2 md:w-1/2", children: [_jsx(KTextInput, { ...register('lastName', { required: true }), placeholder: '\u0646\u0627\u0645 \u062E\u0627\u0646\u0648\u0627\u062F\u06AF\u06CC' }), errors.lastName && _jsx("span", { className: "text-sm text-red-500", children: "\u0646\u0627\u0645 \u062E\u0627\u0646\u0648\u0627\u062F\u06AF\u06CC \u0627\u0644\u0632\u0627\u0645\u06CC \u0627\u0633\u062A" })] }), _jsxs("div", { className: "w-full px-2 mt-4 md:w-1/2", children: [_jsxs(KSelect, { id: 'gender', placeholder: "\u062C\u0646\u0633\u06CC\u062A", ...register('gender', { required: true }), children: [_jsx("option", { value: "Male", children: "\u0645\u0631\u062F" }), _jsx("option", { value: "Female", children: "\u0632\u0646" })] }), errors.gender && _jsx("span", { className: "text-sm text-red-500", children: "\u062C\u0646\u0633\u06CC\u062A \u0627\u0644\u0632\u0627\u0645\u06CC \u0627\u0633\u062A" })] }), _jsxs("div", { className: "w-full px-2 mt-4 md:w-1/2", children: [_jsxs(KSelect, { id: 'maritalStatus', placeholder: "\u0648\u0636\u0639\u06CC\u062A \u062A\u0627\u0647\u0644", ...register('maritalStatus', { required: true }), children: [_jsx("option", { value: "married", children: "\u0645\u062A\u0627\u0647\u0644" }), _jsx("option", { value: "Single", children: "\u0645\u062C\u0631\u062F" })] }), errors.maritalStatus && _jsx("span", { className: "text-sm text-red-500", children: "\u0648\u0636\u0639\u06CC\u062A \u062A\u0627\u0647\u0644 \u0627\u0644\u0632\u0627\u0645\u06CC \u0627\u0633\u062A" })] }), _jsxs("div", { className: "w-full px-2 mt-4 md:w-1/2", children: [_jsx(KSelect, { id: 'militaryServiceStatus', placeholder: "\u0648\u0636\u0639\u06CC\u062A \u0646\u0638\u0627\u0645 \u0648\u0638\u06CC\u0641\u0647", ...register('militaryServiceStatus', { required: true }), children: Object.entries(militaryServiceStatusMapping).map(([key, value]) => (_jsx("option", { value: value.value, children: value.label }, key))) }), errors.militaryServiceStatus && _jsx("span", { className: "text-sm text-red-500", children: "\u0648\u0636\u0639\u06CC\u062A \u0646\u0638\u0627\u0645 \u0648\u0638\u06CC\u0641\u0647 \u0627\u0644\u0632\u0627\u0645\u06CC \u0627\u0633\u062A" })] }), _jsxs("div", { className: "w-full px-2 mt-4 md:w-1/2", children: [_jsx(KTextInput, { ...register('city', { required: true }), placeholder: '\u0634\u0647\u0631 \u0645\u062D\u0644 \u0633\u06A9\u0648\u0646\u062A' }), errors.city && _jsx("span", { className: "text-sm text-red-500", children: "\u0634\u0647\u0631 \u0645\u062D\u0644 \u0633\u06A9\u0648\u0646\u062A \u0627\u0644\u0632\u0627\u0645\u06CC \u0627\u0633\u062A" })] }), _jsxs("div", { className: "w-full px-2 mt-4 md:w-1/2", children: [_jsx(KTextInput, { ...register('telephone', { required: true }), placeholder: '\u0634\u0645\u0627\u0631\u0647 \u062A\u0644\u0641\u0646 \u062B\u0627\u0628\u062A', maxLength: 11 }), errors.telephone && _jsx("span", { className: "text-sm text-red-500", children: "\u0634\u0645\u0627\u0631\u0647 \u062A\u0644\u0641\u0646 \u062B\u0627\u0628\u062A \u0627\u0644\u0632\u0627\u0645\u06CC \u0627\u0633\u062A" })] }), _jsxs("div", { className: "w-full px-2 mt-4 md:w-1/2", children: [_jsx(KDatepicker, { name: "birthDate", control: control, required: true, id: "birthDate", placeholder: '\u062A\u0627\u0631\u06CC\u062E \u062A\u0648\u0644\u062F' }), errors.birthDate && (_jsx("p", { className: "text-sm text-red-500", children: "\u062A\u0627\u0631\u06CC\u062E \u062A\u0648\u0644\u062F \u0627\u0644\u0632\u0627\u0645\u06CC \u0645\u06CC \u0628\u0627\u0634\u062F." }))] })] }), _jsx("div", { className: 'flex justify-end p-2', children: isPending ? _jsx(KSpinner, { color: 'primary' }) :
                                _jsx(KButton, { color: 'primary', type: "button", onClick: handleFormSubmit, children: "\u0630\u062E\u06CC\u0631\u0647" }) })] }) })] }));
};
export default BasicInfoEditModal;
