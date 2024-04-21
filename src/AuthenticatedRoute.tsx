import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from './hooks/reduxHooks'
import { authActions } from './store/auth'
import useAPi from './hooks/useApi'
import { BaseResponse, UserGeneralInfo } from './models/shared.models'
import { getAuthDataFromLocal, setAuthDataInLocal } from './utils/authUtils'
interface AutenticateGuardProps {
  component: React.ComponentType
}
const AuthenticatedRoute: React.FC<AutenticateGuardProps> = props => {
  const navigate = useNavigate()
  const headerSet = useAppSelector(state => state.auth.httpHeaderSet)
  const generalInfoSet = useAppSelector(state => state.auth.genralInfoSet)
  const dispatch = useAppDispatch()
  const { sendRequest } = useAPi<null, BaseResponse<UserGeneralInfo>>()

  useEffect(() => {
    if (!headerSet) {
      const authData = getAuthDataFromLocal()
      if (authData) {
        setAuthDataInLocal(authData)
        dispatch(authActions.setToken(authData))
        if (!authData.isAdmin) {
          if (!authData.personalInformationCompleted) {
            navigate('/auth/signup/personal')
            return
          }
          if (!authData.securityInformationCompleted) {
            navigate('/auth/signup/user-info')
            return
          }
        }
      } else {
        navigate('/auth')
      }
      return
    }
    if (headerSet && !generalInfoSet) {
      sendRequest(
        {
          url: '/Users/GetUserInformation',
        },
        response => {
          dispatch(authActions.setUserGenralInfo(response.content))
        }
      )
    }
  }, [headerSet, sendRequest, dispatch, navigate, generalInfoSet])

  return <>{headerSet && <props.component></props.component>}</>
}

export default AuthenticatedRoute
