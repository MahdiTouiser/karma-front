import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import pdfIcon from "../../assets/pdf-icon.jpg";
import { axiosIntance } from "../../hooks/useApi";
import KSpinner from "./Spinner";
const FileViewer = ({ fileId, alt = "", }) => {
    const imageLink = fileId
        ? `${import.meta.env.VITE_BASE_API_URL}/file/${fileId}`
        : "";
    const [fileContent, setFileContent] = useState();
    const [isPending, setIsPending] = useState(false);
    const [isImage, setIsImage] = useState(false);
    useEffect(() => {
        const fetchFile = async (address) => {
            setIsPending(true);
            try {
                const response = await axiosIntance.get(address, {
                    responseType: "blob",
                });
                const blob = response.data;
                const contentType = response.headers["content-type"];
                const isImage = contentType?.startsWith("image/") ?? false;
                setIsImage(isImage);
                if (isImage) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                        setFileContent(reader.result);
                    };
                    reader.readAsDataURL(blob);
                }
                else {
                    setFileContent(pdfIcon);
                }
            }
            catch (error) {
                console.error("Error fetching file:", error);
            }
            finally {
                setIsPending(false);
            }
        };
        if (fileId) {
            fetchFile(imageLink);
        }
    }, [fileId, imageLink]);
    return (_jsx(_Fragment, { children: _jsx("a", { href: imageLink, target: "_blank", className: "block relative", children: isPending ? (_jsx(KSpinner, { color: "blue", size: 10 })) : (_jsxs(_Fragment, { children: [_jsx("img", { src: fileContent, alt: alt, className: isImage ? "" : "w-36 opacity-50" }), !isImage && (_jsx("p", { className: "absolute top-1/2 w-full text-center -translate-y-1/2 font-bold text-xl text-blue-950", children: "\u062F\u0627\u0646\u0644\u0648\u062F" }))] })) }) }));
};
export default FileViewer;
