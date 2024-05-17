import React, { ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import KCard from "../Card";
import KModalBody from "./ModalBody";
import { ModalContext } from "./ModalContext";
import KModalHeader from "./ModalHeader";

interface ModalProps {
  children: ReactNode;
  onClose: () => void;
  show: boolean;
  closeOnBackDrop?: boolean;
  containerClass?: string;
}

interface ModalBodyProps {
  containerClass?: string;
  children: ReactNode;
}

interface BackDropProps {
  onClick: () => void;
}

const BackDrop: React.FC<BackDropProps> = (props) => {
  function handleClick() {
    props.onClick();
  }
  return (
    <div
      className="fixed top-0 left-0 w-full h-screen z-40 bg-black opacity-75"
      onClick={handleClick}
    />
  );
};

const ModalContainer: React.FC<ModalBodyProps> = (props) => {
  return (
    <KCard
      className={` ${props.containerClass} !p-0 z-50 fixed  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white w-4/5 xs:w-auto max-w-[95vw] max-h-[100vh]`}
    >
      {props.children}
    </KCard>
  );
};
const KModalComponent: React.FC<ModalProps> = ({
  children,
  show: propsShow,
  closeOnBackDrop = true,
  onClose,
  containerClass,
}) => {
  const [show, setShow] = useState<boolean>(propsShow);
  function onBackDropClick() {
    if (closeOnBackDrop) {
      if (onClose) {
        onClose();
      }
      setShow(false);
    }
  }
  useEffect(() => {
    setShow(propsShow);
  }, [propsShow]);
  return (
    <ModalContext.Provider value={{ onClose: onClose }}>
      {show &&
        createPortal(
          <BackDrop onClick={onBackDropClick}></BackDrop>,
          document.getElementById("backdrop") as HTMLElement
        )}
      {show &&
        createPortal(
          <ModalContainer containerClass={containerClass}>
            {children}
          </ModalContainer>,
          document.getElementById("overlay") as HTMLElement
        )}
    </ModalContext.Provider>
  );
};
KModalComponent.displayName = "KModal";
KModalHeader.displayName = "KModal.header";
KModalBody.displayName = "KModal.body";
export const KModal = Object.assign(KModalComponent, {
  Header: KModalHeader,
  Body: KModalBody,
});
export default KModal;
