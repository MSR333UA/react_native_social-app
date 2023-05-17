import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: null,
  nickname: null,
  stateChange: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    updateUser: (state, { payload }) => ({
      ...state,
      userId: payload.userId,
      nickname: payload.nickname,
      email: payload.email,
      avatarURL: payload.avatarURL,
    }),
    authStateChange: (state, { payload }) => ({
      ...state,
      stateChange: payload.stateChange,
    }),
    changeAvatar: (state, { payload }) => ({
      ...state,
      avatarURL: payload.avatarURL,
    }),
    authSignOut: () => ({ ...initialState, stateChange: false }),
  },
});

// console.log("authSlice", authSlice);
