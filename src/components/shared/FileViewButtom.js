import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import FileViewer from "./FileViewer";
import KModal from "./Modal/Modal";
const FileViewButton = ({ fileId, alt = "", }) => {
    const [showView, setShowView] = useState(false);
    return (_jsxs(_Fragment, { children: [_jsx(KModal, { show: showView, onClose: () => setShowView(false), containerClass: "!p-3", children: _jsx(FileViewer, { fileId: fileId, alt: alt }) }), _jsx("button", { className: "text-cyan-600", onClick: () => setShowView(true), children: "\u0645\u0634\u0627\u0647\u062F\u0647" })] }));
};
export default FileViewButton;
