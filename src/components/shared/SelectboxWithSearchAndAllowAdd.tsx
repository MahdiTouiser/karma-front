import React, {
    useEffect,
    useRef,
    useState,
} from 'react';

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
    onChange?: (selectedItems: OptionType[]) => void;
    onAdd?: (newItem: OptionType) => void;
    defaultValue?: OptionType[];
}

const SelectboxWithSearchAndAllowAdd: React.FC<SelectboxWithSearchAndAllowAddProps> = ({
    placeholder,
    options,
    register,
    errors,
    onChange,
    onAdd,
    defaultValue,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [newItemText, setNewItemText] = useState('');
    const [selectedItemsArray, setSelectedItemsArray] = useState<OptionType[]>(defaultValue || []);
    console.log(selectedItemsArray);
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

    const filteredOptions = options.filter(option =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleOptionClick = (option: OptionType) => {
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
            const newItem: OptionType = {
                label: newItemText,
                value: +newItemText.toLowerCase().replace(/\s/g, '-'),
            };

            if (
                selectedItemsArray.some(item => item.value === newItem.value) ||
                options.some(option => option.value === newItem.value)
            ) {
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

    const handleNewItemTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewItemText(event.target.value);
    };

    const handleClearSelection = () => {
        setSelectedItemsArray([]);
        if (onChange) {
            onChange([]);
        }
    };

    return (
        <div className='relative w-full' ref={dropdownRef}>
            <input
                type='text'
                className='relative w-full px-4 py-2 pr-10 text-sm border border-gray-300'
                onClick={handleToggleDropdown}
                readOnly
                placeholder={placeholder}
                value={selectedItemsArray.map(item => item.label).join(', ')}
                onChange={() => { }}
                ref={inputRef}
                {...register}
            />
            {selectedItemsArray.length > 0 && (
                <div className='absolute transform -translate-y-1/2 top-1/2 left-10'>
                    <Close onClick={handleClearSelection} className='cursor-pointer' />
                </div>
            )}
            <div className='absolute right-0 transform -translate-y-1/2 top-1/2'>
                {isOpen ? (
                    <ChevronDown onClick={handleToggleDropdown} />
                ) : (
                    <ChevronLeft onClick={handleToggleDropdown} />
                )}
            </div>
            {isOpen && (
                <div className='absolute left-0 right-0 z-10 mt-1 bg-white border border-gray-300 rounded shadow-lg top-full'>
                    <input
                        type='text'
                        className='w-full px-4 py-2 text-sm border-b border-gray-300'
                        placeholder='جستجو'
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                    <ul className='overflow-y-auto max-h-48'>
                        {filteredOptions.map(option => (
                            <li
                                key={option.value}
                                className='px-4 py-2 text-sm cursor-pointer hover:bg-gray-100'
                                onClick={() => handleOptionClick(option)}
                            >
                                {option.label}
                            </li>
                        ))}
                        <li className='px-4 py-2 border-t border-gray-300'>
                            <input
                                type='text'
                                className='w-full px-2 py-1 text-sm border border-gray-300 rounded-sm'
                                placeholder='Add new item'
                                value={newItemText}
                                onChange={handleNewItemTextChange}
                            />
                            <button
                                className='px-4 py-1 mt-2 text-sm text-white bg-blue-500 rounded-sm hover:bg-blue-600'
                                onClick={handleAddNewItem}
                            >
                                Add
                            </button>
                        </li>
                    </ul>
                </div>
            )}
            {errors && <span className='text-xs text-red-500'>{errors.message}</span>}
        </div>
    );
};

export default SelectboxWithSearchAndAllowAdd;
