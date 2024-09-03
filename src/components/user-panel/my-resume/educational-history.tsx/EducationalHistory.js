import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState, } from 'react';
import { toast } from 'react-toastify';
import Add from '../../../../assets/icons/Add';
import Delete from '../../../../assets/icons/Delete';
import Edit from '../../../../assets/icons/Edit';
import useApi from '../../../../hooks/useApi';
import useConfirm from '../../../../hooks/useConfirm';
import { DegreeLevelDescriptions, } from '../../../../models/enums';
import KCard from '../../../shared/Card';
import KSpinner from '../../../shared/Spinner';
import EducationalHistoryModal from './EducationalHistoryModal';
const EducationalHistory = () => {
    const [educationalData, setEducationalData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [editingRecord, setEditingRecord] = useState(null);
    const { sendRequest: deleteRequest } = useApi();
    const { sendRequest: fetch, isPending } = useApi();
    const openModal = (record) => {
        setEditMode(!!record);
        setEditingRecord(record || null);
        setIsModalOpen(true);
    };
    const closeModal = () => {
        setEditMode(false);
        setEditingRecord(null);
        setIsModalOpen(false);
    };
    const [ConfirmModal, confirmation] = useConfirm("آیا از حذف این آیتم مطمئنید؟", "حذف سابقه تحصیلی");
    const fetchEducationalRecords = () => {
        fetch({
            url: '/Resumes/EducationalRecords',
        }, (response) => {
            setEducationalData(response);
        });
    };
    useEffect(() => {
        fetchEducationalRecords();
    }, []);
    const handleDeleteRecord = async (id) => {
        const confirm = await confirmation();
        if (confirm) {
            deleteRequest({
                url: `/Resumes/RemoveEducationalRecord/${id}`,
                method: 'delete'
            }, (response) => {
                toast.success(response?.message);
                fetchEducationalRecords();
            }, (error) => {
                toast.error(error?.message);
            });
        }
    };
    const sortedRecords = [...educationalData].sort((a, b) => a.fromYear - b.fromYear);
    return (_jsxs(_Fragment, { children: [_jsx(ConfirmModal, {}), _jsx(EducationalHistoryModal, { show: isModalOpen, onClose: closeModal, fetch: fetchEducationalRecords, editMode: editMode, record: editingRecord }), _jsxs(KCard, { className: 'flex flex-col justify-between w-full', children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("h1", { className: 'text-xl font-extrabold', children: "\u0633\u0648\u0627\u0628\u0642 \u062A\u062D\u0635\u06CC\u0644\u06CC" }), _jsxs("button", { className: "flex items-center text-sm text-blue-500", onClick: () => openModal(), children: [_jsx(Add, {}), _jsx("span", { className: 'mr-1', children: "\u0627\u0641\u0632\u0648\u062F\u0646" })] })] }), isPending ? (_jsx("span", { className: 'flex items-center justify-center', children: _jsx(KSpinner, { color: 'primary', size: 20 }) })) : (_jsx("div", { className: "flex flex-col mt-5", children: sortedRecords.map((info, index) => (_jsxs("div", { className: "flex items-center p-5 mt-6 mr-4 text-gray-600 border-l-2 border-blue-500 bg-gray-50", children: [_jsxs("div", { className: 'flex flex-col', id: 'icons', children: [_jsx("button", { className: "mr-2", onClick: () => openModal(info), children: _jsx(Edit, {}) }), _jsx("button", { className: "mt-4 mr-2", onClick: () => handleDeleteRecord(info.id), children: _jsx(Delete, {}) })] }), _jsxs("div", { className: "pl-2 mr-4", children: [_jsxs("p", { className: 'font-extrabold text-black', children: [DegreeLevelDescriptions[info.degreeLevel], " - ", info.major.title] }), _jsx("p", { className: 'mt-4', children: info.university.title }), _jsx("p", { className: 'mt-4', children: `${info.fromYear} - ${info.toYear === null ? 'در حال تحصیل' : info.toYear}` })] })] }, index))) }))] })] }));
};
export default EducationalHistory;
