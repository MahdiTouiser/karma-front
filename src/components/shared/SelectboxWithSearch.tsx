import React, {
  useEffect,
  useRef,
  useState,
} from 'react';

import ChevronDown from '../../assets/icons/ChevronDown';
import ChevronLeft from '../../assets/icons/ChevronLeft';
import { OptionType } from '../../models/shared.models';

interface KSelectboxWithSearchProps {
    id?: string;
    placeholder?: string;
    options: OptionType[];
    register: any;
    errors: any;
    onChange?: (value: number) => void;
    defaultValue?: OptionType | null;
    clearError?: any
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
        if (onChange) {
            onChange(option.value);
        }
    };

    return (
        <div className='relative w-full' ref={dropdownRef}>
            <input
                type='text'
                className='relative w-full px-4 py-2 pr-10 text-sm border border-gray-300 rounded'
                onClick={handleToggleDropdown}
                readOnly
                placeholder={placeholder}
                value={selectedOption ? selectedOption.label : ''}
                onChange={() => { }}
                ref={inputRef}
            />
            <input
                type="hidden"
                value={selectedOption ? selectedOption.value : ''}
                {...register}
            />
            <div className='absolute right-0 transform -translate-y-1/2 cursor-pointer top-1/2'>
                {isOpen ? (
                    <ChevronDown onClick={handleToggleDropdown} />
                ) : (
                    <ChevronLeft onClick={handleToggleDropdown} />
                )}
            </div>
            {isOpen && (
                <div className='absolute left-0 z-50 w-full mt-1 overflow-y-auto bg-white border border-gray-300 rounded shadow-lg top-full max-h-60'>
                    <input
                        type='text'
                        className='w-full px-4 py-2 text-sm border-b border-gray-300'
                        placeholder='جستجو'
                        value={searchTerm}
                        onChange={handleSearchChange}
                        ref={searchInputRef}
                    />
                    <ul className=''>
                        {filteredOptions.length > 0 ? (
                            filteredOptions.map(option => (
                                <li
                                    key={option.value}
                                    className='px-4 py-2 text-sm cursor-pointer hover:bg-gray-100'
                                    onClick={() => handleOptionClick(option)}
                                >
                                    {option.label}
                                </li>
                            ))
                        ) : (
                            <li className='px-4 py-2 text-gray-500'>گزینه‌ای موجود نیست</li>
                        )}
                    </ul>
                </div>
            )}
            {errors && <span className='text-xs text-red-500'>{errors.message}</span>}
        </div>
    );
};

export default KSelectboxWithSearch;
