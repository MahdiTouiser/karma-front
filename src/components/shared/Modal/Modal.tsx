import React, { ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import KCard from "../Card";
import KModalBody from "./ModalBody";
import { ModalContext } from "./ModalContext";
import KModalHeader from "./ModalHeader";

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
  show: boolean;
  closeOnBackDrop?: boolean;
  containerClass?: string;
}

interface ModalBodyProps {
  containerClass?: string;
  children: ReactNode;
  closing: boolean;
}

interface BackDropProps {
  onClick: () => void;
}

const BackDrop: React.FC<BackDropProps> = (props) => {
  const handleClick = () => {
    props.onClick();
  }
  return (
    <div
      className="fixed top-0 left-0 w-full h-screen z-40 bg-black opacity-75"
      onClick={handleClick}
    />
  );
};

const ModalContainer: React.FC<ModalBodyProps> = ({ containerClass, children, closing }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => setIsVisible(true), 10);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <KCard
      className={`${containerClass} ${isVisible && !closing ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} 
      transition-all duration-300 ease-out z-50 fixed top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 
      bg-white w-4/5 xs:w-auto max-w-[95vw] max-h-[100vh] !p-0`}
    >
      {children}
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
  const [closing, setClosing] = useState<boolean>(false);

  const handleClose = () => {
    setClosing(true);
    setTimeout(() => {
      setShow(false);
      setClosing(false);
      onClose();
    }, 300);
  };

  const onBackDropClick = () => {
    if (closeOnBackDrop) {
      handleClose();
    }
  };

  useEffect(() => {
    setShow(propsShow);
  }, [propsShow]);

  return (
    <ModalContext.Provider value={{ onClose: handleClose }}>
      {show &&
        createPortal(
          <BackDrop onClick={onBackDropClick}></BackDrop>,
          document.getElementById("backdrop") as HTMLElement
        )}
      {show &&
        createPortal(
          <ModalContainer containerClass={containerClass} closing={closing}>
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
