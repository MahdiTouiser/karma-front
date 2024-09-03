import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Outlet, Route, BrowserRouter as Router, Routes, } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import AuthenticatedRoute from './AuthenticatedRoute';
import Resumes from './components/admin-panel/resumes/Resumes';
import UserResumes from './components/admin-panel/resumes/UserResumes';
import CVBuilder from './components/user-panel/cv-builder/CVBuilder';
import CVCreation from './components/user-panel/cv-builder/CVCreation';
import FinalizeResume from './components/user-panel/cv-builder/FinalizeResume';
import JobOpportunities from './components/user-panel/job-opportunities/JobOpportunities';
import MyResume from './components/user-panel/my-resume/MyResume'; // Import MyResume component
import SavedJobs from './components/user-panel/my-resume/SavedJobs';
import AdminPanelContainer from './pages/admin-panel/AdminPanelContainer';
import AuthContainer from './pages/auth/AuthContainer';
import EmployerPage from './pages/auth/EmployerLoginPage';
import ChangePasswordPage from './pages/auth/forget-password/ChangePasswordPage';
import ForgetPasswordFirstPage from './pages/auth/forget-password/ForgetPasswordFirstPage';
import ForgetPasswordOtpPage from './pages/auth/forget-password/ForgetPasswordOtpPage';
import OTPLoginPage from './pages/auth/OTPLoginPage';
import PasswordLoginPage from './pages/auth/PasswordLoginPage';
import SignUpMobilePage from './pages/auth/sign-up/SignUpMobilePage';
import SignUpPasswordOtpPage from './pages/auth/sign-up/SignUpOtpPage';
import UsernameLoginPage from './pages/auth/UsernameLoginPage';
import Home from './pages/user-panel/home/Home';
import UserPanelContainer from './pages/user-panel/UserPanelContainer';
const App = () => {
    return (_jsxs(_Fragment, { children: [_jsx(ToastContainer, { rtl: true, theme: "colored", position: "top-left", icon: false, closeButton: false, autoClose: 2000 }), _jsx(Router, { children: _jsxs(Routes, { children: [_jsxs(Route, { path: "/", element: _jsx(AuthenticatedRoute, { component: UserPanelContainer }), children: [_jsx(Route, { index: true, element: _jsx(Home, {}) }), _jsx(Route, { path: "my-resume", element: _jsx(MyResume, {}) }), _jsx(Route, { path: "cv-builder", element: _jsx(CVBuilder, {}) }), _jsx(Route, { path: "cv-builder/create", element: _jsx(CVCreation, {}) }), _jsx(Route, { path: "cv-builder/finalize", element: _jsx(FinalizeResume, {}) }), _jsx(Route, { path: "saved-jobs", element: _jsx(SavedJobs, {}) }), _jsx(Route, { path: "job-opportunities", element: _jsx(JobOpportunities, {}) })] }), _jsxs(Route, { path: "auth", element: _jsx(AuthContainer, {}), children: [_jsx(Route, { path: "employer", element: _jsx(EmployerPage, {}) }), _jsx(Route, { index: true, element: _jsx(UsernameLoginPage, {}) }), _jsx(Route, { path: "otp", element: _jsx(OTPLoginPage, {}) }), _jsx(Route, { path: "password", element: _jsx(PasswordLoginPage, {}) }), _jsxs(Route, { path: "forget-password", element: _jsx(Outlet, {}), children: [_jsx(Route, { index: true, element: _jsx(ForgetPasswordFirstPage, {}) }), _jsx(Route, { path: "otp", element: _jsx(ForgetPasswordOtpPage, {}) }), _jsx(Route, { path: "change", element: _jsx(ChangePasswordPage, {}) })] }), _jsxs(Route, { path: "signup", element: _jsx(Outlet, {}), children: [_jsx(Route, { index: true, element: _jsx(SignUpMobilePage, {}) }), _jsx(Route, { path: "otp", element: _jsx(SignUpPasswordOtpPage, {}) })] })] }), _jsxs(Route, { path: "admin", element: _jsx(AuthenticatedRoute, { component: AdminPanelContainer }), children: [_jsx(Route, { path: "resumes", element: _jsx(Resumes, {}) }), _jsx(Route, { path: "resumes/:id", element: _jsx(UserResumes, {}) })] })] }) })] }));
};
export default App;
