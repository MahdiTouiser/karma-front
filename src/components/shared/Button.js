import { jsx as _jsx } from "react/jsx-runtime";
import { Button, } from 'flowbite-react';
const customTheme = {
    color: {
        primary: 'bg-cyan-500 hover:bg-cyan-800 text-white disabled:hover:bg-cyan-800',
        secondary: 'bg-gray-400 hover:bg-gray-900 text-white disabled:hover:bg-gray-800',
        tertiary: 'bg-[#17a589] hover:bg-gray-700 text-white disabled:hover:bg-[#17a589]',
        warning: 'bg-red-600 bg-opacity-75 hover:bg-opacity-100 text-white disabled:bg-opacity-75',
    },
    pill: {
        off: 'rounded-sm',
    },
    outline: {
        pill: {
            off: 'rounded-sm [line-height:unset]',
        },
    },
};
const KButton = (props) => {
    return (_jsx(Button, { theme: customTheme, ...props, className: `${props.className || ''} border-0 outline-none shadow-none rounded w-full sm:w-auto`, children: props.children }));
};
export default KButton;
