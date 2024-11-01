import { createSlice } from "@reduxjs/toolkit";

const receivedRequestSlice = createSlice({
    name : "receivedRequest",
    initialState : null,
    reducers : {
        addReceivedRequest : (state, action)=>action.payload,
        clearReceivedRequest : (state, action)=>null,
        removeOneReceivedRequest : (state, action)=>{
            const newArray = state.filter( r=> r._id !== action.payload);
            return newArray;
        }
    }
})

export const {addReceivedRequest, clearReceivedRequest, removeOneReceivedRequest} = receivedRequestSlice.actions;
export default receivedRequestSlice.reducer;