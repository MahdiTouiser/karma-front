import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { AiOutlineFileExcel } from 'react-icons/ai';
import useApi from '../../hooks/useApi';
import KButton from './Button'; // Import KButton component
import KSpinner from './Spinner';
const ExcelDownloadButton = ({ url, fileName, method = 'get', body }) => {
    const { sendRequest, isPending } = useApi();
    const handleExportExcel = () => {
        sendRequest({
            url: url,
            responseType: 'blob',
            method: method,
            data: body,
        }, (response) => {
            const blob = new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', fileName);
            document.body.appendChild(link);
            link.click();
        });
    };
    return (_jsx(_Fragment, { children: isPending ? (_jsx(KSpinner, { color: "blue" })) : (_jsxs(KButton, { onClick: handleExportExcel, color: 'success', children: [_jsx(AiOutlineFileExcel, { size: "1.5rem", className: 'ml-2' }), "\u062E\u0631\u0648\u062C\u06CC \u0627\u06A9\u0633\u0644"] })) }));
};
export default ExcelDownloadButton;
