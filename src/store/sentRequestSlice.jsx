import { createSlice } from "@reduxjs/toolkit";

const sentRequestSlice = createSlice({
    name : "sentRequest",
    initialState : null,
    reducers : {
        addSentRequest : (state, action)=>action.payload,
        removeSentRequest : (state, action)=>null
    }
})

export const {addSentRequest, removeSentRequest} = sentRequestSlice.actions;
export default sentRequestSlice.reducer;