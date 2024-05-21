import { Outlet, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import AuthenticatedRoute from './AuthenticatedRoute';
import CVBuilder from './components/userpanel/CVBuilder/CVBuilder';
import CVCreation from './components/userpanel/CVBuilder/CVCreation';
import JobOpportunities from './components/userpanel/JobOpportunities.tsx/JobOpportunities';
import MyResume from './components/userpanel/MyResume/MyResume';
import SavedJobs from './components/userpanel/MyResume/SavedJobs';
import AuthContainer from './pages/Auth/AuthContainer';
import EmployerPage from './pages/Auth/EmployerLoginPage';
import OTPLoginPage from './pages/Auth/OTPLoginPage';
import PasswordLoginPage from './pages/Auth/PasswordLoginPage';
import UsernameLoginPage from './pages/Auth/UsernameLoginPage';
import ChangePasswordPage from './pages/Auth/forgetPassword/ChangePasswordPage';
import ForgetPasswordFirstPage from './pages/Auth/forgetPassword/ForgetPasswordFirstPage';
import ForgetPasswordOtpPage from './pages/Auth/forgetPassword/ForgetPasswordOtpPage';
import SignUpMobilePage from './pages/Auth/signUp/SignUpMobilePage';
import SignUpPasswordOtpPage from './pages/Auth/signUp/SignUpOtpPage';
import Home from './pages/userPanel/Home/Home';
import UserPanelContainer from './pages/userPanel/UserPanelContainer';

const App = () => {
  return (
    <>
      <ToastContainer rtl theme="colored" position="top-left" icon={false} closeButton={false} autoClose={2000} />
      <Router>
        <Routes>
          <Route path="/" element={<AuthenticatedRoute component={UserPanelContainer} />}>
            <Route index element={<Home />} />
            <Route path="my-resume" element={<MyResume />} />
            <Route path="cv-builder" element={<CVBuilder />} />
            <Route path="cv-builder/create" element={<CVCreation />} />
            <Route path="saved-jobs" element={<SavedJobs />} />
            <Route path="job-opportunities" element={<JobOpportunities />} />
          </Route>
          <Route path="auth" element={<AuthContainer />}>
            <Route path="employer" element={<EmployerPage />} />
            <Route index element={<UsernameLoginPage />} />
            <Route path="otp" element={<OTPLoginPage />} />
            <Route path="password" element={<PasswordLoginPage />} />
            <Route path="forget-password" element={<Outlet />}>
              <Route index element={<ForgetPasswordFirstPage />} />
              <Route path="otp" element={<ForgetPasswordOtpPage />} />
              <Route path="change" element={<ChangePasswordPage />} />
            </Route>
            <Route path="signup" element={<Outlet />}>
              <Route index element={<SignUpMobilePage />} />
              <Route path="otp" element={<SignUpPasswordOtpPage />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
