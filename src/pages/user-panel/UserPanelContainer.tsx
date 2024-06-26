import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import UserHeader from "../../components/user-panel/UserHeader";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { fetchMessages } from "../../store/messages";

const UserPanelContainer: React.FC = () => {
  const dispatch = useAppDispatch();
  const generalInfoSet = useAppSelector((state) => state.auth.generalInfoSet);
  useEffect(() => {
    document.documentElement.style.fontSize = "16px";
    let interval: number;
    if (generalInfoSet) {
      dispatch(fetchMessages({}));
      interval = setInterval(() => { 
        dispatch(fetchMessages({}));
      }, 30000);
    }
    return () => clearInterval(interval);
  }, [dispatch, generalInfoSet]);
  return (
    <div className="w-screen h-screen flex flex-col bg-gray-100">
      <UserHeader></UserHeader>
      <div className=" w-full flex flex-1 relative overflow-hidden">
        <div
          id="userMainContainer"
          className="flex-auto  overflow-auto ltr scroll-smooth"
        >
          <div className="rtl">
            <Outlet></Outlet>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPanelContainer;
