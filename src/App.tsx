import { useEffect } from 'react'
import { Outlet, Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { useAppDispatch } from './hooks/reduxHooks'
import AuthContainer from './pages/Auth/AuthContainer'
import OTPLoginPage from './pages/Auth/OTPLoginPage'
import PasswordLoginPage from './pages/Auth/PasswordLoginPage'
import UsernameLoginPage from './pages/Auth/UsernameLoginPage'
import ChangePasswordPage from './pages/Auth/forgetPassword/ChangePasswordPage'
import ForgetPasswordFirstPage from './pages/Auth/forgetPassword/ForgetPasswordFirstPage'
import ForgetPasswordOtpPage from './pages/Auth/forgetPassword/ForgetPasswordOtpPage'
import SignUpPasswordOtpPage from './pages/Auth/signUp/SignUpOtpPage'
import SignUpUserInfoPage from './pages/Auth/signUp/SignUpUserInfoPage'
import SignUpMobilePage from './pages/Auth/signUp/SingUpMobilePage'
import SignUpPersonaPage from './pages/Auth/signUp/SingnUpPersonalPage'
import { fetchGeneralSettings } from './store/generalSettings'


function App() {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchGeneralSettings())
  }, [dispatch])
  return (
    <>
      <Router>
        <Routes>
          <Route Component={AuthContainer} path="auth">
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
