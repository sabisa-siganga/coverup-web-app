import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserDataState {
  address: string;
  email: string;
  phone: string;
  region: string;
  payment: string;
  cover: string;
  status: string;
  gender: string;
}

const initialState: {
  info: UserDataState;
} = {
  info: {
    address: "",
    email: "",
    phone: "",
    region: "",
    payment: "",
    cover: "",
    status: "",
    gender: "",
  },
};

const userDataSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    updateUserField(state, action: PayloadAction<UserDataState>) {
      state.info = action.payload;
    },
  },
});

export const { updateUserField } = userDataSlice.actions;

export default userDataSlice.reducer;
