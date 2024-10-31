import { useEffect, useState } from "react";

const onlineStatus = ()=>{
    const [isOnline, setIsOnline] = useState(navigator.onLine);

    useEffect(()=>{
        window.addEventListener("online", ()=>{
            setIsOnline(true);
        })
        window.addEventListener("offline", ()=>{
            setIsOnline(false);
        })
    }, [isOnline])

    return isOnline;
}

export default onlineStatus;