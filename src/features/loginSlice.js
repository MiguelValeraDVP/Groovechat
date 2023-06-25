import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "",
  email: "",
  isAvatarSet: "",
  avatarImage: "",
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.isAvatarSet = action.payload.isAvatarSet;
      state.avatarImage = action.payload.avatarImage;
    },
    removeUser: (state, action) => {
      state = initialState;
    },
  },
});

export const { addUser, removeUser } = loginSlice.actions;

export default loginSlice.reducer;
