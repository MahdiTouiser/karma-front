import { useRef, useState } from "react";
import { toast } from "react-toastify";
import Attachment from "../../../assets/icons/Attachment";
import Download from "../../../assets/icons/Download";
import Upload from "../../../assets/icons/Upload";
import useApi from "../../../hooks/useApi";
import { BaseResponse } from "../../../models/shared.models";
import KCard from "../../shared/Card";
import KSpinner from "../../shared/Spinner";
import KTooltip from "../../shared/Tooltip";

interface UploadFileResponse {
    value: string;
    message: string;
}

const PersonalResume = () => {
    const { sendRequest: AddFile, isPending: isAddFilePending } = useApi<FormData, BaseResponse<UploadFileResponse>>();
    const { sendRequest: UploadResume, isPending: isUploadResumePending } = useApi<{ fileId: string }, BaseResponse<null>>();
    const { sendRequest: DownloadResume, isPending: isDownloadResumePending } = useApi<void, Blob>();
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [isUploadComplete, setIsUploadComplete] = useState(false);

    const handleDownloadButton = () => {
        DownloadResume(
            {
                url: '/Resumes/DownloadPersonalResume',
                method: 'get',
                responseType: 'blob', // Expecting a Blob response
            },
            (response) => {
                const url = window.URL.createObjectURL(new Blob([response]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'PersonalResume.pdf'); // Specify the file name
                document.body.appendChild(link);
                link.click();
                link.parentNode?.removeChild(link);
                window.URL.revokeObjectURL(url); // Clean up the object URL
            },
            (error) => {
                toast.error(error?.message);
            }
        );
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const formData = new FormData();
            formData.append('File', file);
            AddFile(
                { url: '/Files', method: 'post', data: formData },
                (response) => {
                    toast.success(response.message);
                    handleFileUploading(response.value as unknown as string);
                },
                (error) => {
                    toast.error(error?.message);
                }
            );
        }
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleFileUploading = (fileId: string) => {
        const data = { fileId };
        UploadResume(
            {
                url: '/Resumes/UploadPersonalResume',
                method: 'put',
                data: data,
            },
            () => {
                setIsUploadComplete(true);
            },
            (error) => {
                toast.error(error?.message);
            }
        );
    };

    return (
        <KCard className="flex flex-col justify-between w-full">
            <div className="flex items-center justify-between">
                <h1 className="text-xl font-extrabold">بارگذاری رزومه شخصی</h1>
                {isUploadComplete && !isDownloadResumePending && (
                    <button onClick={handleDownloadButton} data-tip="دانلود رزومه بارگذاری شده">
                        <KTooltip
                            content={'دانلود رزومه بارگذاری شده'}
                            trigger="hover"
                            placement="bottom"
                        >
                            <Download />
                        </KTooltip>
                    </button>
                )}
                {isDownloadResumePending && <KSpinner />}
                {!isUploadComplete && (
                    <label className="text-sm text-blue-500 flex items-center cursor-pointer">
                        <KTooltip
                            content={'بارگذاری رزومه'}
                            trigger="hover"
                            placement="bottom"
                        >
                            <Upload />
                            <input
                                type="file"
                                className="hidden"
                                accept=".pdf"
                                onChange={handleFileChange}
                                ref={fileInputRef}
                            />
                        </KTooltip>
                    </label>
                )}
            </div>
            {isUploadComplete && <span className='flex justify-center mt-10'>
                <Attachment />
            </span>}

        </KCard>
    );
};

export default PersonalResume;
