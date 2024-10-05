import React from 'react'

import { faDownload } from '@fortawesome/free-solid-svg-icons' // Import the download icon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import useApi from '../../../../hooks/useApi'
import KCard from '../../../shared/Card'
import KTooltip from '../../../shared/Tooltip'

const DownloadKarmaResume: React.FC = () => {
    const { sendRequest, isPending } = useApi();

    const handleDownloadResume = async () => {
        try {
            const response: any = await sendRequest({
                url: 'Resumes/Download',
                method: 'GET',
                responseType: 'blob',
            });

            const url = window.URL.createObjectURL(response);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'resume.pdf');
            document.body.appendChild(link);
            link.click();
            link.parentNode?.removeChild(link);
        } catch (error) {
            console.error('Error downloading resume:', error);
        }
    };

    return (
        <KCard className="flex flex-col justify-between w-full">
            <div className="flex items-center justify-between">
                <h1 className="text-xl font-extrabold">دانلود رزومه کارما</h1>
                <button
                    onClick={handleDownloadResume}
                    className="flex items-center"
                >
                    <KTooltip
                        content={'دانلود رزومه'}
                        trigger="hover"
                        placement="bottom"
                    >
                        <FontAwesomeIcon
                            icon={faDownload}
                            className="flex ml-2 items-center text-md text-blue-500 cursor-pointer m"
                        />
                    </KTooltip>

                </button>
            </div>
        </KCard>
    );
};

export default DownloadKarmaResume;