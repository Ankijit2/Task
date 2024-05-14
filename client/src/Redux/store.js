import {configureStore} from '@reduxjs/toolkit'
import dataSlice from './Slice/dataSlice'
import CriteriaSearch from './Slice/CriteriaSearchSlice'
import FilterSlice from './Slice/FilterSlice'

const store = configureStore({
    reducer: {
        data: dataSlice,
        CriteriaSearch: CriteriaSearch,
        Filter: FilterSlice
    },
})

export default store