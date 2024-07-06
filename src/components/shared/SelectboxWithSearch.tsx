import React, { useEffect, useRef, useState } from 'react';
import ChevronDown from '../../assets/icons/ChevronDown';
import ChevronLeft from '../../assets/icons/ChevronLeft';
import { OptionType } from '../../models/shared.models';

interface KSelectboxWithSearchProps {
    id?: string;
    placeholder?: string;
    options: OptionType[];
    register: any;
    errors: any;
    onChange?: any;
    defaultValue?: any;
}

const KSelectboxWithSearch: React.FC<KSelectboxWithSearchProps> = ({
    placeholder,
    options,
    register,
    errors,
    onChange,
    defaultValue,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedOption, setSelectedOption] = useState<OptionType | null>(defaultValue || null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);

    const handleToggleDropdown = () => {
        setIsOpen(!isOpen);
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

    useEffect(() => {
        if (isOpen && searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, [isOpen]);

    const filteredOptions = options.filter(option =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleOptionClick = (option: OptionType) => {
        setSelectedOption(option);
        setSearchTerm('');
        setIsOpen(false);
        onChange(option.value);
    };

    return (
        <div className='relative w-full' ref={dropdownRef}>
            <input
                type='text'
                className='w-full px-4 py-2 border border-gray-300 text-sm relative pr-10 rounded'
                onClick={handleToggleDropdown}
                readOnly
                placeholder={placeholder}
                value={selectedOption ? selectedOption.label : ''}
                onChange={() => { }}
                ref={inputRef}
                {...register}
            />
            <div className='absolute top-1/2 right-0 transform -translate-y-1/2 cursor-pointer'>
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
                        placeholder='جستجو'
                        value={searchTerm}
                        onChange={handleSearchChange}
                        ref={searchInputRef}
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
                    </ul>
                </div>
            )}
            {errors && <span className='text-red-500 text-xs'>{errors.message}</span>}
        </div>
    );
};

export default KSelectboxWithSearch;
