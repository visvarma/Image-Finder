import { createSlice } from "@reduxjs/toolkit";

export const userInfoSlice = createSlice({
  name: "userInfo",
  initialState: {
    userData: {},
  },
  reducers: {
    addUserInfo: (state, action) => {
      state.userData = action.payload;
    },
  },
});

export const { addUserInfo } = userInfoSlice.actions;

export default userInfoSlice.reducer;
