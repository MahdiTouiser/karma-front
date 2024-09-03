import { jsx as _jsx } from "react/jsx-runtime";
import { useNavigate } from "react-router-dom";
import ResetPasswordFinalComponent from "../../../components/auth/ResetPasswordFinalComponent";
const ChangePasswordPage = () => {
    const navigate = useNavigate();
    function onResetPassword() {
        navigate("/");
    }
    return (_jsx("section", { className: "w-full", children: _jsx(ResetPasswordFinalComponent, { onResetPassword: onResetPassword }) }));
};
export default ChangePasswordPage;
