import React from 'react';
import { AiOutlineFileExcel } from 'react-icons/ai';
import useApi from '../../hooks/useApi';
import SDButton from './Button'; // Import SDButton component
import SDSpinner from './Spinner';

interface ExcelDownloadButtonProps {
    url: string;
    fileName: string;
    method?: string;
    body?: string[];
}

const ExcelDownloadButton: React.FC<ExcelDownloadButtonProps> = ({
    url,
    fileName,
    method = 'get',
    body
}) => {
    const { sendRequest, isPending } = useApi<string[], Blob>();

    const handleExportExcel = () => {
        sendRequest(
            {
                url: url,
                responseType: 'blob',
                method: method,
                data: body,
            },
            (response) => {
                const blob = new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', fileName);
                document.body.appendChild(link);
                link.click();
            }
        );
    };

    return (
        <>
            {isPending ? (
                <SDSpinner color="blue" />
            ) : (
                <SDButton onClick={handleExportExcel} color='success'>
                    <AiOutlineFileExcel size="1.5rem" className='ml-2' />
                    خروجی اکسل
                </SDButton>
            )}
        </>
    );
}

export default ExcelDownloadButton;
