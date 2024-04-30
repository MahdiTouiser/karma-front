import { useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { useAppSelector } from "../../hooks/reduxHooks";
import { authActions } from "../../store/auth";
import { removeAuthDataFromLocal } from "../../utils/authUtils";
import Basket from "../shared/Basket/Basket";
import SDDropdown, { DropDownItem } from "../shared/Dropdown";
import NotifBadge from "../shared/NotifBadge";
import SDTooltip from "../shared/Tooltip";

const UserHeader: React.FC = () => {
  const name = useAppSelector((state) => state.auth.name);
  const dispatch = useDispatch();
  const location = useLocation();
  const [cartIsInBody, setCartIsInBody] = useState<boolean>(false);
  const [showBasket, setShowBasket] = useState<boolean>(false);
  const unReadMessagesCount = useAppSelector(
    (state) => state.messages.unReadCount
  );
  const ticketsCount = useAppSelector(
    (state) => state.basket.basket?.ticketsCount
  );

  useEffect(() => {
    if (
      location.pathname.includes("flights") ||
      location.pathname.includes("payment")
    ) {
      setCartIsInBody(true);
    } else {
      setCartIsInBody(false);
    }
  }, [location]);

  useEffect(() => {
    setDropdownItems([
      {
        title: "حساب کاربری",
        href: "/account",
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
              d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
            />
          </svg>
        ),
      },
      {
        title: (
          <div className="flex justify-between items-center">
            <div className="ml-3">پیام‌های من</div>
            {unReadMessagesCount > 0 && (
              <NotifBadge value={unReadMessagesCount} />
            )}
          </div>
        ),
        href: "/messages",
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
              d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
            />
          </svg>
        ),
      },
      {
        title: "خروج",
        mode: "Button",
        onClick: () => {
          removeAuthDataFromLocal();
          dispatch(authActions.logOut());
        },
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
    ]);
  }, [unReadMessagesCount, dispatch]);

  const [dropdownItems, setDropdownItems] = useState<DropDownItem[]>([]);

  return (
    <>
      <div className="bg-primary2-500 h-[60px] flex items-center w-full top-0 z-20">
        <Link to="/" className="mr-4 flex items-center">
          <h1 className="text-white font-bold text-lg hidden xs:block">
            باشگاه سقوط آزاد ایرانیان
          </h1>
        </Link>
        {location.pathname !== "/" && (
          <SDTooltip content={"بازگشت به صفحه اصلی"} trigger="hover">
            <Link to="/" className="flex items-center text-white px-8">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
                <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
              </svg>
            </Link>
          </SDTooltip>
        )}
        <div className="mr-auto md:ml-12 flex text-white">
          <button
            onMouseEnter={() => setShowBasket(true)}
            onMouseLeave={() => setShowBasket(false)}
            className="ml-1"
          >
            <div className="relative pl-1">
              {ticketsCount && ticketsCount > 0 && (
                <NotifBadge
                  value={ticketsCount}
                  className="-left-2 -top-2 absolute"
                />
              )}
            </div>
            <FaShoppingCart size="1.5rem" />
            {!cartIsInBody && showBasket && (
              <div className="hidden  md:block absolute max-h-screen overflow-auto rounded-t-lg top-[50px] left-36 z-20 w-96">
                <Basket />
              </div>
            )}
          </button>
          <SDDropdown items={dropdownItems}>
            <div className="relative pl-1">
              {unReadMessagesCount > 0 && (
                <NotifBadge
                  value={unReadMessagesCount}
                  className="-left-2 -top-2 absolute"
                />
              )}
              <span>{name}</span>
            </div>
          </SDDropdown>
        </div>
      </div>
    </>
  );
};

export default UserHeader;
