import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
    name : 'feed',
    initialState : null,
    reducers : {
        addFeed : (state, action)=>{
            return action.payload;
        },
        clearFeed : (state, action)=>null,
        removeOneFeed : (state, action)=>{
            const newFeed = state.filter(f=>f._id !== action.payload);
            return newFeed;
        }
    }
});

export const {addFeed, clearFeed, removeOneFeed} = feedSlice.actions;
export default feedSlice.reducer;