import { useEffect } from 'react';

import { Outlet } from 'react-router-dom';

import UserHeader from '../../components/user-panel/UserHeader';
import {
  useAppDispatch,
  useAppSelector,
} from '../../hooks/reduxHooks';

const UserPanelContainer: React.FC = () => {
  const dispatch = useAppDispatch();
  const generalInfoSet = useAppSelector((state) => state.auth.generalInfoSet);
  useEffect(() => {
    document.documentElement.style.fontSize = "16px";
    let interval: number;

    return () => clearInterval(interval);
  }, [dispatch, generalInfoSet]);
  return (
    <div className="flex flex-col w-screen h-screen bg-gray-100">
      <UserHeader></UserHeader>
      <div className="relative flex flex-1 w-full overflow-hidden ">
        <div
          id="userMainContainer"
          className="flex-auto overflow-auto ltr scroll-smooth"
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
