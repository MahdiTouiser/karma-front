import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import Edit from '../../../../assets/icons/Edit';
import useApi from '../../../../hooks/useApi';
import { genderMapping, maritalStatusMapping, militaryServiceStatusMapping } from '../../../../models/enums';
import KCard from '../../../shared/Card';
import KSpinner from '../../../shared/Spinner';
import BasicInfoEditModal from './BasicInfoEditModal';
const BasicInfo = () => {
    const [infoData, setInfoData] = useState([]);
    const { sendRequest: fetch, isPending } = useApi();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    const fetchData = async () => {
        fetch({
            url: '/Resumes/BasicInfo',
            params: {
                pageSize: 10000,
                pageIndex: 1,
            },
        }, (response) => {
            const mappedData = [
                { label: 'نام و نام خانوادگی', value: `${response.firstName} ${response.lastName}` },
                { label: 'جنسیت', value: genderMapping[response.gender] || response.gender },
                { label: 'وضعیت تاهل', value: maritalStatusMapping[response.maritalStatus] || response.maritalStatus },
                { label: 'وضعیت نظام وظیفه', value: militaryServiceStatusMapping[response.militaryServiceStatus]?.label || response.militaryServiceStatus },
                { label: 'شهر محل سکونت', value: response.city },
                { label: 'تاریخ تولد', value: response.birthDate },
                { label: 'شماره موبایل', value: response.telephone.toString() },
            ];
            setInfoData(mappedData);
        });
    };
    useEffect(() => {
        fetchData();
    }, []);
    return (_jsxs(_Fragment, { children: [_jsx(BasicInfoEditModal, { show: isModalOpen, onClose: closeModal, fetch: fetchData }), _jsxs(KCard, { className: 'flex flex-col justify-between w-full', children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("h1", { className: 'text-xl font-bold', children: "\u0627\u0637\u0644\u0627\u0639\u0627\u062A \u0627\u0648\u0644\u06CC\u0647" }), _jsxs("button", { className: "text-sm text-blue-500 flex items-center", onClick: openModal, children: [_jsx(Edit, { strokeColor: '#3b82f6' }), "\u0648\u06CC\u0631\u0627\u06CC\u0634"] })] }), isPending ? (_jsx("span", { className: 'flex justify-center items-center', children: _jsx(KSpinner, { color: 'primary', size: 20 }) })) : (_jsx(_Fragment, { children: infoData.map((info, index) => (_jsxs("div", { className: 'flex justify-between', children: [_jsx("p", { className: 'text-gray-600 mt-5', children: info.label }), _jsx("p", { className: 'text-black mt-5 font-extrabold', children: info.value })] }, index))) }))] })] }));
};
export default BasicInfo;
