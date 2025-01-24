import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BACKEND_URL } from "../utils/constant";
import axios from "axios";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import moment from "moment";

const Chat = () => {
  const { connectionId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [toUser, setToUser] = useState(null);
  const user = useSelector((store) => store.user);
  const userId = user?._id;

  const fetchToUser = async () => {
    try {
      const res = await axios.get(BACKEND_URL + `/findChatFriend/${connectionId}`, { withCredentials: true });
      setToUser(res);
    } catch (err) {
      console.error(err.message);
    }
  };

  const fetchHistory = async()=>{
    const history = await axios.get(BACKEND_URL + `/getChatHistory/${connectionId}`, {withCredentials : true});
    setMessages(history.data.chatHistory.messages);
  }

  useEffect(()=>{
    fetchHistory()
    fetchToUser();
  }, [])

  useEffect(() => {
    if (!userId) return;

    const socket = createSocketConnection();
    socket.emit("joinChat", { sender: user.firstName + " " + user.lastName, connectionId });

    socket.on("messageReceived", ({ sender, message }) => {
      setMessages((prevMessages) => [...prevMessages, { sender, message }]);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, connectionId]);

  if (!toUser) return null;
  const { firstName, lastName, photoUrl } = toUser?.data?.data;

  const handleSendBtn = () => {
    if(newMessage.length===0) return;
    const socket = createSocketConnection();
    socket.emit("sendMessage", {
      sender: user.firstName + " " + user.lastName,
      connectionId,
      message: newMessage,
    });
    setNewMessage("");
  };

  const handleEnterBtn = (e) => {
    if(e.key === "Enter") handleSendBtn();
  };

  const handleDeleteChat = async()=>{
    await axios.post(BACKEND_URL+`/deleteChat/${connectionId}`, null, {withCredentials : true});
    setMessages([]);
  }

  return (
    <div className="w-full lg:w-3/4 xl:w-2/3 mx-auto my-8 border border-gray-500 rounded-md bg-base-200 flex flex-col h-[80vh]">
      <div className="flex justify-between">
        <div className="flex items-center border-b border-gray-600 p-4 bg-base-300 ml-2">
            <div className="w-12 h-12 rounded-full overflow-hidden">
            <img alt="Profile" src={photoUrl} className="w-full h-full object-cover" />
            </div>
            <h1 className="ml-4 text-xl font-bold text-white">{firstName + " " + lastName}</h1>
        </div>
        <button
          onClick={handleDeleteChat}
          className="btn btn-success px-6 py-3 font-bold text-lg rounded-lg my-auto mx-2"
        >
          Delete Chat  
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-5 bg-base-100">
        {messages.map((msg, index) => (
          <div key={index} className={"chat mb-4 " + (user.firstName + " " + user.lastName === msg.sender ? "chat-end" : "chat-start")}>
            {/* <div className="chat-header">
              {msg.sender}
            </div> */}
            <div className="chat-bubble bg-blue-500 text-white">{msg.message}</div>
            <time className="chat-footer text-xs opacity-80">{moment(msg.createdAt).format("DD-MM-YYYY HH:mm:ss")}</time>
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-gray-600 bg-base-300 flex items-center gap-3">
        <input
          onKeyDown={handleEnterBtn}
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 border border-gray-500 rounded-lg p-3 text-white"
          placeholder="Type a message..."
        />
        <button
          onClick={handleSendBtn}
          className="btn btn-secondary px-6 py-3 font-bold text-lg rounded-lg"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;