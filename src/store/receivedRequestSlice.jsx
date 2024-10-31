import { createSlice } from "@reduxjs/toolkit";

const receivedRequestSlice = createSlice({
    name : "receivedRequest",
    initialState : null,
    reducers : {
        addReceivedRequest : (state, action)=>action.payload,
        removeReceivedRequest : (state, action)=>null
    }
})

export const {addReceivedRequest, removeReceivedRequest} = receivedRequestSlice.actions;
export default receivedRequestSlice.reducer;