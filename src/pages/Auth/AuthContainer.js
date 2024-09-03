import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState, } from 'react';
import { Navigate, Outlet, } from 'react-router-dom';
import karmaLogo from '/src/assets/karma-logo.png';
import backgroundPhoto from '/src/assets/protection-concept-with-pawns.jpg';
import { useAppSelector } from '../../hooks/reduxHooks';
import { getAuthDataFromLocal } from '../../utils/authUtils';
const AuthContainer = () => {
    const authState = useAppSelector((state) => state.auth);
    const [wasAuthenticated, setWasAuthenticated] = useState(false);
    useEffect(() => {
        const authData = getAuthDataFromLocal();
        setWasAuthenticated(!!authData);
    }, []);
    const shouldRedirect = (authState.isAuthenticated &&
        authState.personalInformationCompleted &&
        authState.securityInformationCompleted) ||
        wasAuthenticated;
    return shouldRedirect && !authState.enteredPhone ? (_jsx(Navigate, { to: "/" })) : (_jsxs("div", { className: "flex items-center justify-center min-h-screen bg-cyan-100 lg:flex-row", children: [_jsx("div", { className: "items-center justify-center flex-1 hidden lg:flex", style: {
                    backgroundImage: `url(${backgroundPhoto})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    minHeight: '100vh',
                } }), _jsxs("div", { className: "flex flex-col items-center justify-center w-full h-full max-w-lg p-8 bg-white shadow-lg lg:h-screen", children: [_jsx("div", { className: "flex flex-col items-center justify-center w-full pb-5 border-b", children: _jsx("img", { src: karmaLogo, alt: "Karma Logo", className: "w-48 h-48" }) }), _jsx("div", { className: "flex flex-col items-center justify-center w-full mt-5", children: _jsx(Outlet, {}) })] })] }));
};
export default AuthContainer;
