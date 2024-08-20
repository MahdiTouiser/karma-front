import {
  useEffect,
  useState,
} from 'react';

import karmaLogo from '/src/assets/karma-logo.png';
import backgroundPhoto from '/src/assets/protection-concept-with-pawns.jpg';
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

  const shouldRedirect =
    (authState.isAuthenticated &&
      authState.personalInformationCompleted &&
      authState.securityInformationCompleted) ||
    wasAuthenticated;

  return shouldRedirect && !authState.enteredPhone ? (
    <Navigate to="/" />
  ) : (
    <div className="flex items-center justify-center min-h-screen bg-cyan-100 lg:flex-row">
      <div
        className="items-center justify-center flex-1 hidden lg:flex"
        style={{
          backgroundImage: `url(${backgroundPhoto})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          minHeight: '100vh',
        }}
      >
        <div className="p-8 text-center bg-black bg-opacity-50 rounded">
          <h1 className="text-4xl font-bold text-white">کارما</h1>
          <p className="mt-2 text-xl text-gray-200">
            استخدام و ساختن مسیر شغلی مطلوب برای کارجو
          </p>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center w-full h-full max-w-lg p-8 bg-white shadow-lg lg:h-screen">
        <div className="flex flex-col items-center justify-center w-full pb-5 border-b">
          <img src={karmaLogo} alt="Karma Logo" className="w-48 h-48" />
        </div>
        <div className="flex flex-col items-center justify-center w-full mt-5">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthContainer;
