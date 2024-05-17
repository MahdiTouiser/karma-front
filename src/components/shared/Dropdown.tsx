/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { MouseEvent, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

interface KDropdownProps {
  items: DropDownItem[];
  children: React.ReactNode;
  buttonClassName?: string;
  chevronClassName?: string;
  withChevron?: boolean;
}

const KDropdown: React.FC<KDropdownProps> = ({
  items,
  children,
  buttonClassName,
  chevronClassName,
  withChevron = true,
}) => {
  const [show, setShow] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  function toggleShow() {
    // event.stopPropagation();
    setShow((show) => !show);
  }

  useEffect(() => {
    function handleClickOutside(event: Event) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !buttonRef.current?.contains(event.target as Node)
      ) {
        setShow(false);
      }
    }

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    function calculateMenuRect() {
      if (menuRef.current && containerRef.current) {
        const list = menuRef.current.querySelector("ul");
        const height = list!.offsetHeight;
        menuRef.current.style.height = `${height}px`;
        const containerRect = containerRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const offset = 40;
        let topOffset = containerRect.top + offset;
        const isOverflow = topOffset + height > windowHeight;
        if (isOverflow) {
          topOffset = containerRect.top - height + offset;
        }
        menuRef.current.style.top = `${topOffset}px`;
        menuRef.current.style.left = `${containerRect.left}px`;
      }
    }

    if (show) {
      calculateMenuRect();
    }
  }, [show]);

  return (
    <div className="relative" ref={containerRef}>
      <button
        onClick={toggleShow}
        id="dropdownDividerButton"
        data-dropdown-toggle="dropdownDivider"
        className={`${buttonClassName || ""
          } font-medium rounded-lg  px-4 py-2.5 text-center inline-flex items-center  h-[40px]`}
        type="button"
        ref={buttonRef}
      >
        {children}
        {withChevron && (
          <svg
            className={`${chevronClassName || ""} w-4 h-4 mr-2`}
            aria-hidden="true"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            ></path>
          </svg>
        )}
      </button>

      <div
        id="dropdownDivider"
        className={`${!show && "hidden"
          } z-20 fixed top-[43px] left-0 inset-y-1 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600 overflow-y-auto`}
        ref={menuRef}
      >
        <ul
          className="py-2 text-sm rounded-sm text-gray-700 dark:text-gray-200"
          aria-labelledby="dropdownDividerButton"
        >
          {items.map((item, index) => {
            return (
              <KDropDownItem
                key={index}
                handleLiClick={() => setShow(false)}
                {...item}
              ></KDropDownItem>
            );
          })}

          {/* Add more menu items dynamically */}
        </ul>
      </div>
    </div>
  );
};

export interface DropDownItem {
  onClick?: (event: MouseEvent<HTMLElement>) => void;
  mode?: "Link" | "Button";
  href?: string;
  title: React.ReactNode;
  icon?: React.ReactNode;
  disabled?: boolean;
}

interface KDropdownItemProps extends DropDownItem {
  handleLiClick?: (event: MouseEvent<HTMLLIElement>) => void;
}

export const KDropDownItem: React.FC<KDropdownItemProps> = ({
  handleLiClick,
  onClick,
  mode = "Link",
  href,
  title,
  icon,
  disabled = false,
}) => {
  return (
    <li
      onClick={handleLiClick}
      className={`${!disabled
          ? " hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
          : "opacity-70"
        } block  `}
    >
      {mode === "Link" ? (
        <Link
          to={href || ""}
          onClick={(event) => disabled && event.preventDefault()}
        >
          <div className="flex gap-2 items-center px-4 py-3">
            {icon ? icon : ""}
            {title}
          </div>
        </Link>
      ) : (
        <button
          className="flex gap-2 items-center px-4 py-3 w-full"
          onClick={onClick}
          disabled={disabled}
        >
          {icon ? icon : ""}
          {title}
        </button>
      )}
    </li>
  );
};

export default KDropdown;
