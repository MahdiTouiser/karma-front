import {
  Outlet,
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom';
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
            <Route path="cv-builder/finalize" element={<FinalizeResume />} />
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
          <Route path="admin" element={<AuthenticatedRoute component={AdminPanelContainer} />}>
            <Route path="resumes" element={<Resumes />} />
            <Route path="resumes/:id" element={<UserResumes />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;