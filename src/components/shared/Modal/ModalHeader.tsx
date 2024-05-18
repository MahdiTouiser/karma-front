import React from "react";
import { useModalContext } from "./ModalContext";

interface ModalHeaderProps {
  children: React.ReactNode;
  color?: "primary" | "warning";
  withClose?: boolean;
}

const KModalHeader: React.FC<ModalHeaderProps> = ({
  children,
  color = "primary",
  withClose = true,
}) => {
  const { onClose } = useModalContext();
  const classNames = {
    primary: "bg-primary2-800",
    warning: "bg-yellow-300",
  };

  return (
    <div
      className={`border-b text-lg flex justify-between px-6 py-4 text-white rounded-t-md -m-[1px] ${classNames[color]}`}
    >
      <div>{children}</div>
      {withClose && (
        <button type="button" onClick={onClose}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-7 h-7 stroke-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
    </div>
  );
};

export default KModalHeader;
