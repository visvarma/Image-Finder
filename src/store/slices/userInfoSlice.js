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
    addUserSelectedImage: (state, action) => {
      state.userData.selectedImage = action.payload;
    },
  },
});

export const { addUserInfo, addUserSelectedImage } = userInfoSlice.actions;

export default userInfoSlice.reducer;
