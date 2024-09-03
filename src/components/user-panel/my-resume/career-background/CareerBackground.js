import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState, } from 'react';
import { toast } from 'react-toastify';
import Add from '../../../../assets/icons/Add';
import Delete from '../../../../assets/icons/Delete';
import Edit from '../../../../assets/icons/Edit';
import useApi from '../../../../hooks/useApi';
import useConfirm from '../../../../hooks/useConfirm';
import KCard from '../../../shared/Card';
import KSpinner from '../../../shared/Spinner';
import CareerBackgroundModal from './CareerBackgroundModal';
const CareerBackground = () => {
    const { sendRequest: fetch, isPending } = useApi();
    const [careerRecords, setCareerRecords] = useState([]);
    const { sendRequest: deleteRequest } = useApi();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [editingRecord, setEditingRecord] = useState(null);
    const openModal = (record) => {
        if (record) {
            setEditMode(true);
            setEditingRecord(record);
        }
        else {
            setEditMode(false);
            setEditingRecord(null);
        }
        setIsModalOpen(true);
    };
    const closeModal = () => {
        setIsModalOpen(false);
        setEditingRecord(null);
    };
    const [ConfirmModal, confirmation] = useConfirm("آیا از حذف این آیتم مطمئنید؟", "حذف سابقه شغلی");
    const fetchCareerRecords = () => {
        fetch({
            url: "/Resumes/CareerRecords",
        }, (response) => {
            setCareerRecords(response);
        });
    };
    useEffect(() => {
        fetchCareerRecords();
    }, []);
    const handleDeleteRecord = async (id) => {
        const confirm = await confirmation();
        if (confirm) {
            deleteRequest({
                url: `/Resumes/RemoveCareerRecord/${id}`,
                method: 'delete'
            }, (response) => {
                toast.success(response?.message);
                fetchCareerRecords();
            }, (error) => {
                toast.error(error?.message);
            });
        }
    };
    const sortedRecords = [...careerRecords].sort((a, b) => a.fromYear - b.fromYear);
    return (_jsxs(_Fragment, { children: [_jsx(ConfirmModal, {}), _jsx(CareerBackgroundModal, { show: isModalOpen, onClose: closeModal, fetch: fetchCareerRecords, editMode: editMode, record: editingRecord }), _jsxs(KCard, { className: 'flex flex-col justify-between w-full', children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("h1", { className: 'text-xl font-extrabold', children: "\u0633\u0648\u0627\u0628\u0642 \u0634\u063A\u0644\u06CC" }), _jsxs("button", { className: "flex items-center text-sm text-blue-500", onClick: () => openModal(), children: [_jsx(Add, {}), _jsx("span", { className: 'mr-1', children: "\u0627\u0641\u0632\u0648\u062F\u0646" })] })] }), isPending ? (_jsx("span", { className: 'flex items-center justify-center', children: _jsx(KSpinner, { color: 'primary', size: 20 }) })) : (_jsxs("div", { className: "flex flex-col mt-5", children: [sortedRecords.map((info, index) => (_jsxs("div", { className: "flex items-center p-5 mt-6 mr-4 text-gray-600 border-l-2 border-blue-500 bg-gray-50", children: [_jsxs("div", { className: 'flex flex-col', id: 'icons', children: [_jsx("button", { className: "mr-2", onClick: () => openModal(info), children: _jsx(Edit, {}) }), _jsx("button", { className: "mt-4 mr-2", onClick: () => handleDeleteRecord(info.id), children: _jsx(Delete, {}) })] }), _jsxs("div", { className: "pl-2 mr-4", children: [_jsx("p", { className: 'font-extrabold text-black', children: info.jobTitle }), _jsx("p", { className: 'mt-4', children: info.companyName }), _jsx("p", { className: 'mt-4', children: `${info.fromYear} - ${info.toYear ? info.toYear : 'تا کنون'}` })] })] }, index))), _jsxs("p", { className: "mt-6 text-center", children: ["\u0645\u062C\u0645\u0648\u0639 \u0633\u0648\u0627\u0628\u0642 \u0634\u063A\u0644\u06CC: ", sortedRecords.reduce((total, record) => total + record.workTotalMonths, 0), " \u0645\u0627\u0647"] })] }))] })] }));
};
export default CareerBackground;
