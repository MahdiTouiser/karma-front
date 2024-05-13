import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { authActions } from "../../store/auth";
import { removeAuthDataFromLocal } from "../../utils/authUtils";

const UserHeader: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const dropdownItems = [
    { label: "داشبورد", href: "dashboard" },
    { label: "تنظیمات", href: "settings" },
    { isDivider: true },
    { label: "خروج" },
  ];

  const navLinks = [
    { label: "فرصت های شغلی", href: "job-opportunities" },
    { label: "رزومه من", href: "my-resume" },
  ];

  const handleDropdownItemClick = (href: string) => {
    navigate(`/${href}`);
  };

  const logOut = () => {
    removeAuthDataFromLocal();
    dispatch(authActions.logOut());
  }

  return (
    <>
      <Navbar fluid className="bg-primary2">
        <Navbar.Brand href="/" className="mr-12">
          <span className="self-center whitespace-nowrap text-xl font-semibold text-white">کـــــــارما</span>
        </Navbar.Brand>
        <div className="flex ml-12 md:order-2">
          <Dropdown
            arrowIcon={false}
            inline
            label={<Avatar alt="User settings" rounded />}
            className="ml-12"
          >
            <Dropdown.Header>
              <span className="block text-sm">مهدی تویسرکانی</span>
            </Dropdown.Header>
            {dropdownItems.map((item, index) => {
              if (item.isDivider) {
                return <Dropdown.Divider key={index} />;
              } else {
                return (
                  <Dropdown.Item
                    key={index}
                    onClick={item.label === "خروج" ? logOut : () => handleDropdownItemClick(item.href as string)}
                  >
                    {item.label}
                  </Dropdown.Item>
                );
              }
            })}
          </Dropdown>
          <Navbar.Toggle />
        </div>
        <Navbar.Collapse className="justify-center">
          {navLinks.map((link, index) => (
            <Navbar.Link key={index} href={link.href} className="text-white mr-4">
              {link.label}
            </Navbar.Link>
          ))}
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default UserHeader;
