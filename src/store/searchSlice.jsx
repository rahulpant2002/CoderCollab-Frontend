import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
    name : "allUser",
    initialState : null,
    reducers : {
        addSearch : (state, action)=> action.payload,
        clearSearch : (state, action)=> null
    }
})

export const {addSearch, clearSearch} = searchSlice.actions;
export default searchSlice.reducer;