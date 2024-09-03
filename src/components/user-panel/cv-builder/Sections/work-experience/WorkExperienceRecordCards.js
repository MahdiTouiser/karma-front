import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { toast } from 'react-toastify';
import Add from '../../../../../assets/icons/Add';
import Delete from '../../../../../assets/icons/Delete';
import Edit from '../../../../../assets/icons/Edit';
import useApi from '../../../../../hooks/useApi';
import useConfirm from '../../../../../hooks/useConfirm';
import KCard from '../../../../shared/Card';
import CareerRecord from './CareerRecord';
const WorkExperienceRecordCards = (props) => {
    const { records, refresh, setIsRecordVisible, isRecordVisible, cities, countries, jobCategories } = props;
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [ConfirmModal, confirmation] = useConfirm("آیا از حذف این آیتم مطمئنید؟", "حذف سابقه شغلی");
    const [formKey, setFormKey] = useState(0);
    const { sendRequest: deleteRequest } = useApi();
    const handleDeleteRecord = async (id) => {
        const confirm = await confirmation();
        if (confirm) {
            deleteRequest({
                url: `/Resumes/RemoveCareerRecord/${id}`,
                method: 'delete'
            }, (response) => {
                toast.success(response?.message);
                refresh();
            }, (error) => {
                toast.error(error?.message);
            });
        }
    };
    const handleEditRecord = (record) => {
        setSelectedRecord(record);
        setIsRecordVisible(true);
    };
    const handleAddNewRecord = () => {
        setSelectedRecord(null);
        setIsRecordVisible(true);
        setFormKey(prevKey => prevKey + 1);
    };
    const sortedRecords = [...records].sort((a, b) => a.fromYear - b.fromYear);
    return (_jsxs("div", { children: [_jsx(ConfirmModal, {}), sortedRecords.map(record => (_jsx(KCard, { className: 'mt-4', children: _jsxs("div", { className: 'flex items-center align-middle', children: [_jsxs("div", { className: 'flex flex-col p-3 ml-4 bg-gray-200 rounded', children: [_jsx("button", { onClick: () => handleEditRecord(record), children: _jsx(Edit, { className: 'w-5 h-5 mb-4' }) }), _jsx("button", { onClick: () => handleDeleteRecord(record.id), children: _jsx(Delete, { className: 'w-5 h-5', strokeColor: 'red' }) })] }), _jsxs("div", { children: [_jsx("p", { className: 'm-2 text-lg font-extrabold', children: record.jobTitle }), _jsx("p", { className: 'm-2', children: record.companyName }), _jsxs("p", { className: 'm-2', children: [record.fromYear, " - ", record.toYear || 'تاکنون'] })] })] }) }, record.id))), _jsx("div", { className: 'mt-4', children: isRecordVisible ? (_jsx(CareerRecord, { setIsRecordVisible: setIsRecordVisible, refresh: refresh, cities: cities, countries: countries, jobCategories: jobCategories, record: selectedRecord }, formKey)) : (_jsx("button", { onClick: handleAddNewRecord, children: _jsxs("span", { className: 'flex', children: [_jsx(Add, {}), _jsx("p", { className: 'mr-2 text-sm text-blue-500', children: "\u0627\u0641\u0632\u0648\u062F\u0646 \u0633\u0627\u0628\u0642\u0647 \u0634\u063A\u0644\u06CC \u062C\u062F\u06CC\u062F" })] }) })) })] }));
};
export default WorkExperienceRecordCards;
