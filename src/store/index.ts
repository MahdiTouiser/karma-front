import { configureStore } from '@reduxjs/toolkit'

import accountReducer from './account'
import authReducer from './auth'
import generalSettings from './generalSettings'
import profileSlice from './profileSlice'
import userManagementReducer from './usermanagement'

const store = configureStore({
  reducer: {
    auth: authReducer,
    account: accountReducer,
    userManagement: userManagementReducer,
    generalSettings: generalSettings,
    profile: profileSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store
