import { io } from "socket.io-client";
import { BACKEND_URL } from "./constant";

export const createSocketConnection = () => { 
    let socket;
    if(location.hostname==="localhost") socket = new io(BACKEND_URL);
    else{
        socket = new io('/', {
            path : '/api/socket.io',
            transports : ["websocket"]
        });
    }

    return socket;
};