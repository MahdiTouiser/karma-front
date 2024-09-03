import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import useApi from '../../../../hooks/useApi';
import KButton from '../../../shared/Button';
import KLabel from '../../../shared/Label';
import KModal from '../../../shared/Modal/Modal';
import KSpinner from '../../../shared/Spinner';
import KTextInput from '../../../shared/TextInput';
const SamplesModal = ({ show, onClose, fetch }) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const { sendRequest, isPending } = useApi();
    const handleFormSubmit = () => {
        handleSubmit(onSubmit)();
    };
    const onSubmit = (data) => {
        sendRequest({
            url: '/Resumes/AddWorkSample',
            method: 'post',
            data: data,
        }, (response) => {
            toast.success(response.message);
            onClose();
            fetch();
            reset();
        }, (error) => {
            toast.error(error?.message);
        });
    };
    return (_jsxs(KModal, { show: show, onClose: onClose, children: [_jsx(KModal.Header, { children: _jsx("h2", { children: "\u0627\u0641\u0632\u0648\u062F\u0646 \u0646\u0645\u0648\u0646\u0647 \u06A9\u0627\u0631" }) }), _jsx(KModal.Body, { children: _jsxs("form", { onSubmit: handleSubmit(onSubmit), children: [_jsx("div", { className: "flex flex-wrap justify-start", children: _jsxs("div", { className: "w-full p-3 md:w-full", children: [_jsx(KLabel, { children: "\u0644\u06CC\u0646\u06A9" }), _jsx(KTextInput, { className: "ltr", type: "link", ...register('link', { required: true }) }), errors.link && _jsx("span", { className: "text-sm text-red-500", children: "\u0644\u06CC\u0646\u06A9 \u0627\u0644\u0632\u0627\u0645\u06CC \u0627\u0633\u062A" })] }) }), _jsx("div", { className: 'flex justify-end p-3', children: isPending ? _jsx(KSpinner, { color: 'primary' }) :
                                _jsx(KButton, { color: 'primary', type: "button", onClick: handleFormSubmit, children: "\u0630\u062E\u06CC\u0631\u0647" }) })] }) })] }));
};
export default SamplesModal;
