import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PDFViewer } from '@react-pdf/renderer';
import CheckBadge from '../../../assets/icons/CheckBadge';
import KButton from '../../shared/Button';
import KCard from '../../shared/Card';
import ResumePreview from './ResumePreview';
const FinalizeResume = () => {
    const navigate = useNavigate();
    const [showPreview, setShowPreview] = useState(false);
    const handleButtonClick = () => {
        navigate('/my-resume');
    };
    return (_jsxs(KCard, { className: 'm-4 md:m-20 flex flex-col justify-center items-center text-xl md:text-3xl', children: [_jsx(CheckBadge, { className: 'w-16 h-16 mb-4' }), _jsx("p", { className: 'font-extrabold mb-4', children: "\u062A\u0628\u0631\u06CC\u06A9 !" }), _jsx("p", { children: "\u0631\u0632\u0648\u0645\u0647 \u0634\u0645\u0627 \u062D\u0627\u0636\u0631 \u0627\u0633\u062A!" }), _jsx("p", { className: 'text-sm mt-4 text-center px-4', children: "\u062A\u0628\u0631\u06CC\u06A9 \u0645\u06CC\u200C\u06AF\u0648\u06CC\u06CC\u0645! \u062D\u0627\u0644\u0627 \u0648\u0642\u062A \u0622\u0646 \u0627\u0633\u062A \u06A9\u0647 \u062F\u0631 \u0647\u0632\u0627\u0631\u0627\u0646 \u0622\u06AF\u0647\u06CC \u0634\u063A\u0644\u06CC \u062C\u0633\u062A\u062C\u0648 \u06A9\u0646\u06CC\u062F \u0648 \u0634\u063A\u0644 \u0645\u062A\u0646\u0627\u0633\u0628 \u0628\u0627 \u062A\u0648\u0627\u0646\u0627\u06CC\u06CC\u200C\u0647\u0627\u06CC\u062A\u0627\u0646 \u0631\u0627 \u067E\u06CC\u062F\u0627 \u06A9\u0646\u06CC\u062F." }), _jsx("div", { className: 'mt-4', children: _jsx(KButton, { color: 'primary', outline: false, onClick: handleButtonClick, children: "\u0631\u0632\u0648\u0645\u0647 \u0645\u0646" }) }), showPreview && (_jsx("div", { className: 'fixed inset-0 flex items-center justify-center bg-black bg-opacity-50', children: _jsxs("div", { className: 'bg-white p-4 rounded-lg max-w-[90%] md:max-w-3xl', children: [_jsx("button", { onClick: () => setShowPreview(false), className: 'text-sm', children: "\u0628\u0633\u062A\u0646" }), _jsx("div", { className: 'mt-2', children: _jsx(PDFViewer, { style: { width: '100%', height: '60vh' }, children: _jsx(ResumePreview, {}) }) })] }) }))] }));
};
export default FinalizeResume;
