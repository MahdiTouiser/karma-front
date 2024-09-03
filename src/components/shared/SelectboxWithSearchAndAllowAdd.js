import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef, useState, } from 'react';
import ChevronDown from '../../assets/icons/ChevronDown';
import ChevronLeft from '../../assets/icons/ChevronLeft';
import Close from '../../assets/icons/Close';
const SelectboxWithSearchAndAllowAdd = ({ placeholder, options, register, errors, onChange, onAdd, defaultValue, }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [newItemText, setNewItemText] = useState('');
    const [selectedItemsArray, setSelectedItemsArray] = useState(defaultValue || []);
    console.log(selectedItemsArray);
    const dropdownRef = useRef(null);
    const inputRef = useRef(null);
    const handleToggleDropdown = () => {
        setIsOpen(!isOpen);
        if (!isOpen && inputRef.current) {
            inputRef.current.focus();
        }
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
    const filteredOptions = options.filter(option => option.label.toLowerCase().includes(searchTerm.toLowerCase()));
    const handleOptionClick = (option) => {
        if (selectedItemsArray.some(item => item.value === option.value)) {
            setIsOpen(false);
            return;
        }
        const newSelectedItemsArray = [...selectedItemsArray, option];
        setSelectedItemsArray(newSelectedItemsArray);
        setSearchTerm('');
        setIsOpen(false);
        if (onChange) {
            onChange(newSelectedItemsArray);
        }
    };
    const handleAddNewItem = () => {
        if (newItemText.trim() !== '') {
            const newItem = {
                label: newItemText,
                value: +newItemText.toLowerCase().replace(/\s/g, '-'),
            };
            if (selectedItemsArray.some(item => item.value === newItem.value) ||
                options.some(option => option.value === newItem.value)) {
                return;
            }
            if (onAdd) {
                onAdd(newItem);
            }
            const newSelectedItemsArray = [...selectedItemsArray, newItem];
            setSelectedItemsArray(newSelectedItemsArray);
            setSearchTerm('');
            setIsOpen(false);
            setNewItemText('');
            if (onChange) {
                onChange(newSelectedItemsArray);
            }
        }
    };
    const handleNewItemTextChange = (event) => {
        setNewItemText(event.target.value);
    };
    const handleClearSelection = () => {
        setSelectedItemsArray([]);
        if (onChange) {
            onChange([]);
        }
    };
    return (_jsxs("div", { className: 'relative w-full', ref: dropdownRef, children: [_jsx("input", { type: 'text', className: 'relative w-full px-4 py-2 pr-10 text-sm border border-gray-300', onClick: handleToggleDropdown, readOnly: true, placeholder: placeholder, value: selectedItemsArray.map(item => item.label).join(', '), onChange: () => { }, ref: inputRef, ...register }), selectedItemsArray.length > 0 && (_jsx("div", { className: 'absolute transform -translate-y-1/2 top-1/2 left-10', children: _jsx(Close, { onClick: handleClearSelection, className: 'cursor-pointer' }) })), _jsx("div", { className: 'absolute right-0 transform -translate-y-1/2 top-1/2', children: isOpen ? (_jsx(ChevronDown, { onClick: handleToggleDropdown })) : (_jsx(ChevronLeft, { onClick: handleToggleDropdown })) }), isOpen && (_jsxs("div", { className: 'absolute left-0 right-0 z-10 mt-1 bg-white border border-gray-300 rounded shadow-lg top-full', children: [_jsx("input", { type: 'text', className: 'w-full px-4 py-2 text-sm border-b border-gray-300', placeholder: '\u062C\u0633\u062A\u062C\u0648', value: searchTerm, onChange: handleSearchChange }), _jsxs("ul", { className: 'overflow-y-auto max-h-48', children: [filteredOptions.map(option => (_jsx("li", { className: 'px-4 py-2 text-sm cursor-pointer hover:bg-gray-100', onClick: () => handleOptionClick(option), children: option.label }, option.value))), _jsxs("li", { className: 'px-4 py-2 border-t border-gray-300', children: [_jsx("input", { type: 'text', className: 'w-full px-2 py-1 text-sm border border-gray-300 rounded-sm', placeholder: 'Add new item', value: newItemText, onChange: handleNewItemTextChange }), _jsx("button", { className: 'px-4 py-1 mt-2 text-sm text-white bg-blue-500 rounded-sm hover:bg-blue-600', onClick: handleAddNewItem, children: "Add" })] })] })] })), errors && _jsx("span", { className: 'text-xs text-red-500', children: errors.message })] }));
};
export default SelectboxWithSearchAndAllowAdd;
