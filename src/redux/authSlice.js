import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: localStorage.getItem('isLoggedIn') === 'true' ? true : false, // Initialize isLoggedIn from local storage (boolean check)
  userInfo: localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')) : null,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess(state, action) {
      console.log("within slice", action.payload);
      state.isLoggedIn = true;
      state.userInfo = action.payload;
      state.error = null;
      localStorage.setItem('isLoggedIn', true); // Save isLoggedIn to local storage on login
      localStorage.setItem('userData', JSON.stringify(action.payload)); // Save userInfo
    },
    logout(state) {
      state.isLoggedIn = false;
      state.userInfo = null;
      state.error = null;
      localStorage.removeItem('isLoggedIn'); // Remove isLoggedIn from local storage
      localStorage.removeItem('userData'); // Remove userInfo
    },
    loginFailure(state, action) {
      state.error = action.payload; // Set error for login failures (optional)
    },
  },
});

export const { loginSuccess, logout, loginFailure } = authSlice.actions;

//selectors
export const selectLogin = (state) => state.auth;
export default authSlice.reducer;
