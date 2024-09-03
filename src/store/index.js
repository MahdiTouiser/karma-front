import { configureStore } from '@reduxjs/toolkit';
import accountReducer from './account';
import authReducer from './auth';
import generalSettings from './generalSettings';
import messages from './messages';
import profileSlice from './profileSlice';
import userManagementReducer from './usermanagement';
const store = configureStore({
    reducer: {
        auth: authReducer,
        account: accountReducer,
        userManagement: userManagementReducer,
        messages: messages,
        generalSettings: generalSettings,
        profile: profileSlice,
    },
});
export default store;
