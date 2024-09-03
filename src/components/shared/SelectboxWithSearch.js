import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef, useState, } from 'react';
import ChevronDown from '../../assets/icons/ChevronDown';
import ChevronLeft from '../../assets/icons/ChevronLeft';
const KSelectboxWithSearch = ({ placeholder, options, register, errors, onChange, defaultValue, }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedOption, setSelectedOption] = useState(defaultValue || null);
    const dropdownRef = useRef(null);
    const inputRef = useRef(null);
    const searchInputRef = useRef(null);
    const handleToggleDropdown = () => {
        setIsOpen(!isOpen);
    };
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };
    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    useEffect(() => {
        if (defaultValue) {
            setSelectedOption(defaultValue);
        }
    }, [defaultValue]);
    useEffect(() => {
        if (isOpen && searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, [isOpen]);
    const filteredOptions = options.filter(option => option.label.toLowerCase().includes(searchTerm.toLowerCase()));
    const handleOptionClick = (option) => {
        setSelectedOption(option);
        setSearchTerm('');
        setIsOpen(false);
        if (onChange) {
            onChange(option.value);
        }
    };
    return (_jsxs("div", { className: 'relative w-full', ref: dropdownRef, children: [_jsx("input", { type: 'text', className: 'relative w-full px-4 py-2 pr-10 text-sm border border-gray-300 rounded', onClick: handleToggleDropdown, readOnly: true, placeholder: placeholder, value: selectedOption ? selectedOption.label : '', onChange: () => { }, ref: inputRef }), _jsx("input", { type: "hidden", value: selectedOption ? selectedOption.value : '', ...register }), _jsx("div", { className: 'absolute right-0 transform -translate-y-1/2 cursor-pointer top-1/2', children: isOpen ? (_jsx(ChevronDown, { onClick: handleToggleDropdown })) : (_jsx(ChevronLeft, { onClick: handleToggleDropdown })) }), isOpen && (_jsxs("div", { className: 'absolute left-0 z-50 w-full mt-1 overflow-y-auto bg-white border border-gray-300 rounded shadow-lg top-full max-h-60', children: [_jsx("input", { type: 'text', className: 'w-full px-4 py-2 text-sm border-b border-gray-300', placeholder: '\u062C\u0633\u062A\u062C\u0648', value: searchTerm, onChange: handleSearchChange, ref: searchInputRef }), _jsx("ul", { className: '', children: filteredOptions.length > 0 ? (filteredOptions.map(option => (_jsx("li", { className: 'px-4 py-2 text-sm cursor-pointer hover:bg-gray-100', onClick: () => handleOptionClick(option), children: option.label }, option.value)))) : (_jsx("li", { className: 'px-4 py-2 text-gray-500', children: "\u06AF\u0632\u06CC\u0646\u0647\u200C\u0627\u06CC \u0645\u0648\u062C\u0648\u062F \u0646\u06CC\u0633\u062A" })) })] })), errors && _jsx("span", { className: 'text-xs text-red-500', children: errors.message })] }));
};
export default KSelectboxWithSearch;
