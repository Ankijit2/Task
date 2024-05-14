import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  SearchField: null,
  SearchCategory: null,
};


const CriteriaSearch = createSlice({
  name: "criteria",
  initialState,
  reducers: {
    setSearch: (state, action) => {
      state.SearchField = action.payload;
     
    },
    setSearchCategory: (state, action) => {
      state.SearchCategory = action.payload;
      
    },
    setClearsearch: (state) => {
      state.SearchField = null;
      state.SearchCategory = null;
      
    },
  },
});


export const { setSearch, setSearchCategory, setClearsearch } = CriteriaSearch.actions;
export default CriteriaSearch.reducer;
