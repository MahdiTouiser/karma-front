import { useEffect, useState } from "react";
import ResetPasswordFinalComponent from "../../auth/ResetPasswordFinalComponent";
import ResetPasswordOtpComponent from "../../auth/ResetPasswordOtp";
import KModal from "../../shared/Modal/Modal";

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
      <KModal
        show={showModal}
        closeOnBackDrop={false}
        onClose={() => {
          setShowModal(false);
        }}
        containerClass="pt-0 px-0 pb-2"
      >
        <KModal.Header>تغییر رمز عبور</KModal.Header>

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
      </KModal>
    </>
  );
};
export default ChangePasswordModal;
