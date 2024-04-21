import { Outlet } from "react-router-dom";
import PanelShell from "../../components/shared/PanelShell";
import AdminHeader from "../../components/adminPanel/AdminHeader";
import AdminSideber from "../../components/adminPanel/AdminSidebar";
import { useEffect } from "react";

const AdminPanelContainer: React.FC = () => {
  useEffect(()=>{
    document.documentElement.style.fontSize = '15px';
  },[])
  return (
    <PanelShell
      header={AdminHeader}
      sidebar={AdminSideber}
      mainContinerClassName="bg-slate-100 p-2  xs:p-6"
      sidBarContainerClassName="bg-white"
    >
      <Outlet></Outlet>
    </PanelShell>
  );
};

export default AdminPanelContainer;
