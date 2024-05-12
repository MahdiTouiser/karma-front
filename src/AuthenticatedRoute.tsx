import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from './hooks/reduxHooks'
import useAPi from './hooks/useApi'
import { BaseResponse, UserGeneralInfo } from './models/shared.models'
import { authActions } from './store/auth'
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
      } else {
        navigate('/auth')
      }
      return
    }

  }, [headerSet, sendRequest, dispatch, navigate, generalInfoSet])

  return <>{headerSet && <props.component></props.component>}</>
}

export default AuthenticatedRoute
