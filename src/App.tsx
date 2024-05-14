import { Outlet, Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import AuthenticatedRoute from './AuthenticatedRoute'
import JobOpportunities from './components/userpanel/MyResume/JobOpportunities'
import MyResume from './components/userpanel/MyResume/MyResume'
import AuthContainer from './pages/Auth/AuthContainer'
import EmployerPage from './pages/Auth/EmployerLoginPage'
import OTPLoginPage from './pages/Auth/OTPLoginPage'
import PasswordLoginPage from './pages/Auth/PasswordLoginPage'
import UsernameLoginPage from './pages/Auth/UsernameLoginPage'
import ChangePasswordPage from './pages/Auth/forgetPassword/ChangePasswordPage'
import ForgetPasswordFirstPage from './pages/Auth/forgetPassword/ForgetPasswordFirstPage'
import ForgetPasswordOtpPage from './pages/Auth/forgetPassword/ForgetPasswordOtpPage'
import SignUpMobilePage from './pages/Auth/signUp/SignUpMobilePage'
import SignUpPasswordOtpPage from './pages/Auth/signUp/SignUpOtpPage'
import SignUpPersonaPage from './pages/Auth/signUp/SignUpPersonalPage'
import SignUpUserInfoPage from './pages/Auth/signUp/SignUpUserInfoPage'
import Home from './pages/userPanel/Home/Home'
import Messages from './pages/userPanel/Messages'
import MyTicketsPage from './pages/userPanel/MyTicketsPage'
import MyTransactionsPage from './pages/userPanel/MyTransactionsPage'
import UserPanelContainer from './pages/userPanel/UserPanelContainer'


function App() {

  return (
    <>
      <ToastContainer rtl theme="colored" position="top-left" icon={false} closeButton={false} autoClose={2000} />

      <Router>
        <Routes>
          <Route element={<AuthenticatedRoute component={UserPanelContainer} />} path="">
            <Route Component={Home} path=""></Route>
            <Route Component={Messages} path="messages"></Route>
            <Route Component={MyResume} path="my-resume"></Route>
            <Route Component={JobOpportunities} path="job-opportunities"></Route>
            <Route Component={MyTicketsPage} path="tickets"></Route>
            <Route Component={MyTransactionsPage} path="transactions"></Route>
          </Route>
          <Route Component={AuthContainer} path="auth">
            <Route Component={EmployerPage} path="employer"></Route>
            <Route Component={UsernameLoginPage} path=""></Route>
            <Route Component={PasswordLoginPage} path="password"></Route>
            <Route Component={OTPLoginPage} path="otp"></Route>
            <Route Component={() => <Outlet></Outlet>} path="forget-password">
              <Route Component={ForgetPasswordFirstPage} path=""></Route>
              <Route Component={ForgetPasswordOtpPage} path="otp"></Route>
              <Route Component={ChangePasswordPage} path="change"></Route>
            </Route>
            <Route Component={() => <Outlet></Outlet>} path="signup">
              <Route Component={SignUpMobilePage} path=""></Route>
              <Route Component={SignUpPasswordOtpPage} path="otp"></Route>
              <Route Component={SignUpPersonaPage} path="personal"></Route>
              <Route Component={SignUpUserInfoPage} path="user-info"></Route>
            </Route>
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
