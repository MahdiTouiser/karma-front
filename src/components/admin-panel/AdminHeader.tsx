import { useDispatch } from "react-redux";
import { useAppSelector } from "../../hooks/reduxHooks";
import { authActions } from "../../store/auth";
import { removeAuthDataFromLocal } from "../../utils/authUtils";
import KDropdown, { DropDownItem } from "../shared/Dropdown";
import HamburgerButton from "../shared/HumbergerButtom";
import { ShellElement } from "../shared/PanelShell";

const AdminHeader: React.FC<ShellElement> = (props) => {
  const name = useAppSelector((state) => state.auth.name);
  const dispatch = useDispatch();
  const dropdownItems: DropDownItem[] = [
    {
      title: "خروج",
      mode: "Button",
      onClick: logOut,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
          />
        </svg>
      ),
    },
  ];

  function logOut() {
    removeAuthDataFromLocal();
    dispatch(authActions.logOut());
  }
  return (
    <div className="bg-blue-900 h-[50px] flex items-center">
      <HamburgerButton {...props} className="stroke-white"></HamburgerButton>
      <div className="mr-auto md:ml-12">
        <KDropdown items={dropdownItems} chevronClassName="stroke-white">
          <span className="text-white">{name}</span>
        </KDropdown>
      </div>
    </div>
  );
};

export default AdminHeader;
