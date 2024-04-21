import ResetPasswordOtpComponent from "../../auth/ResertPasswordOtpComponet";
import ResetPasswordFinalComponent from "../../auth/ResetPasswordFinalComponent";
import SDModal from "../../shared/Modal/Modal";
import { useEffect, useState } from "react";

const ChangePasswordModal: React.FC<{
  phone: string;
  show: boolean;
  onClose: () => void;
}> = ({ phone, show, onClose }) => {
  const [showModal, setShowModal] = useState<boolean>(show);
  useEffect(() => {
    setShowModal(show);
  }, [show]);
  const [step, setStep] = useState<"otp" | "final">("otp");
  function onOtpConfirm() {
    setStep("final");
    return;
  }

  function resetModal() {
    setShowModal(false);
    setStep("otp");
    onClose();
  }
  return (
    <>
      <SDModal
        show={showModal}
        closeOnBackDrop={false}
        onClose={() => {
          setShowModal(false);
        }}
        containerClass="pt-0 px-0 pb-2"
      >
        <SDModal.Header>تغییر رمز عبور</SDModal.Header>

        <div className="pt-5">
          {step === "otp" && (
            <ResetPasswordOtpComponent
              phone={phone}
              onOtpConfirm={onOtpConfirm}
            />
          )}
          {step === "final" && (
            <ResetPasswordFinalComponent onResetPassword={resetModal} />
          )}
        </div>
      </SDModal>
    </>
  );
};
export default ChangePasswordModal;
