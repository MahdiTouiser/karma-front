import React, { useEffect, useRef, useState } from 'react';
import ChevronDown from '../../assets/icons/ChevronDown';
import ChevronLeft from '../../assets/icons/ChevronLeft';
import Close from '../../assets/icons/Close';
import { OptionType } from '../../models/shared.models';

interface SelectboxWithSearchAndAllowAddProps {
    id?: string;
    placeholder?: string;
    options: OptionType[];
    register: any;
    errors: any;
    onChange?: any;
    onAdd?: (newItem: OptionType) => void;
    selectedItems?: OptionType[];
    defaultValue?: any;
}

const SelectboxWithSearchAndAllowAdd: React.FC<SelectboxWithSearchAndAllowAddProps> = ({
    placeholder,
    options,
    register,
    errors,
    onChange,
    onAdd,
    selectedItems,
    defaultValue,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedOption, setSelectedOption] = useState<OptionType | null>(defaultValue || null);
    const [newItemText, setNewItemText] = useState('');
    const [selectedItemsArray, setSelectedItemsArray] = useState<OptionType[]>(selectedItems || []);

    const dropdownRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleToggleDropdown = () => {
        setIsOpen(!isOpen);
        if (!isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
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

    const filteredOptions = options.filter(option =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleOptionClick = (option: OptionType) => {
        setSelectedOption(option);
        setSearchTerm('');
        setIsOpen(false);
        onChange(option.value);

        setSelectedItemsArray([...selectedItemsArray, option]);
    };

    const handleAddNewItem = () => {
        if (newItemText.trim() !== '') {
            const newItem: OptionType = {
                label: newItemText,
                value: newItemText.toLowerCase().replace(/\s/g, '-'),
            };
            if (onAdd) {
                onAdd(newItem);
            }
            setSelectedOption(newItem);
            setSearchTerm('');
            setIsOpen(false);
            setNewItemText('');

            setSelectedItemsArray([...selectedItemsArray, newItem]);
        }
    };

    const handleNewItemTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewItemText(event.target.value);
    };

    const handleClearSelection = () => {
        setSelectedItemsArray([]);
        setSelectedOption(null);
        onChange(null);
    };

    return (
        <div className='relative w-full' ref={dropdownRef}>
            <input
                type='text'
                className='w-full px-4 py-2 border border-gray-300 text-sm relative pr-10'
                onClick={handleToggleDropdown}
                readOnly
                placeholder={placeholder}
                value={selectedItemsArray.map(item => item.label).join(', ')}
                onChange={() => { }}
                ref={inputRef}
                {...register}
            />
            {selectedItemsArray.length > 0 && (
                <div className='absolute top-1/2 left-10 transform -translate-y-1/2'>
                    <Close onClick={handleClearSelection} className='cursor-pointer' />
                </div>
            )}
            <div className='absolute top-1/2 right-0 transform -translate-y-1/2'>
                {isOpen ? (
                    <ChevronDown onClick={handleToggleDropdown} />
                ) : (
                    <ChevronLeft onClick={handleToggleDropdown} />
                )}
            </div>
            {isOpen && (
                <div className='absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded shadow-lg z-10'>
                    <input
                        type='text'
                        className='w-full px-4 py-2 border-b border-gray-300 text-sm'
                        placeholder='Search'
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                    <ul className='max-h-48 overflow-y-auto'>
                        {filteredOptions.map(option => (
                            <li
                                key={option.value}
                                className='px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm'
                                onClick={() => handleOptionClick(option)}
                            >
                                {option.label}
                            </li>
                        ))}
                        <li className='px-4 py-2 border-t border-gray-300'>
                            <input
                                type='text'
                                className='w-full px-2 py-1 border border-gray-300 rounded-sm text-sm'
                                placeholder='Add new item'
                                value={newItemText}
                                onChange={handleNewItemTextChange}
                            />
                            <button
                                className='mt-2 px-4 py-1 bg-blue-500 text-white rounded-sm text-sm hover:bg-blue-600'
                                onClick={handleAddNewItem}
                            >
                                Add
                            </button>
                        </li>
                    </ul>
                </div>
            )}
            {errors && <span className='text-red-500 text-xs'>{errors.message}</span>}
        </div>
    );
};

export default SelectboxWithSearchAndAllowAdd;
