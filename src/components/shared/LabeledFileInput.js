import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import useApi from "../../hooks/useApi";
import KSpinner from "./Spinner";
const LabeledFileInput = ({ acceptFiles = "", title, field = "file", url = "/file", onUpload, onRemove, disabled = false, maxSize, }) => {
    const { sendRequest, isPending } = useApi();
    const [uploadedFile, setUploadedFile] = useState();
    const [error, setError] = useState("");
    function onChange(event) {
        setError("");
        const files = event.target.files;
        if (!files || !files.length) {
            return;
        }
        const file = files[0];
        if (maxSize !== undefined && file.size > maxSize * 1024) {
            setError(`حداکثر سایز فایل ${maxSize}KB است.`);
            return;
        }
        const formData = new FormData();
        formData.append(field, file);
        if (!maxSize) {
            formData.append("ignoreFileSizeLimitation", "true");
        }
        sendRequest({
            url: url,
            data: formData,
            method: "post",
        }, (response) => {
            setUploadedFile(file);
            onUpload(response);
        }, (error) => {
            setError(error?.message || "خطا در بارگذاری");
        });
    }
    function resetUploadedFile() {
        setUploadedFile(null);
        onRemove && onRemove();
    }
    return (_jsxs("div", { children: [!(isPending || uploadedFile) && (_jsx("label", { htmlFor: title, className: `text-blue-700 font-semibold ${disabled ? "cursor-not-allowed opacity-70" : "cursor-pointer"}`, children: "\u0628\u0627\u0631\u06AF\u0630\u0627\u0631\u06CC \u0641\u0627\u06CC\u0644" })), isPending && _jsx(KSpinner, { size: 8 }), error && _jsx("p", { className: "text-red-600", children: error }), uploadedFile && (_jsxs("span", { className: "flex", children: [_jsx("button", { className: "text-red-600 ml-2 block translate-y-[2px]", onClick: resetUploadedFile, children: "X" }), _jsx("a", { className: "text-blue-700 inline-block max-w-[200px] overflow-hidden text-ellipsis whitespace-nowrap ltr", href: URL.createObjectURL(uploadedFile), download: uploadedFile.name, children: uploadedFile.name })] })), _jsx("input", { type: "file", id: title, className: "hidden", accept: acceptFiles, onChange: onChange, disabled: disabled })] }));
};
export default LabeledFileInput;
