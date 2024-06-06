import React, { useEffect, useState } from 'react';
import Edit from '../../../assets/icons/Edit';
import useApi from '../../../hooks/useApi';
import { GenderMapping, MaritalStatusMapping, MilitaryServiceStatusMapping, genderMapping, maritalStatusMapping, militaryServiceStatusMapping } from '../../../models/enums';
import { BasicInfoData, InfoType } from '../../../models/myresume.model';
import KCard from '../../shared/Card';

const BasicInfo: React.FC = () => {
    const [infoData, setInfoData] = useState<InfoType[]>([]);
    const { sendRequest: fetch } = useApi<null, BasicInfoData>();

    const fetchData = async () => {
        fetch(
            {
                url: "/Resumes/BasicInfo",
                params: {
                    pageSize: 10000,
                    pageIndex: 1,
                },
            },
            (response) => {
                const mappedData: InfoType[] = [
                    { label: 'نام و نام خانوادگی', value: `${response.firstName} ${response.lastName}` },
                    { label: 'جنسیت', value: genderMapping[response.gender as keyof GenderMapping] || response.gender },
                    { label: 'وضعیت تاهل', value: maritalStatusMapping[response.maritalStatus as keyof MaritalStatusMapping] || response.maritalStatus },
                    { label: 'وضعیت نظام وظیفه', value: militaryServiceStatusMapping[response.militaryServiceStatus as keyof MilitaryServiceStatusMapping] || response.militaryServiceStatus },
                    { label: 'شهر محل سکونت', value: response.city },
                    { label: 'تاریخ تولد', value: response.birthDate },
                    { label: 'شماره موبایل', value: response.telephone },
                ];
                setInfoData(mappedData);
            }
        );
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <KCard className='flex flex-col justify-between w-full'>
            <div className="flex items-center justify-between">
                <h1 className='text-xl font-bold'>اطلاعات اولیه</h1>
                <button className="text-sm text-blue-500 flex items-center">
                    <Edit strokeColor='#3b82f6' />
                    ویرایش
                </button>
            </div>
            {infoData.map((info, index) => (
                <div key={index} className='flex justify-between'>
                    <p className='text-gray-600 mt-5'>{info.label}</p>
                    <p className='text-black mt-5 font-extrabold'>{info.value}</p>
                </div>
            ))}
        </KCard>
    );
}

export default BasicInfo;
