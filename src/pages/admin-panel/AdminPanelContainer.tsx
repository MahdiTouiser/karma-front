import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import AdminHeader from "../../components/admin-panel/AdminHeader";
import PanelShell from "../../components/shared/PanelShell";

const AdminPanelContainer: React.FC = () => {
    useEffect(() => {
        document.documentElement.style.fontSize = '15px';
    }, [])
    return (
        <PanelShell
            header={AdminHeader}
            mainContainerClassName="bg-slate-100 p-2  xs:p-6"
            sideBarContainerClassName="bg-white"
        >
            <Outlet></Outlet>
        </PanelShell>
    );
};

export default AdminPanelContainer;
