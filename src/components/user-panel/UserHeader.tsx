// UserHeader.tsx

import { Avatar, Dropdown, Navbar } from 'flowbite-react';
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { RootState } from '../../store';
import { authActions } from '../../store/auth';
import { removeAuthDataFromLocal } from '../../utils/authUtils';

const UserHeader: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const profilePicture = useSelector((state: RootState) => state.profile.profilePicture);

  const dropdownItems = [
    { label: 'رزومه من', href: '/my-resume' },
    { label: 'مشاغل نشان شده', href: '/saved-jobs' },
    { label: 'تنظیمات', href: '/settings' },
    { isDivider: true },
    { label: 'خروج' },
  ];

  const navLinks = [
    { label: 'فرصت های شغلی', href: '/job-opportunities' },
    { label: 'رزومه من', href: '/my-resume' },
    { label: 'رزومه ساز', href: '/cv-builder' },
  ];

  const handleDropdownItemClick = (href: string) => {
    navigate(href);
  };

  const logOut = () => {
    removeAuthDataFromLocal();
    dispatch(authActions.logOut());
  };

  return (
    <Navbar fluid className='bg-cyan-700'>
      <Navbar.Brand href='/cv-builder' className='mr-12'>
        <span className='self-center whitespace-nowrap text-xl font-semibold text-white'>کـــــــــــــــــارما</span>
      </Navbar.Brand>
      <div className='flex items-center ml-12 md:order-2'>
        <Dropdown
          arrowIcon={false}
          inline
          label={<Avatar alt='User settings' img={profilePicture || ''} rounded />}
          className='ml-12'
        >
          <Dropdown.Header>
            <span className='block text-sm'>مهدی تویسرکانی</span>
          </Dropdown.Header>
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
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse className='justify-center flex items-center'>
        <ul className='mt-4 flex flex-col md:mt-0 md:flex-row md:text-sm md:font-medium'>
          {navLinks.map((link, index) => (
            <li key={index}>
              <a
                href={link.href}
                className='block py-2 pr-4 pl-3 md:p-0 border-b border-gray-100 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:hover:bg-transparent md:dark:hover:bg-transparent md:dark:hover:text-white text-white mr-4 transition-colors duration-300 md:hover:text-gray-800'
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
