import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../hooks/reduxHooks";
import { getAuthDataFromLocal } from "../../utils/authUtils";

export default function AuthContainer() {
  const authState = useAppSelector((state) => state.auth);
  const [wasAuthenticated, setWasAuthenticated] = useState<boolean>(false);
  useEffect(() => {
    const authData = getAuthDataFromLocal();
    setWasAuthenticated(
      !!authData &&
      authData.personalInformationCompleted &&
      authData.securityInformationCompleted
    );
  }, []);
  return ((authState.isAuthenticated &&
    authState.personalInformationCompleted &&
    authState.securityInformationCompleted) ||
    wasAuthenticated) &&
    !authState.enteredPhone ? (
    <Navigate to="/" />
  ) : (
    <div className="container px-1 m-auto py-1 flex justify-center items-center min-h-full">
      <div className="w-full sm:w-5/6 flex flex-col items-center max-w-lg rounded-md border">
        <div className="pt-5 border-b w-11/12 flex justify-center flex-col items-center">
          <h1 className="font-bold text-xl  text-center  my-4">
            کارما , جایی برای پیدا کردن کار
          </h1>
        </div>
        <Outlet></Outlet>
      </div>
    </div>
  );
}
