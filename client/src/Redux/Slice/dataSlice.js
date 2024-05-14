import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  companydata: null,
  loading: false,
  error: false,
  errormessage: null,
  page: 0
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setData: (state, action) => {
      state.companydata = action.payload
     
      

    },
    setisLoading: (state, action) => {
      state.loading = action.payload
    },
    SetPage: (state, action) => {
      state.page = action.payload
    },
    setError: (state, action) => {
      state.error = true;
      state.errormessage = action.payload
    },
    clearError: (state) => {
      state.error = false;
      state.errormessage = null
    }
  
  
  },
});

export const { setData, SetPage, setisLoading, setError,clearError } = dataSlice.actions;
export default dataSlice.reducer;
