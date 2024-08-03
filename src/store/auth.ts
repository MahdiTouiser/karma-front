import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AuthData } from '../models/auth.models'
import { UserStatusesPersianMap } from '../models/shared.models'

interface AuthState {
  enteredUsername: string
  enteredPassword: string
  isAuthenticated: boolean
  enteredPhone: string
  token: string
  refreshToken: string
  userId: string
  name: string
  userStatus: string
  userType: string
  username: string
  password: string
  code: number
  mobile: string
  userStatusDisplay: string
  isAdmin: boolean
  generalInfoSet: boolean
  httpHeaderSet: boolean
  personalInformationCompleted: boolean
  securityInformationCompleted: boolean
}

const initialState: AuthState = {
  enteredUsername: '',
  enteredPassword: '',
  password: '',
  isAuthenticated: false,
  enteredPhone: '',
  token: '',
  userId: '',
  refreshToken: '',
  userStatus: '',
  userType: '',
  name: '',
  username: '',
  code: -1,
  mobile: '',
  userStatusDisplay: '',
  isAdmin: false,
  generalInfoSet: false,
  httpHeaderSet: false,
  personalInformationCompleted: false,
  securityInformationCompleted: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    setUsername: (state, action: PayloadAction<string>) => {
      state.enteredUsername = action.payload
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.enteredPassword = action.payload
    },
    setMobile: (state, action: PayloadAction<string>) => {
      state.enteredPhone = action.payload
    },
    setToken: (state, action: PayloadAction<AuthData>) => {
      state.token = action.payload.authToken
      state.refreshToken = action.payload.refreshToken
      state.isAuthenticated = true
      state.isAdmin = action.payload.isAdmin
    },
    signUpPhone: (state, action: PayloadAction<{ id: string; phone: string }>) => {
      state.enteredPhone = action.payload.phone
      state.userId = action.payload.id
    },
    logOut: () => {
      return { ...initialState }
    },
    // setUserGenralInfo: (state, action: PayloadAction<UserGeneralInfo>) => {
    //   state.name = `${action.payload.firstName} ${action.payload.lastName}`
    //   state.userStatus = action.payload.userStatus
    //   state.userStatusDisplay = action.payload.userStatusDisplay
    //   state.userType = action.payload.userType
    //   state.username = action.payload.userName
    //   state.code = action.payload.code
    //   state.mobile = action.payload.mobile
    //   state.enteredPhone = ''
    //   state.enteredUsername = ''
    //   state.enteredPassword = ''
    //   state.generalInfoSet = true
    // },
    setUserStatus: (state, action: PayloadAction<string>) => {
      state.userStatus = action.payload
      state.userStatusDisplay = UserStatusesPersianMap.get(action.payload) || ''
    },
    setHttpHeader: state => {
      state.httpHeaderSet = true
    },
    completePersonalInformation: state => {
      state.personalInformationCompleted = true
    },
    completeSecurityInformation: state => {
      state.securityInformationCompleted = true
    },
  },
})

export const authActions = authSlice.actions
export default authSlice.reducer
