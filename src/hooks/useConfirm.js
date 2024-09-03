import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import KButton from "../components/shared/Button";
import KModal from "../components/shared/Modal/Modal";
let resolvePromise;
function useConfirm(message, title = "", confirmButton = "بله", rejectButton = "خیر") {
    const [showModal, setShowModal] = useState(false);
    const confirmation = () => {
        setShowModal(true);
        return new Promise((resolve) => {
            resolvePromise = resolve;
        });
    };
    function handleConfirm() {
        resolvePromise(true);
        setShowModal(false);
    }
    function handleReject() {
        resolvePromise(false);
        setShowModal(false);
    }
    const ConfirmModal = () => {
        return (_jsxs(KModal, { show: showModal, onClose: () => handleReject(), containerClass: "!pb-2", children: [title && (_jsx(KModal.Header, { withClose: false, color: "warning", children: _jsxs("div", { className: "flex gap-2 items-center", children: [_jsx("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", className: "w-6 h-6 stroke-black", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" }) }), _jsx("div", { className: "text-black font-semibold", children: title })] }) })), _jsxs("div", { className: "px-5 mt-8", children: [_jsx("p", { className: "mb-8", children: message }), _jsxs("div", { className: "flex justify-end gap-2", children: [_jsx(KButton, { onClick: handleReject, outline: true, color: "secondary", className: "!rounded-md", children: rejectButton }), _jsx(KButton, { onClick: handleConfirm, color: "warning", className: "!rounded-md", children: confirmButton })] })] })] }));
    };
    return [ConfirmModal, confirmation];
}
export default useConfirm;
