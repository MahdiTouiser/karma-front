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
import SoftwareSkillsModal from '../cv-builder/sections/additional-skills/software-skills/SoftwareSkillsModal';
const SoftwareSkills = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [skills, setSkills] = useState([]);
    const closeModal = () => setIsModalOpen(false);
    const openModal = () => setIsModalOpen(true);
    const { sendRequest: fetch, isPending } = useApi();
    const { sendRequest: deleteRequest } = useApi();
    const fetchSkills = () => {
        fetch({
            url: "/Resumes/SoftwareSkills",
        }, (response) => {
            setSkills(response);
        });
    };
    useEffect(() => {
        fetchSkills();
    }, []);
    const [ConfirmModal, confirmation] = useConfirm("آیا از حذف این آیتم مطمئنید؟", "حذف مهارت نرم افزاری");
    const handleDeleteItem = async (id) => {
        const confirm = await confirmation();
        if (confirm) {
            deleteRequest({
                url: `/Resumes/RemoveSoftwareSkill/${id}`,
                method: 'delete'
            }, (response) => {
                toast.success(response?.message);
                fetchSkills();
            }, (error) => {
                toast.error(error?.message);
            });
        }
    };
    return (_jsxs(_Fragment, { children: [_jsx(ConfirmModal, {}), _jsx(SoftwareSkillsModal, { show: isModalOpen, onClose: closeModal, onSuccess: fetchSkills }), _jsxs(KCard, { className: 'flex flex-col justify-between w-full', children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("h1", { className: 'text-xl font-extrabold', children: "\u0645\u0647\u0627\u0631\u062A \u0647\u0627\u06CC \u0646\u0631\u0645 \u0627\u0641\u0632\u0627\u0631\u06CC" }), _jsxs("button", { className: "flex items-center text-sm text-blue-500", onClick: openModal, children: [_jsx(Add, {}), _jsx("span", { className: 'mr-1', children: "\u0627\u0641\u0632\u0648\u062F\u0646" })] })] }), isPending ? (_jsx("div", { className: 'flex justify-center', children: _jsx(KSpinner, { color: 'primary', size: 10 }) })) : (_jsx("div", { className: "grid grid-cols-1 gap-2 mt-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3", children: skills.map((info, index) => (_jsxs("div", { className: "flex items-center justify-center px-2 py-1 bg-gray-200 rounded", children: [_jsx("button", { onClick: () => handleDeleteItem(info.id), children: _jsx(Delete, {}) }), _jsxs("p", { className: 'flex-1 text-sm text-center text-black', children: [info.SoftwareSkill.title, " | ", skillLevelLabels[info.softwareSkillLevel]] })] }, index))) }))] })] }));
};
export default SoftwareSkills;
