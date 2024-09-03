import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import UserHeader from "../../components/user-panel/UserHeader";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { fetchMessages } from "../../store/messages";
const UserPanelContainer = () => {
    const dispatch = useAppDispatch();
    const generalInfoSet = useAppSelector((state) => state.auth.generalInfoSet);
    useEffect(() => {
        document.documentElement.style.fontSize = "16px";
        let interval;
        if (generalInfoSet) {
            dispatch(fetchMessages({}));
            interval = setInterval(() => {
                dispatch(fetchMessages({}));
            }, 30000);
        }
        return () => clearInterval(interval);
    }, [dispatch, generalInfoSet]);
    return (_jsxs("div", { className: "w-screen h-screen flex flex-col bg-gray-100", children: [_jsx(UserHeader, {}), _jsx("div", { className: " w-full flex flex-1 relative overflow-hidden", children: _jsx("div", { id: "userMainContainer", className: "flex-auto  overflow-auto ltr scroll-smooth", children: _jsx("div", { className: "rtl", children: _jsx(Outlet, {}) }) }) })] }));
};
export default UserPanelContainer;
