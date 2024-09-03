import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import useApi from '../../../../../../hooks/useApi';
import KButton from '../../../../../shared/Button';
import KLabel from '../../../../../shared/Label';
import KModal from '../../../../../shared/Modal/Modal';
import KTextInput from '../../../../../shared/TextInput';
const AdditionalSkillsModal = ({ show, onClose, onSuccess }) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const { sendRequest: AddSkillsData } = useApi();
    const handleFormSubmit = () => {
        handleSubmit(onSubmit)();
    };
    const onSubmit = async (data) => {
        AddSkillsData({
            url: '/Resumes/AddAdditionalSkill',
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
    return (_jsxs(KModal, { show: show, onClose: onClose, containerClass: "!w-full !md:max-w-full !pb-2", children: [_jsx(KModal.Header, { children: _jsx("h2", { children: "\u0627\u0641\u0632\u0648\u062F\u0646 \u0645\u0647\u0627\u0631\u062A \u062A\u06A9\u0645\u06CC\u0644\u06CC \u062C\u062F\u06CC\u062F" }) }), _jsx(KModal.Body, { children: _jsx("form", { action: "submit", onSubmit: handleSubmit(onSubmit), children: _jsxs("div", { className: 'm-5', children: [_jsx(KLabel, { children: "\u0645\u0647\u0627\u0631\u062A \u0647\u0627" }), _jsx(KTextInput, { placeholder: '\u0645\u0647\u0627\u0631\u062A \u0647\u0627\u06CC \u062A\u06A9\u0645\u06CC\u0644\u06CC \u062E\u0648\u062F \u0631\u0627 \u0628\u0646\u0648\u06CC\u0633\u06CC\u062F', ...register('title', { required: true }) }), errors.title && (_jsx("p", { className: "text-red-500 text-xs", children: "\u0639\u0646\u0648\u0627\u0646 \u0634\u063A\u0644\u06CC \u0627\u0644\u0632\u0627\u0645\u06CC \u0645\u06CC \u0628\u0627\u0634\u062F." }))] }) }) }), _jsx("div", { className: 'flex justify-end mx-4', children: _jsx(KButton, { color: "primary", onClick: handleFormSubmit, children: "\u0630\u062E\u06CC\u0631\u0647" }) })] }));
};
export default AdditionalSkillsModal;
