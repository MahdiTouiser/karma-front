import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState, } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { genderMapping, maritalStatusMapping, militaryServiceStatusMapping, } from '../../../models/enums';
import Grid from '../../shared/Grid/Grid';
const FoundedResumes = ({ resumes }) => {
    const [gridData, setGridData] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const mappedData = resumes.map((resume) => ({
            id: resume.id,
            fullName: `${resume.firstName} ${resume.lastName}`,
            gender: genderMapping[resume.gender] || resume.gender,
            maritalStatus: maritalStatusMapping[resume.maritalStatus] || resume.maritalStatus,
            militaryServiceStatus: militaryServiceStatusMapping[resume.militaryServiceStatus]?.label || resume.militaryServiceStatus,
            city: resume.city,
            birthDate: resume.birthDate,
            telephone: resume.telephone,
        }));
        setGridData(mappedData);
    }, [resumes]);
    const [colDefs] = useState([
        {
            field: 'fullName',
            headerName: 'نام و نام خانوادگی',
        },
        {
            field: 'gender',
            headerName: 'جنسیت',
        },
        {
            field: 'maritalStatus',
            headerName: 'وضعیت تاهل',
        },
        {
            field: 'militaryServiceStatus',
            headerName: 'وضعیت نظام وظیفه',
        },
        {
            field: 'city',
            headerName: 'شهر محل سکونت',
        },
        {
            field: 'birthDate',
            headerName: 'تاریخ تولد',
        },
        {
            field: 'telephone',
            headerName: 'شماره موبایل',
        },
    ]);
    const handleRowDoubleClick = (data) => {
        navigate(`/admin/resumes/${data.id}`);
    };
    return (_jsxs(_Fragment, { children: [_jsx("h1", { className: 'mb-5 mr-1', children: "\u0646\u062A\u0627\u06CC\u062C \u06CC\u0627\u0641\u062A \u0634\u062F\u0647" }), _jsx(Grid, { data: gridData, colDefs: colDefs, rowActions: null, onDoubleClick: handleRowDoubleClick })] }));
};
export default FoundedResumes;
