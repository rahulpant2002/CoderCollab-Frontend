import { io } from "socket.io-client";
import { BACKEND_URL } from "./constant";

export const createSocketConnection = () => { 
    if(location.hostname==="localhost") return new io(BACKEND_URL);
    else{
        return new io('/api', {path : '/api/socket.io'});
    }
};