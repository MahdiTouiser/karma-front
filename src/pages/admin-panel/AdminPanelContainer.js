import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import AdminHeader from "../../components/admin-panel/AdminHeader";
import PanelShell from "../../components/shared/PanelShell";
const AdminPanelContainer = () => {
    useEffect(() => {
        document.documentElement.style.fontSize = '15px';
    }, []);
    return (_jsx(PanelShell, { header: AdminHeader, mainContainerClassName: "bg-slate-100 p-2  xs:p-6", sideBarContainerClassName: "bg-white", children: _jsx(Outlet, {}) }));
};
export default AdminPanelContainer;
