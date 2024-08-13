import React, { useState } from 'react';

import {
  Avatar,
  Dropdown,
  Navbar,
} from 'flowbite-react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch } from '../../hooks/reduxHooks';
import { RootState } from '../../store';
import { authActions } from '../../store/auth';
import { clearProfilePicture } from '../../store/profileSlice';
import { removeAuthDataFromLocal } from '../../utils/authUtils';

const UserHeader: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const profilePicture = useSelector((state: RootState) => state.profile.profilePicture);
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

  const handleDropdownItemClick = (href: string) => {
    navigate(href);
    setMobileMenuOpen(false);
  };

  const logOut = () => {
    removeAuthDataFromLocal();
    dispatch(authActions.logOut());
    dispatch(clearProfilePicture());
  };

  return (
    <Navbar fluid className='bg-cyan-700'>
      <Navbar.Brand href='/cv-builder' className='mr-12'>
        <span className='self-center whitespace-nowrap text-xl font-semibold text-white'>کـــــــــــــــــارما</span>
      </Navbar.Brand>
      <div className='flex items-center md:order-2'>
        <Dropdown
          arrowIcon={false}
          inline
          label={<Avatar alt='User settings' img={profilePicture || ''} rounded />}
          className='ml-12'
        >
          {dropdownItems.map((item, index) => {
            if (item.isDivider) {
              return <Dropdown.Divider key={index} />;
            } else {
              return (
                <Dropdown.Item
                  key={index}
                  onClick={item.label === 'خروج' ? logOut : () => handleDropdownItemClick(item.href as string)}
                >
                  {item.label}
                </Dropdown.Item>
              );
            }
          })}
        </Dropdown>

        <button
          onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
          className='p-2 text-2xl md:hidden text-white focus:outline-none'
        >
          {isMobileMenuOpen ? (
            <span>&times;</span>
          ) : (
            <span>&#9776;</span>
          )}
        </button>
      </div>
      <Navbar.Collapse className={`justify-center flex items-center ${isMobileMenuOpen ? 'block' : 'hidden'} md:block`}>
        <ul className='mt-4 flex flex-col md:mt-0 md:flex-row md:text-sm text-center'>
          {navLinks.map((link, index) => (
            <li key={index}>
              <a
                href={link.href}
                className='block py-2 pr-4 pl-3 text-lg sm:text-base md:text-base lg:text-lg hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:hover:bg-transparent md:dark:hover:bg-transparent md:dark:hover:text-white text-white transition-colors duration-300'
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default UserHeader;