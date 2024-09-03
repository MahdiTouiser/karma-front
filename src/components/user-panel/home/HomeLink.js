import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate } from "react-router-dom";
import { BsAirplaneEngines } from "react-icons/bs";
import { toast } from "react-toastify";
const HomeLink = (props) => {
    const navigate = useNavigate();
    const handleClick = () => {
        if (props.newTab) {
            window.open(props.href);
            return;
        }
        if (props.needActivation !== undefined &&
            props.needActivation &&
            !props.isActiveUser) {
            toast.error('ابتدا حساب کاربری خود را تکمیل کنید.');
            return;
        }
        navigate(props.href);
    };
    return (_jsx("div", { className: "p-1 my-1 min-w-fit w-1/2 flex justify-center mb-4", children: _jsxs("button", { className: "inline-flex gap-2 w-52", onClick: handleClick, children: [_jsx(BsAirplaneEngines, { size: "1.5rem" }), _jsx("span", { children: props.title })] }) }));
};
export default HomeLink;
