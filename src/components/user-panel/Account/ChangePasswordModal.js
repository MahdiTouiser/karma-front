import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import ResetPasswordFinalComponent from "../../auth/ResetPasswordFinalComponent";
import ResetPasswordOtpComponent from "../../auth/ResetPasswordOtp";
import KModal from "../../shared/Modal/Modal";
const ChangePasswordModal = ({ phone, show, onClose }) => {
    const [showModal, setShowModal] = useState(show);
    useEffect(() => {
        setShowModal(show);
    }, [show]);
    const [step, setStep] = useState("otp");
    function onOtpConfirm() {
        setStep("final");
        return;
    }
    function resetModal() {
        setShowModal(false);
        setStep("otp");
        onClose();
    }
    return (_jsx(_Fragment, { children: _jsxs(KModal, { show: showModal, closeOnBackDrop: false, onClose: () => {
                setShowModal(false);
            }, containerClass: "pt-0 px-0 pb-2", children: [_jsx(KModal.Header, { children: "\u062A\u063A\u06CC\u06CC\u0631 \u0631\u0645\u0632 \u0639\u0628\u0648\u0631" }), _jsxs("div", { className: "pt-5", children: [step === "otp" && (_jsx(ResetPasswordOtpComponent, { phone: phone, onOtpConfirm: onOtpConfirm })), step === "final" && (_jsx(ResetPasswordFinalComponent, { onResetPassword: resetModal }))] })] }) }));
};
export default ChangePasswordModal;
