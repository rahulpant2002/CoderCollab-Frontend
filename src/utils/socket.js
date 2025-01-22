import { io } from "socket.io-client";
import { BACKEND_URL } from "./constant";

export const createSocketConnection = () => { 
    return new io(BACKEND_URL);
};