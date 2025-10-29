import { createSlice } from "@reduxjs/toolkit";

// Get the token from localStorage on app load
const tokenFromLocalStorage = localStorage.getItem("token");
const userFromLocalStorage = JSON.parse(localStorage.getItem("user"));

const initialState = {
  token: tokenFromLocalStorage || undefined,
  user: userFromLocalStorage || null,
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, { payload }) => {
      // Save the token and user in the Redux store
      state.token = payload.token;
      state.user = payload.user;

      // Persist the token and user data in localStorage
      localStorage.setItem("token", payload.token);
      localStorage.setItem("user", JSON.stringify(payload.user));
    },
    logout: (state) => {
      // Clear the Redux state
      state.token = undefined;
      state.user = null;

      // Remove the token and user from localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
    patchMe: (state, { payload }) => {
      // Update the user data in Redux state
      if (state.user) {
        state.user = { ...state.user, ...payload };
        
        // Persist the updated user data in localStorage
        localStorage.setItem("user", JSON.stringify(state.user));
      }
    },
  },
});

export const { setCredentials, logout, patchMe } = slice.actions;
export default slice.reducer;
