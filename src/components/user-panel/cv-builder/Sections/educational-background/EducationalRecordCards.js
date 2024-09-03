import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { toast } from 'react-toastify';
import Add from '../../../../../assets/icons/Add';
import Delete from '../../../../../assets/icons/Delete';
import Edit from '../../../../../assets/icons/Edit';
import useApi from '../../../../../hooks/useApi';
import useConfirm from '../../../../../hooks/useConfirm';
import { DegreeLevelDescriptions } from '../../../../../models/enums';
import KCard from '../../../../shared/Card';
import EducationalRecord from './EducationalRecord';
const EducationalRecordCards = (props) => {
    const { records, refresh, setIsRecordVisible, isRecordVisible } = props;
    const { sendRequest: deleteRequest } = useApi();
    const [ConfirmModal, confirmation] = useConfirm("آیا از حذف این آیتم مطمئنید؟", "حذف سابقه تحصیلی");
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [formKey, setFormKey] = useState(0);
    const getDegreeLabel = (value) => {
        return DegreeLevelDescriptions[value] || value;
    };
    const handleDeleteRecord = async (id) => {
        const confirm = await confirmation();
        if (confirm) {
            deleteRequest({
                url: `/Resumes/RemoveEducationalRecord/${id}`,
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
    return (_jsxs("div", { children: [_jsx(ConfirmModal, {}), _jsx("div", { className: "flex items-center justify-between", children: _jsx("h1", { className: 'text-2xl font-extrabold', children: "\u0633\u0648\u0627\u0628\u0642 \u062A\u062D\u0635\u06CC\u0644\u06CC" }) }), sortedRecords.map(record => (_jsx(KCard, { className: 'mt-4', children: _jsxs("div", { className: 'flex items-center align-middle', children: [_jsxs("div", { className: 'flex flex-col p-3 ml-4 bg-gray-200 rounded', children: [_jsx("button", { onClick: () => handleEditRecord(record), children: _jsx(Edit, { className: 'w-5 h-5 mb-4' }) }), _jsx("button", { onClick: () => handleDeleteRecord(record.id), children: _jsx(Delete, { className: 'w-5 h-5', strokeColor: 'red' }) })] }), _jsxs("div", { children: [_jsxs("p", { className: 'm-2 text-lg font-extrabold', children: [getDegreeLabel(record.degreeLevel), " - ", record.major.title] }), _jsx("p", { className: 'm-2', children: record.university.title }), _jsxs("p", { className: 'm-2', children: [record.fromYear, " - ", record.stillEducating ? 'در حال تحصیل' : record.toYear] }), record.gpa && _jsxs("p", { className: 'm-2', children: ["\u0645\u0639\u062F\u0644: ", record.gpa] })] })] }) }, record.id))), _jsx("div", { className: 'mt-4', children: isRecordVisible ? (_jsx(EducationalRecord, { setIsRecordVisible: setIsRecordVisible, refresh: refresh, record: selectedRecord }, formKey)) : (_jsx("button", { onClick: handleAddNewRecord, children: _jsxs("span", { className: 'flex', children: [_jsx(Add, {}), _jsx("p", { className: 'mr-2 text-sm text-blue-500', children: "\u0627\u0641\u0632\u0648\u062F\u0646 \u0633\u0627\u0628\u0642\u0647 \u062A\u062D\u0635\u06CC\u0644\u06CC \u062C\u062F\u06CC\u062F" })] }) })) })] }));
};
export default EducationalRecordCards;
