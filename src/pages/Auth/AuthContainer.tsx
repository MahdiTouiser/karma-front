import { useEffect, useState } from "react";
import { Link, Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../hooks/reduxHooks";
import { getAuthDataFromLocal } from "../../utils/authUtils";

export default function AuthContainer() {

  const authState = useAppSelector((state) => state.auth);
  const [wasAuthenticated, setWasAuthenticated] = useState<boolean>(false);
  const [isJobseekerMode, setIsJobseekerMode] = useState<boolean>(true);

  useEffect(() => {
    const authData = getAuthDataFromLocal();
    setWasAuthenticated(
      !!authData
    );
  }, []);

  const handleModeToggle = () => {
    setIsJobseekerMode(!isJobseekerMode);
  };

  return ((authState.isAuthenticated &&
    authState.personalInformationCompleted &&
    authState.securityInformationCompleted) ||
    wasAuthenticated) &&
    !authState.enteredPhone ? (
    <Navigate to="/" />
  ) : (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center">
      <div className="container px-1 m-auto py-1 flex justify-center items-center">
        <div className="w-full sm:w-5/6 flex flex-col items-center max-w-lg rounded-md border shadow-lg bg-white">
          <div className="pt-5 border-b w-11/12 flex justify-center flex-col items-center">
            <h1 className="font-bold text-xl text-center my-4">
              کارما , جایی برای پیدا کردن کار
            </h1>
          </div>
          <Outlet />
          <div className="bg-gray-200 w-full py-2 flex justify-center hover:bg-gray-200 transition duration-300 ease-in-out">
            <Link
              to={isJobseekerMode ? "/auth/employer" : "/auth"}
              onClick={handleModeToggle}
              className="flex items-center justify-center w-full"
            >
              <h6 className="text-blue-500">
                {isJobseekerMode ? "کارفرما هستید ؟" : "کارجو هستید ؟"}
              </h6>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
