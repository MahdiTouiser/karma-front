import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Avatar, Dropdown, Navbar, } from 'flowbite-react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { authActions } from '../../store/auth';
import { clearProfilePicture } from '../../store/profileSlice';
import { removeAuthDataFromLocal } from '../../utils/authUtils';
const UserHeader = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const profilePicture = useSelector((state) => state.profile.profilePicture);
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    const dropdownItems = [
        { label: 'رزومه من', href: '/my-resume' },
        { isDivider: true },
        { label: 'خروج' },
    ];
    const navLinks = [
        { label: 'رزومه من', href: '/my-resume' },
        { label: 'رزومه ساز', href: '/cv-builder' },
    ];
    const handleDropdownItemClick = (href) => {
        navigate(href);
        setMobileMenuOpen(false);
    };
    const logOut = () => {
        removeAuthDataFromLocal();
        dispatch(authActions.logOut());
        dispatch(clearProfilePicture());
    };
    return (_jsxs(Navbar, { fluid: true, className: 'bg-cyan-700', children: [_jsx(Navbar.Brand, { href: '/cv-builder', className: 'mr-12', children: _jsx("span", { className: 'self-center whitespace-nowrap text-xl font-semibold text-white', children: "\u06A9\u0640\u0640\u0640\u0640\u0640\u0640\u0640\u0640\u0640\u0640\u0640\u0640\u0640\u0640\u0640\u0640\u0640\u0627\u0631\u0645\u0627" }) }), _jsxs("div", { className: 'flex items-center md:order-2', children: [_jsx(Dropdown, { arrowIcon: false, inline: true, label: _jsx(Avatar, { alt: 'User settings', img: profilePicture || '', rounded: true }), className: 'ml-12', children: dropdownItems.map((item, index) => {
                            if (item.isDivider) {
                                return _jsx(Dropdown.Divider, {}, index);
                            }
                            else {
                                return (_jsx(Dropdown.Item, { onClick: item.label === 'خروج' ? logOut : () => handleDropdownItemClick(item.href), children: item.label }, index));
                            }
                        }) }), _jsx("button", { onClick: () => setMobileMenuOpen(!isMobileMenuOpen), className: 'p-2 text-2xl md:hidden text-white focus:outline-none', children: isMobileMenuOpen ? (_jsx("span", { children: "\u00D7" })) : (_jsx("span", { children: "\u2630" })) })] }), _jsx(Navbar.Collapse, { className: `justify-center flex items-center ${isMobileMenuOpen ? 'block' : 'hidden'} md:block`, children: _jsx("ul", { className: 'mt-4 flex flex-col md:mt-0 md:flex-row md:text-sm text-center', children: navLinks.map((link, index) => (_jsx("li", { children: _jsx("a", { href: link.href, className: 'block py-2 pr-4 pl-3 text-lg sm:text-base md:text-base lg:text-lg hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:hover:bg-transparent md:dark:hover:bg-transparent md:dark:hover:text-white text-white transition-colors duration-300', children: link.label }) }, index))) }) })] }));
};
export default UserHeader;
