import { createSlice } from "@reduxjs/toolkit";

const connectionSlice = createSlice({
    name : "connection",
    initialState : null,
    reducers : {
        addConnections : (state, action) => action.payload,
        clearConnection : (state, action) => null,
        removeOneConnection : (state, action) =>{
            const newArray = state.filter( x=> x._id !== action.payload);
            return newArray;
        }
    }
})

export const {addConnections, clearConnection, removeOneConnection} = connectionSlice.actions;
export default connectionSlice.reducer;