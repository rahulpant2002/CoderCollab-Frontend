import { configureStore } from "@reduxjs/toolkit";
import userReducer from './userSlice';
import feedReducer from "./feedSlice";
import connectionReducer from "./connectionSlice";
import receivedRequestReducer from './receivedRequestSlice'
import sentRequestReducer from './sentRequestSlice'

const appStore = configureStore({
    reducer : {
        user : userReducer,
        feed : feedReducer,
        connection : connectionReducer,
        receivedRequest : receivedRequestReducer,
        sentRequest : sentRequestReducer
    }
})

export default appStore;