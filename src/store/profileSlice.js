import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    profilePicture: localStorage.getItem('profilePicture') || null,
};
const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setProfilePicture: (state, action) => {
            state.profilePicture = action.payload;
            localStorage.setItem('profilePicture', action.payload);
        },
        clearProfilePicture: state => {
            state.profilePicture = null;
            localStorage.removeItem('profilePicture');
        },
    },
});
export const { setProfilePicture, clearProfilePicture } = profileSlice.actions;
export default profileSlice.reducer;
