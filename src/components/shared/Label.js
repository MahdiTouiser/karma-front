import { jsx as _jsx } from "react/jsx-runtime";
const KLabel = (props) => {
    return (_jsx("label", { htmlFor: props.htmlFor, className: `${props.className || ''} text-sm font-medium  dark:text-gray-300 text-slate-500 block mb-2`, children: props.children }));
};
export default KLabel;
