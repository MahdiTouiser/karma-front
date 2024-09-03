import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Add from '../../../../assets/icons/Add';
import Delete from '../../../../assets/icons/Delete';
import LinkIcon from '../../../../assets/icons/Link';
import useApi from '../../../../hooks/useApi';
import useConfirm from '../../../../hooks/useConfirm';
import KCard from '../../../shared/Card';
import SamplesModal from './SamplesModal';
const Samples = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    const { sendRequest: fetch } = useApi();
    const [sampleData, setSampleData] = useState([]);
    const { sendRequest: deleteRequest } = useApi();
    const fetchData = async () => {
        fetch({
            url: "/Resumes/WorkSamples",
        }, (response) => {
            setSampleData(response);
        });
    };
    useEffect(() => {
        fetchData();
    }, []);
    const [ConfirmModal, confirmation] = useConfirm("آیا از حذف این آیتم مطمئنید؟", "حذف نمونه کار");
    const handleDeleteButton = async (id) => {
        const confirm = await confirmation();
        if (confirm) {
            deleteRequest({
                url: `/Resumes/RemoveWorkSample/${id}`,
                method: 'delete'
            }, (response) => {
                toast.success(response?.message);
                fetchData();
            }, (error) => {
                toast.error(error?.message);
            });
        }
    };
    return (_jsxs(_Fragment, { children: [_jsx(ConfirmModal, {}), _jsx(SamplesModal, { show: isModalOpen, onClose: closeModal, fetch: fetchData }), _jsxs(KCard, { className: 'flex flex-col justify-between w-full', children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("h1", { className: 'text-xl font-extrabold', children: "\u0646\u0645\u0648\u0646\u0647 \u06A9\u0627\u0631\u0647\u0627" }), _jsxs("button", { className: "text-sm text-blue-500 flex items-center", onClick: openModal, children: [_jsx(Add, {}), _jsx("span", { className: 'mr-1', children: "\u0627\u0641\u0632\u0648\u062F\u0646" })] })] }), _jsx("div", { className: "mt-5", children: sampleData.map((info, index) => (_jsx("div", { className: "mb-3", children: _jsxs("div", { className: "flex items-center justify-between bg-gray-200 rounded px-2 py-1 ltr", children: [_jsxs(Link, { to: info.link, target: '_blank', className: 'flex items-center', children: [_jsx(LinkIcon, {}), _jsx("p", { className: 'text-blue-500 text-sm', children: info.link })] }), _jsx("button", { onClick: () => handleDeleteButton(info.id), children: _jsx(Delete, {}) })] }) }, index))) })] })] }));
};
export default Samples;
