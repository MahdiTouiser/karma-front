import React, {
  useEffect,
  useState,
} from 'react';

import { useNavigate } from 'react-router-dom'; // Import useNavigate

import {
  genderMapping,
  GenderMapping,
  maritalStatusMapping,
  MaritalStatusMapping,
  militaryServiceStatusMapping,
  MilitaryServiceStatusMapping,
} from '../../../models/enums';
import { Resume } from '../../../models/shared.models';
import Grid from '../../shared/Grid/Grid';
import { ColDef } from '../../shared/Grid/grid.types';

interface Props {
    resumes: Resume[];
    onCardClick: (resume: Resume) => void;
}

interface GridData {
    id: string;
    fullName: string;
    gender: string;
    maritalStatus: string;
    militaryServiceStatus: string;
    city: string;
    birthDate: string;
    telephone: string;
}

const FoundedResumes: React.FC<Props> = ({ resumes }) => {
    const [gridData, setGridData] = useState<GridData[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const mappedData = resumes.map((resume) => ({
            id: resume.id,
            fullName: `${resume.firstName} ${resume.lastName}`,
            gender: genderMapping[resume.gender as keyof GenderMapping] || resume.gender,
            maritalStatus: maritalStatusMapping[resume.maritalStatus as keyof MaritalStatusMapping] || resume.maritalStatus,
            militaryServiceStatus: militaryServiceStatusMapping[resume.militaryServiceStatus as keyof MilitaryServiceStatusMapping]?.label || resume.militaryServiceStatus,
            city: resume.city,
            birthDate: resume.birthDate,
            telephone: resume.telephone,
        }));
        setGridData(mappedData);
    }, [resumes]);

    const [colDefs] = useState<ColDef<GridData>[]>([
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

    const handleRowDoubleClick = (data: GridData) => {
        navigate(`/admin/resumes/${data.id}`);
    };

    return (
        <>
            <h1 className='mb-5 mr-1'>نتایج یافت شده</h1>
            <Grid data={gridData} colDefs={colDefs} rowActions={null} onDoubleClick={handleRowDoubleClick} />
        </>
    );
}

export default FoundedResumes;