import { configureStore } from "@reduxjs/toolkit";
import userReducer from './userSlice';
import feedReducer from "./feedSlice";
import connectionReducer from "./connectionSlice";
import receivedRequestReducer from './receivedRequestSlice'
import sentRequestReducer from './sentRequestSlice'
import searchReducer from "./searchSlice";

const appStore = configureStore({
    reducer : {
        user : userReducer,
        feed : feedReducer,
        connection : connectionReducer,
        receivedRequest : receivedRequestReducer,
        sentRequest : sentRequestReducer,
        search : searchReducer
    }
})

export default appStore;