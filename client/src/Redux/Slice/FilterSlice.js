import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    filtercriteria :null,
    isAscending : null,


}



const FilterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        setFilterCriteria: (state, action) => {
            state.filtercriteria = action.payload
        },
        setIsAscending: (state, action) => {
            state.isAscending = action.payload
        },
        clearfilter: (state) => {
            state.filtercriteria = null,
            state.isAscending = null

        }

        
    }})
export const { setFilterCriteria, setIsAscending, clearfilter } = FilterSlice.actions
export default FilterSlice.reducer