
import { useNavigate } from "react-router-dom";
import ResetPasswordFinalComponent from "../../../components/auth/ResetPasswordFinalComponent";

const ChangePasswordPage: React.FC = () => {
  const navigate = useNavigate();

  function onResetPassword() {
    navigate("/");
  }

  return (
    <section className="w-full">
      <ResetPasswordFinalComponent onResetPassword={onResetPassword} />
    </section>
  );
};
export default ChangePasswordPage;
