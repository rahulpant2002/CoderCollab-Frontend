import { createSlice } from "@reduxjs/toolkit";

const sentRequestSlice = createSlice({
    name : "sentRequest",
    initialState : null,
    reducers : {
        addSentRequest : (state, action)=>action.payload,
        clearSentRequest : (state, action)=>null,
        removeOneSentRequest : (state, action)=>{
            const newArray = state.filter(x=> x._id !== action.payload);
            return newArray;
        }
    }
})

export const {addSentRequest, clearSentRequest, removeOneSentRequest} = sentRequestSlice.actions;
export default sentRequestSlice.reducer;