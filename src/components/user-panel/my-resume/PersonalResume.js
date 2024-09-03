import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef, useState } from "react";
import { toast } from "react-toastify";
import Attachment from "../../../assets/icons/Attachment";
import Download from "../../../assets/icons/Download";
import Upload from "../../../assets/icons/Upload";
import useApi from "../../../hooks/useApi";
import KCard from "../../shared/Card";
import KSpinner from "../../shared/Spinner";
import KTooltip from "../../shared/Tooltip";
const PersonalResume = () => {
    const { sendRequest: AddFile } = useApi();
    const { sendRequest: UploadResume } = useApi();
    const { sendRequest: DownloadResume, isPending: isDownloadResumePending } = useApi();
    const fileInputRef = useRef(null);
    const [isUploadComplete, setIsUploadComplete] = useState(false);
    const handleDownloadButton = () => {
        DownloadResume({
            url: '/Resumes/DownloadPersonalResume',
            method: 'get',
            responseType: 'blob',
        }, (response) => {
            const url = window.URL.createObjectURL(new Blob([response]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'PersonalResume.pdf');
            document.body.appendChild(link);
            link.click();
            link.parentNode?.removeChild(link);
            window.URL.revokeObjectURL(url);
        }, (error) => {
            toast.error(error?.message);
        });
    };
    const handleFileChange = (event) => {
        const file = event.target.files?.[0];
        if (file) {
            const formData = new FormData();
            formData.append('File', file);
            AddFile({ url: '/Files', method: 'post', data: formData }, (response) => {
                toast.success(response.message);
                handleFileUploading(response.value);
            }, (error) => {
                toast.error(error?.message);
            });
        }
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };
    const handleFileUploading = (fileId) => {
        const data = { fileId };
        UploadResume({
            url: '/Resumes/UploadPersonalResume',
            method: 'put',
            data: data,
        }, () => {
            setIsUploadComplete(true);
        }, (error) => {
            toast.error(error?.message);
        });
    };
    return (_jsxs(KCard, { className: "flex flex-col justify-between w-full", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("h1", { className: "text-xl font-extrabold", children: "\u0628\u0627\u0631\u06AF\u0630\u0627\u0631\u06CC \u0631\u0632\u0648\u0645\u0647 \u0634\u062E\u0635\u06CC" }), isUploadComplete && !isDownloadResumePending && (_jsx("button", { onClick: handleDownloadButton, "data-tip": "\u062F\u0627\u0646\u0644\u0648\u062F \u0631\u0632\u0648\u0645\u0647 \u0628\u0627\u0631\u06AF\u0630\u0627\u0631\u06CC \u0634\u062F\u0647", children: _jsx(KTooltip, { content: 'دانلود رزومه بارگذاری شده', trigger: "hover", placement: "bottom", children: _jsx(Download, {}) }) })), isDownloadResumePending && _jsx(KSpinner, {}), !isUploadComplete && (_jsx("label", { className: "text-sm text-blue-500 flex items-center cursor-pointer", children: _jsxs(KTooltip, { content: 'بارگذاری رزومه', trigger: "hover", placement: "bottom", children: [_jsx(Upload, {}), _jsx("input", { type: "file", className: "hidden", accept: ".pdf", onChange: handleFileChange, ref: fileInputRef })] }) }))] }), isUploadComplete && _jsx("span", { className: 'flex justify-center mt-10', children: _jsx(Attachment, {}) })] }));
};
export default PersonalResume;
