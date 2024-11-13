import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ExtraOptionInterface {
  isChecked: boolean;
  label: string;
  value: string;
}

// define the initial state and types
interface IDNumberState {
  data: {
    fullName: string;
    idNumber: string;
    dateOfBirth: string;
  };
  policyDetails: string;
  extraOptions: ExtraOptionInterface[];
  loading: boolean;
  error: string | null;
}

const initialState: IDNumberState = {
  data: {
    fullName: "",
    idNumber: "",
    dateOfBirth: "",
  },
  policyDetails: "",
  extraOptions: [],
  loading: false,
  error: null,
};

// Create a slice
const idNumberSlice = createSlice({
  name: "idNumber",
  initialState,
  reducers: {
    submitIDRequest(state) {
      state.loading = true;
      state.error = null;
    },

    submitIDSuccess(state, action: PayloadAction<IDNumberState["data"]>) {
      state.data = action.payload;
      state.loading = false;
    },

    submitIDFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },

    submitPolicyDetails(state, action: PayloadAction<string>) {
      state.policyDetails = action.payload;
    },
    submitExtraOptions(state, action: PayloadAction<ExtraOptionInterface[]>) {
      state.extraOptions = action.payload;
    },
    submitDateOfBirth(state, action: PayloadAction<string>) {
      state.data.dateOfBirth = action.payload;
    },
  },
});

export const {
  submitIDRequest,
  submitIDSuccess,
  submitIDFailure,
  submitPolicyDetails,
  submitExtraOptions,
  submitDateOfBirth,
} = idNumberSlice.actions;
export default idNumberSlice.reducer;
