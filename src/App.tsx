import { Outlet, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import AuthenticatedRoute from './AuthenticatedRoute';
import MyResume from './components/user-panel/my-resume/MyResume';
import SavedJobs from './components/user-panel/my-resume/SavedJobs';
import CVBuilder from './components/user-panel/cv-builder/CVBuilder';
import CVCreation from './components/user-panel/cv-builder/CVCreation';
import JobOpportunities from './components/user-panel/job-opportunities/JobOpportunities';
import AuthContainer from './pages/auth/AuthContainer';
import EmployerPage from './pages/auth/EmployerLoginPage';
import OTPLoginPage from './pages/auth/OTPLoginPage';
import PasswordLoginPage from './pages/auth/PasswordLoginPage';
import UsernameLoginPage from './pages/auth/UsernameLoginPage';
import ChangePasswordPage from './pages/auth/forget-password/ChangePasswordPage';
import ForgetPasswordFirstPage from './pages/auth/forget-password/ForgetPasswordFirstPage';
import ForgetPasswordOtpPage from './pages/auth/forget-password/ForgetPasswordOtpPage';
import SignUpMobilePage from './pages/auth/sign-up/SignUpMobilePage';
import SignUpPasswordOtpPage from './pages/auth/sign-up/SignUpOtpPage';
import Home from './pages/user-panel/home/Home';
import UserPanelContainer from './pages/user-panel/UserPanelContainer';

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
