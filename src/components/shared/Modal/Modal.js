import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState, } from 'react';
import { createPortal } from 'react-dom';
import KCard from '../Card';
import KModalBody from './ModalBody';
import { ModalContext } from './ModalContext';
import KModalHeader from './ModalHeader';
const BackDrop = (props) => {
    const handleClick = () => {
        props.onClick();
    };
    return (_jsx("div", { className: "fixed top-0 left-0 z-40 w-full h-screen bg-black opacity-75", onClick: handleClick }));
};
const ModalContainer = ({ children, closing }) => {
    const [isVisible, setIsVisible] = useState(false);
    useEffect(() => {
        const timeoutId = setTimeout(() => setIsVisible(true), 10);
        return () => clearTimeout(timeoutId);
    }, []);
    return (_jsx(KCard, { className: `${isVisible && !closing ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} 
      transition-all duration-300 ease-out z-50 fixed left-1/2 -translate-x-1/2 
      bg-white w-full sm:w-3/4 md:w-2/5 lg:w-1/3 max-w-[95vw] max-h-screen !p-0 
      top-1/4  md:!max-w-[70vw] lg:!max-w-[60vw] !pb-2`, children: children }));
};
const KModalComponent = ({ children, show: propsShow, closeOnBackDrop = true, onClose, containerClass, }) => {
    const [show, setShow] = useState(propsShow);
    const [closing, setClosing] = useState(false);
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
    return (_jsxs(ModalContext.Provider, { value: { onClose: handleClose }, children: [show &&
                createPortal(_jsx(BackDrop, { onClick: onBackDropClick }), document.getElementById("backdrop")), show &&
                createPortal(_jsx(ModalContainer, { containerClass: containerClass, closing: closing, children: children }), document.getElementById("overlay"))] }));
};
KModalComponent.displayName = "KModal";
KModalHeader.displayName = "KModal.header";
KModalBody.displayName = "KModal.body";
export const KModal = Object.assign(KModalComponent, {
    Header: KModalHeader,
    Body: KModalBody,
});
export default KModal;
