import {
  useEffect,
  useState,
} from 'react';

import karmaLogo from '/src/assets/karma-logo.png';
import {
  Navigate,
  Outlet,
} from 'react-router-dom';

import { useAppSelector } from '../../hooks/reduxHooks';
import { getAuthDataFromLocal } from '../../utils/authUtils';

const AuthContainer = () => {
  const authState = useAppSelector((state) => state.auth);
  const [wasAuthenticated, setWasAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const authData = getAuthDataFromLocal();
    setWasAuthenticated(!!authData);
  }, []);

  const shouldRedirect = (authState.isAuthenticated &&
    authState.personalInformationCompleted &&
    authState.securityInformationCompleted) || wasAuthenticated;

  return (
    shouldRedirect && !authState.enteredPhone ? (
      <Navigate to="/" />
    ) : (
      <div className="bg-cyan-100 h-screen flex justify-center items-center lg:flex-row">
        <div className="hidden lg:flex flex-1 justify-center items-center h-screen">
          <div className="text-center">
            <h1 className="text-4xl font-bold">کارما</h1>
            <p className="mt-2 text-xl">
              استخدام و ساختن مسیر شغلی مطلوب برای کارجو
            </p>
          </div>
        </div>

        <div className="w-full flex flex-col items-center max-w-lg shadow-lg bg-white m-0 lg:mx-32 justify-center h-full lg:h-screen">
          <div className="pt-5 border-b w-11/12 flex justify-center flex-col items-center">
            <span className="w-48 h-48 flex justify-center items-center">
              <img src={karmaLogo} alt="Karma Logo" />
            </span>
          </div>
          <div className="flex flex-col items-center justify-center w-full mt-5">
            <Outlet />
          </div>
        </div>
      </div>
    )
  );
}

export default AuthContainer;
