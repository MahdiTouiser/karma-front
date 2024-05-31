import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ResetPasswordOtpComponent from "../../../components/auth/ResetPasswordOtp";
import BackButton from "../../../components/shared/BackButton";
import { useAppSelector } from "../../../hooks/reduxHooks";

const ForgetPasswordOtpPage: React.FC = () => {
  const phone = useAppSelector((state) => state.auth.enteredPhone);
  const navigate = useNavigate();

  useEffect(() => {
    if (!phone) {
      navigate("/auth/forget-password");
    }
  }, [phone, navigate]);

  function onOtpConfirm() {
    navigate("/auth/forget-password/change");
  }

  return (
    <section className="w-full">
      <BackButton />
      <ResetPasswordOtpComponent phone={phone} onOtpConfirm={onOtpConfirm} />
    </section>
  );
};

export default ForgetPasswordOtpPage;
