import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import KButton from "../../../components/shared/Button";
import KCard from "../../../components/shared/Card";
import KSelect from "../../../components/shared/Select";
import KTextInput from "../../../components/shared/TextInput";
const JobSearch = () => {
    return (_jsx(KCard, { className: "flex justify-center items-center mt-10", children: _jsx("main", { className: "w-full flex flex-col justify-center", children: _jsxs("div", { className: "flex flex-col justify-center", children: [_jsx("p", { className: "flex justify-start font-bold text-xl mr-4", children: "\u062F\u0646\u0628\u0627\u0644 \u0686\u0647 \u0634\u063A\u0644\u06CC \u0645\u06CC \u06AF\u0631\u062F\u06CC\u062F \u061F" }), _jsxs("div", { className: "flex", children: [_jsx("div", { className: "m-4 w-1/2", children: _jsx(KTextInput, { type: "text", id: "title", placeholder: "\u0639\u0646\u0648\u0627\u0646 \u0634\u063A\u0644\u06CC \u06CC\u0627 \u0634\u0631\u06A9\u062A" }) }), _jsx("div", { className: "m-4 w-1/4", children: _jsxs(KSelect, { id: "job-category", placeholder: "\u06AF\u0631\u0648\u0647 \u0634\u063A\u0644\u06CC", defaultValue: "", children: [_jsx("option", { value: "developer", children: "\u0628\u0631\u0646\u0627\u0645\u0647 \u0646\u0648\u06CC\u0633\u06CC" }), _jsx("option", { value: "designer", children: "\u0637\u0631\u0627\u062D\u06CC" }), _jsx("option", { value: "manager", children: "\u0645\u062F\u06CC\u0631\u06CC\u062A" })] }) }), _jsx("div", { className: "m-4 w-1/4", children: _jsx(KTextInput, { type: "text", id: "city", placeholder: "\u0634\u0647\u0631" }) }), _jsx("div", { className: "m-4 w-1/4", children: _jsxs(KButton, { color: "primary", className: "px-8", children: [_jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "currentColor", className: "w-6 h-6", children: _jsx("path", { fillRule: "evenodd", d: "M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z", clipRule: "evenodd" }) }), _jsx("p", { className: "mr-2", children: "\u062C\u0633\u062A\u062C\u0648 \u0645\u0634\u0627\u063A\u0644" })] }) })] })] }) }) }));
};
export default JobSearch;