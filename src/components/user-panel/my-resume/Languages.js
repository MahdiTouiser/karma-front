import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState, } from 'react';
import { toast } from 'react-toastify';
import Add from '../../../assets/icons/Add';
import Delete from '../../../assets/icons/Delete';
import useApi from '../../../hooks/useApi';
import useConfirm from '../../../hooks/useConfirm';
import { skillLevelLabels, } from '../../../models/enums';
import KCard from '../../shared/Card';
import KSpinner from '../../shared/Spinner';
import LanguagesModal from '../cv-builder/sections/additional-skills/languages/LanguagesModal';
const Languages = () => {
    const { sendRequest: fetch, isPending } = useApi();
    const [languages, setLanguages] = useState([]);
    const { sendRequest: deleteRequest } = useApi();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
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
    return (_jsxs(_Fragment, { children: [_jsx(ConfirmModal, {}), _jsx(LanguagesModal, { show: isModalOpen, onClose: closeModal, onSuccess: fetchLanguages }), _jsxs(KCard, { className: 'flex flex-col justify-between w-full', children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("h1", { className: 'text-xl font-extrabold', children: "\u0632\u0628\u0627\u0646 \u0647\u0627" }), _jsxs("button", { className: "flex items-center text-sm text-blue-500", onClick: openModal, children: [_jsx(Add, {}), _jsx("span", { className: 'mr-1', children: "\u0627\u0641\u0632\u0648\u062F\u0646" })] })] }), isPending ? (_jsx("div", { className: 'flex justify-center', children: _jsx(KSpinner, { color: 'primary', size: 10 }) })) : (_jsx("div", { className: "grid grid-cols-1 gap-2 mt-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4", children: languages.map((info, index) => (_jsxs("div", { className: "flex items-center justify-between p-2 bg-gray-200 rounded", children: [_jsx("button", { onClick: () => handleDeleteItem(info.id), className: "mr-2", children: _jsx(Delete, {}) }), _jsxs("p", { className: 'flex-grow text-sm text-center text-black', children: [info.Language.title, " | ", skillLevelLabels[info.languageLevel]] })] }, index))) }))] })] }));
};
export default Languages;
