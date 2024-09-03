import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState, } from 'react';
import { toast } from 'react-toastify';
import Add from '../../../../../../assets/icons/Add';
import Delete from '../../../../../../assets/icons/Delete';
import useApi from '../../../../../../hooks/useApi';
import useConfirm from '../../../../../../hooks/useConfirm';
import { skillLevelLabels, } from '../../../../../../models/enums';
import KCard from '../../../../../shared/Card';
import KCheckbox from '../../../../../shared/Checkbox';
import KSpinner from '../../../../../shared/Spinner';
import LanguagesModal from './LanguagesModal';
const Languages = () => {
    const [isChecked, setIsChecked] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [languages, setLanguages] = useState([]);
    const { sendRequest: fetch, isPending } = useApi();
    const { sendRequest: deleteRequest } = useApi();
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    const fetchLanguages = () => {
        fetch({
            url: '/Resumes/Languages',
        }, (response) => {
            setLanguages(response);
        });
    };
    useEffect(() => {
        fetchLanguages();
    }, []);
    const handleOnChange = (checked) => {
        setIsChecked(checked);
    };
    const [ConfirmModal, confirmation] = useConfirm("آیا از حذف این آیتم مطمئنید؟", "حذف مهارت زبان خارجی");
    const handleDeleteItem = async (id) => {
        const confirm = await confirmation();
        if (confirm) {
            deleteRequest({
                url: `/Resumes/RemoveLanguage/${id}`,
                method: 'delete'
            }, (response) => {
                toast.success(response?.message);
                fetchLanguages();
            }, (error) => {
                toast.error(error?.message);
            });
        }
    };
    return (_jsxs(_Fragment, { children: [_jsx(ConfirmModal, {}), _jsx(LanguagesModal, { show: isModalOpen, onClose: closeModal, onSuccess: fetchLanguages }), _jsxs(KCard, { children: [_jsx("h1", { className: "text-2xl font-extrabold", children: "\u0632\u0628\u0627\u0646 \u0647\u0627" }), isPending ? (_jsx("div", { className: 'flex justify-center', children: _jsx(KSpinner, { color: 'primary', size: 10 }) })) : (_jsx(_Fragment, { children: languages.length > 0 ? (_jsxs(_Fragment, { children: [_jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-5", children: [" ", languages.map((info, index) => (_jsxs("div", { className: "flex justify-between items-center p-2 bg-gray-200 rounded", children: [_jsx("button", { onClick: () => handleDeleteItem(info.id), className: "ml-4", children: _jsx(Delete, { strokeColor: 'red' }) }), _jsx("div", { className: "flex-grow", children: _jsxs("p", { className: 'text-black text-sm text-center', children: [info.Language.title, " | ", skillLevelLabels[info.languageLevel]] }) })] }, index)))] }), _jsx("div", { className: 'mt-4 text-center', children: _jsxs("button", { className: "text-sm text-blue-500 flex items-center justify-center mx-auto", onClick: openModal, children: [_jsx(Add, {}), "\u0627\u0641\u0632\u0648\u062F\u0646"] }) })] })) : (_jsx(_Fragment, { children: isChecked ? (_jsxs("div", { className: 'flex mt-4 justify-center', children: [_jsx("p", { className: 'text-sm', children: "\u0645\u0647\u0627\u0631\u062A \u0632\u0628\u0627\u0646 \u062E\u0627\u0631\u062C\u06CC \u0646\u062F\u0627\u0631\u0645." }), _jsx("button", { className: 'text-blue-500 text-sm mr-2', onClick: () => setIsChecked(!isChecked), children: "\u062A\u063A\u06CC\u06CC\u0631" })] })) : (_jsx(_Fragment, { children: _jsxs("div", { className: 'mt-6', children: [_jsx(KCheckbox, { content: 'مهارت زبان خارجی ندارم .', onChange: handleOnChange, checked: isChecked }), _jsx("div", { className: 'border-b-2 mt-4' }), _jsx("div", { className: 'mt-4 text-center', children: _jsxs("button", { className: "text-sm text-blue-500 flex items-center justify-center mx-auto", onClick: openModal, children: [_jsx(Add, {}), "\u0627\u0641\u0632\u0648\u062F\u0646"] }) })] }) })) })) }))] })] }));
};
export default Languages;
